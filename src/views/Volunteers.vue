<template>
  <div class="volunteers">
    <span id="title">Список волонтеров</span>
    <SearchBar ref="searchBar" />
    <div id="volunteers-list">
      <a
        class="volunteer-item"
        v-for="volunteer in volunteers"
        :key="volunteer.id"
        :href="`tel:${volunteer.phone.replace(/\s/g, '')}`"
      >
        <span>
          {{ volunteer.name }} {{ volunteer.surname }}
          <span v-if="volunteer.egida_nick">({{ volunteer.egida_nick }})</span>
        </span>
        <a class="phone-container">
          <img class="phone-icon" src="@/assets/phone-icon.png" />
          {{ volunteer.phone }}
        </a>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SearchBar from '@/components/volunteers-view/SearchBar.vue';

const limit = parseInt(process.env.VUE_APP_LIMIT, 10);

export default {
  name: 'Volunteers',
  components: { SearchBar },
  computed: mapState({
    volunteers: (state) => state.users.volunteers,
    total: (state) => state.users.total,
  }),
  data() {
    return {
      offset: 0,
    };
  },
  created() {
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('users/getVolunteers', { attribute: 'name', offset: 0 }).then(() => {
      this.$store.dispatch('app/setLoading', false);
    });
    this.offset += limit;

    window.addEventListener('scroll', () => {
      const bottomOfWindow = document.documentElement.scrollTop
        + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow && this.volunteers.length < this.total) {
        this.loadMore();
      }
    });
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    loadMore() {
      this.$store
        .dispatch('users/loadMoreVolunteers', {
          attribute: this.$refs.searchBar.attribute,
          offset: this.offset,
          search: this.$refs.searchBar.searchText,
        })
        .then(() => {
          this.offset += limit;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightGrey: #ccc;
$greyBlue: #2c3e50;

.volunteer-item {
  font-size: 16px;
  padding: 12px 16px;
  margin: 4px;
  border-bottom: 1px solid $lightGrey;
  display: flex;
  justify-content: space-between;
  color: $greyBlue;
  text-decoration: none;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.phone-container {
  display: flex;
  align-items: center;
  color: black;

  @media (max-width: 600px) {
    margin-top: 8px;
  }
}

.phone-icon {
  width: 18px;
  height: 18px;
}
</style>
