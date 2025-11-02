<template>
  <div class="search-bar">
    <div class="search-bar__sort-bar">
      <span class="search-bar__sort-bar__title">Сортировать по:</span>
      <div class="search-bar__sort-bar__sub-container">
        <div class="search-bar__btn-group">
          <SortButton
            title="Имени"
            name="name"
            :is-sort-param="sortBy === 'name'"
            @change-sort="handleChangeSortBy"
          />
          <SortButton
            title="Фамилии"
            name="surname"
            :is-sort-param="sortBy === 'surname'"
            @change-sort="handleChangeSortBy"
          />
          <SortButton
            title="Телефону"
            name="phone"
            :is-sort-param="sortBy === 'phone'"
            @change-sort="handleChangeSortBy"
          />
        </div>
        <div class="search-bar__order">
          <ArrowDownOutlined
            v-if="order === 'asc'"
            class="search-bar__order__arrow"
            @click="order = 'desc'"
          />
          <ArrowUpOutlined
            v-if="order === 'desc'"
            class="search-bar__order__arrow"
            @click="order = 'asc'"
          />
        </div>
      </div>
    </div>
    <div class="search-bar__input-container">
      <img class="search-bar__search-icon" src="@/assets/search-icon.png" alt="search">
      <input v-model.lazy="searchText">
    </div>
  </div>
</template>

<script>
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';

import SortButton from './SortButton.vue';

export default {
  name: 'SearchBar',
  components: { SortButton, ArrowUpOutlined, ArrowDownOutlined },
  emits: ['reset-skip'],
  data() {
    return {
      sortBy: 'name',
      searchText: '',
      order: 'asc',
    };
  },
  watch: {
    searchText() {
      this.getUsers();
    },
    order() {
      this.getUsers();
      this.$emit('reset-skip');
    },
  },
  methods: {
    handleChangeSortBy(sortBy) {
      this.sortBy = sortBy;
      this.getUsers();
      this.$emit('reset-skip');
    },
    getUsers() {
      this.$store.dispatch('users/getUsers', {
        sortBy: this.sortBy,
        order: this.order,
        skip: 0,
        ...(this.searchText ? { search: this.searchText } : {}),
        roles: 'VOLUNTEER,ADMIN',
      });
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(107, 111, 116, 0.1);
  margin-bottom: 8px;
  padding: 8px 16px;

  input {
    border: 1px solid rgb(201, 201, 201);
    border-radius: 4px;
    padding: 4px 8px;
  }

  &__sort-bar {
    display: flex;
    align-items: center;

    &__title {
      display: flex;
      margin-right: 8px;
      font-size: 16px;
    }

    &__sub-container {
      display: flex;
      align-items: center;
    }
  }
  &__search-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  &__input-container {
    display: flex;
    align-items: center;
  }

  &__order {
    display: flex;
    margin-left: 12px;

    &__arrow {
      font-size: 24px;
      cursor: pointer;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;

    &__input-container {
      margin-bottom: 8px;
    }
  }

  @media (max-width: 500px) {
    &__sort-bar {
      flex-direction: column;

      &__title {
        margin-bottom: 4px;
        margin-right: 0px;
        font-size: 14px;
      }
    }
  }
}
</style>
