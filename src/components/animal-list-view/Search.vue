<template>
  <div class="search">
    <h3>Поиск</h3>
    <input v-model="searchText" placeholder="Введите кличку..">
    <img class="search__icon" alt="search" src="@/assets/search-icon.png" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return { searchText: '' };
  },
  computed: {},
  watch: {
    searchText(searchValue) {
      const { query } = this.$route;
      const requestQuery = { ...query, search: searchValue };
      this.$router.push({ path: '/animals', query: requestQuery });
    },
  },
};
</script>

<style scoped lang="scss">
$grey2: #8a92a6;
$blue: #3f91f7;
$black1: #232d42;

.search {
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;

  input {
    width: 100%;
    border: none;
    border: none;
    background-color: inherit;
    border-bottom: 1px solid $black1;
    margin-top: 8px;
    padding-left: 32px;
    padding-bottom: 4px;
    outline: none;
  }

  &__icon {
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 24px;
    left: 4px;
    transform: scale(-1, 1);
  }
}
</style>
