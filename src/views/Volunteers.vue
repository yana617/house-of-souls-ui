<template>
  <div class="volunteers">
    <span id="title">Список волонтеров</span>
    <SearchBar ref="searchBar" />
    <div class="volunteers__list">
      <a class="volunteers__item" v-for="volunteer in volunteers" :key="volunteer.id">
        <router-link :to="`/users/${volunteer.id}`">
          <span> {{ volunteer.name }} {{ volunteer.surname }} </span>
        </router-link>
        <a class="volunteers__phone-container" :href="`tel:${volunteer.phone.replace(/\s/g, '')}`">
          <img class="volunteers__phone-icon" src="@/assets/phone-icon.png" />
          +{{ prettifyPhone(volunteer.phone) }}
        </a>
      </a>
      <div v-if="loading" class="volunteers__loader-wrapper">
        <Loader className="volunteers__loader" />
      </div>
      <span v-if="!loading && noVolunteers">Волонтеры не найдены</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SearchBar from '@/components/volunteers-view/SearchBar.vue';
import Loader from '@/components/common/Loader.vue';

const limit = parseInt(process.env.VUE_APP_LIMIT, 10);

export default {
  name: 'Volunteers',
  components: { SearchBar, Loader },
  computed: mapState({
    volunteers: (state) => state.users.list,
    total: (state) => state.users.total,
    noVolunteers() {
      return !this.volunteers || this.volunteers.length === 0;
    },
  }),
  data() {
    return {
      skip: 0,
      loading: true,
    };
  },
  created() {
    this.$store.dispatch('users/getUsers', { sortBy: 'name', skip: 0, roles: 'VOLUNTEER,ADMIN' }).then(() => {
      this.skip += limit;
      this.loading = false;
    });

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
      const searchValue = this.$refs.searchBar.searchText;
      this.loading = true;
      this.$store
        .dispatch('users/loadMoreUsers', {
          sortBy: this.$refs.searchBar.sortBy,
          skip: this.skip,
          roles: 'VOLUNTEER,ADMIN',
          ...(searchValue !== '' ? { search: searchValue } : {}),
        })
        .then(() => {
          this.skip += limit;
          this.loading = false;
        });
    },
    prettifyPhone(phone) {
      return `${phone.substr(0, 3)} ${phone.substring(3, 5)} ${phone.substring(5)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightGrey: #ccc;
$greyBlue: #2c3e50;

.volunteers {
  &__item {
    font-size: 16px;
    padding: 12px 16px;
    margin: 4px;
    border-bottom: 1px solid $lightGrey;
    display: flex;
    justify-content: space-between;
    color: $greyBlue;
    text-decoration: none;
    line-height: 1.15;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__phone-container {
    display: flex;
    align-items: center;
    color: black;

    @media (max-width: 600px) {
      margin-top: 8px;
    }
  }

  &__phone-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
