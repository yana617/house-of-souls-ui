<template>
  <div class="volunteers">
    <span id="title">Список волонтеров</span>
    <SearchBar ref="searchBar" @reset-skip="resetSkip" />
    <div class="volunteers__list" id="volunteers__list">
      <div class="volunteers__item" v-for="volunteer in volunteers" :key="volunteer.id">
        <router-link :to="`/users/${volunteer.id}`">
          <span> {{ volunteer.name }} {{ volunteer.surname }} </span>
        </router-link>
        <a class="volunteers__phone-container" :href="`tel:${volunteer.phone.replace(/\s/g, '')}`">
          <img class="volunteers__phone-icon" src="@/assets/phone-icon.png" />
          +{{ prettifyPhone(volunteer.phone) }}
        </a>
      </div>
    </div>
    <div v-if="loading" class="volunteers__loader-wrapper">
      <Loader className="volunteers__loader" />
    </div>
    <span v-if="!loading && noVolunteers">Волонтеры не найдены</span>
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
    this.$store
      .dispatch('users/getUsers', {
        sortBy: 'name',
        skip: 0,
        roles: 'VOLUNTEER,ADMIN',
        order: 'asc',
      })
      .then(() => {
        this.skip += limit;
      })
      .finally(() => {
        this.loading = false;
      });

    this.addHandler();
  },
  unmounted() {
    this.removeHandler();
    this.$store.dispatch('users/clearUsersList');
  },
  methods: {
    addHandler() {
      window.addEventListener('scroll', this.checkScroll);
    },
    removeHandler() {
      window.removeEventListener('scroll', this.checkScroll);
    },
    loadMore() {
      const searchValue = this.$refs.searchBar.searchText;
      this.$store
        .dispatch('users/loadMoreUsers', {
          sortBy: this.$refs.searchBar.sortBy,
          order: this.$refs.searchBar.order,
          skip: this.skip,
          roles: 'VOLUNTEER,ADMIN',
          ...(searchValue !== '' ? { search: searchValue } : {}),
        })
        .then(() => {
          this.skip += limit;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    prettifyPhone(phone) {
      return `${phone.substr(0, 3)} ${phone.substring(3, 5)} ${phone.substring(5)}`;
    },
    checkScroll() {
      if (this.loading) return;
      const lastItem = document.querySelector('#volunteers__list > div:last-child');
      const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastItemOffset - 20 && this.volunteers.length < this.total) {
        this.loading = true;
        this.loadMore();
      }
    },
    resetSkip() {
      this.skip = limit;
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
