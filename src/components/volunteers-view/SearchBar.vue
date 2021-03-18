<template>
  <div class="search-bar">
    <div class="sort-bar">
      <span>Сортировать по:</span>
      <div class="btn-group">
        <SortButton
          title="Имени"
          name="name"
          @change-sort="handleChangeAttribute"
          :isSortParam="attribute === 'name'"
        />
        <SortButton
          title="Фамилии"
          name="surname"
          @change-sort="handleChangeAttribute"
          :isSortParam="attribute === 'surname'"
        />
        <SortButton
          title="Телефону"
          name="phone"
          @change-sort="handleChangeAttribute"
          :isSortParam="attribute === 'phone'"
        />
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
      attribute: 'name',
      searchText: '',
    };
  },
  watch: {
    searchText(inputValue) {
      this.$store.dispatch('users/getVolunteers', {
        attribute: this.attribute,
        search: inputValue,
        offset: 0,
      });
    },
  },
  methods: {
    handleChangeAttribute(attribute) {
      this.attribute = attribute;
      this.$store.dispatch('users/getVolunteers', { attribute, offset: 0 });
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

@media (max-width: 700px) {
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
