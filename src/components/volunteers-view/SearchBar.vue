<template>
  <div class="search-bar">
    <div class="sort-bar">
      <span>Сортировать по:</span>
      <div class="btn-group">
        <SortButton title="Имени" name="name" @change-sort="handleChangeSortBy" :isSortParam="sortBy === 'name'" />
        <SortButton
          title="Фамилии"
          name="surname"
          @change-sort="handleChangeSortBy"
          :isSortParam="sortBy === 'surname'"
        />
        <SortButton title="Телефону" name="phone" @change-sort="handleChangeSortBy" :isSortParam="sortBy === 'phone'" />
      </div>
    </div>
    <div class="input-container">
      <img class="search-icon" src="@/assets/search-icon.png" />
      <input v-model.lazy="searchText" />
    </div>
  </div>
</template>

<script>
import SortButton from './SortButton.vue';

export default {
  name: 'SearchBar',
  components: { SortButton },
  data() {
    return {
      sortBy: 'name',
      searchText: '',
    };
  },
  watch: {
    searchText() {
      this.getUsers();
    },
  },
  methods: {
    handleChangeSortBy(sortBy) {
      this.sortBy = sortBy;
      this.getUsers();
    },
    getUsers() {
      this.$store.dispatch('users/getUsers', {
        sortBy: this.sortBy,
        skip: 0,
        ...(this.searchText ? { search: this.searchText } : {}),
      });
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;

.sort-bar {
  display: flex;
  align-items: center;

  span {
    display: flex;
    margin-right: 8px;
    font-size: 16px;
  }
}

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
}

.search-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.input-container {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column-reverse;
  }

  .input-container {
    margin-bottom: 8px;
  }
}

@media (max-width: 500px) {
  .sort-bar {
    flex-direction: column;

    span {
      margin-bottom: 4px;
      margin-right: 0px;
      font-size: 14px;
    }
  }
}
</style>
