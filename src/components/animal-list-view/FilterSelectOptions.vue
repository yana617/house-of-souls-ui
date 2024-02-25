<template>
  <div class="filter-select">
    <div class="filter-select__header">
      <div class="filter-select__back-arrow" @click="handleClose" />
      <h4 class="filter-select__header__title">
        {{ title }}
      </h4>
    </div>
    <div
      v-for="option of options"
      :key="option"
      class="filter-select__option"
      @click="handleOptionSelect(option.value)"
    >
      <span>{{ option.label }}</span>
      <img
        v-if="isSelected(option.value)"
        alt="selected-icon"
        class="filter-select__selected-icon"
        src="@/assets/selected-circle.png"
      />
    </div>
    <CommonButton class="filter-select__confirm-btn" title="Применить" @click="handleSelectSubmit()" />
  </div>
</template>

<script>
import filters from '@/utils/maps/filters';
import translates from '@/utils/translates/index';
import Filters from '@/utils/enums/Filters';
import AnimalSex from '@/utils/enums/AnimalSex';

import CommonButton from '@/components/common/CommonButton.vue';

export default {
  name: 'FilterSelectOptions',
  components: { CommonButton },
  props: {
    filterName: String,
  },
  emits: ['on-close'],
  data() {
    return { filters, selected: this.$route.query[this.filterName] };
  },
  computed: {
    title() {
      if (this.filterName === Filters.STERILIZED) {
        return translates[this.filterName].title[AnimalSex.MALE];
      }
      return translates[this.filterName];
    },
    options() {
      return this.filters.find((filter) => filter.filterName === this.filterName)?.options;
    },
  },
  methods: {
    isSelected(optionValue) {
      return optionValue === this.selected || (!this.selected && optionValue === 'all');
    },
    handleOptionSelect(value) {
      this.selected = value;
    },
    handleSelectSubmit() {
      const { query } = this.$route;
      const requestQuery = { ...query, [this.filterName]: this.selected === 'all' ? undefined : this.selected };

      this.$router.push({ path: '/animals', query: requestQuery });
      this.handleClose();
    },
    handleClose() {
      this.$emit('on-close');
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;
$blue: #3f91f7;
$black1: #232d42;
$darkBlue: #2f3e4e;

.filter-select {
  position: fixed;
  left: 0;
  z-index: 15;
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  background-color: white;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 1px solid rgba($color: $grey1, $alpha: 0.2);
    margin-bottom: 12px;
    padding: 8px 16px;

    &__title {
      font-size: 16px;
      margin: 0;
      font-family: Helvetica, Avenir, Arial, sans-serif;
    }
  }

  &__back-arrow {
    border: solid $black1;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 4px;
    margin: 2px 6px 0 2px;
    position: absolute;
    left: 16px;

    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  &__option {
    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
    color: $grey1;
    cursor: pointer;
    margin: 4px 16px;
  }

  &__selected-icon {
    width: 24px;
  }

  &__confirm-btn {
    background-color: $darkBlue;
    color: white;
    border-color: $darkBlue;
    margin: 16px;
    margin-top: auto;
    border-radius: 24px;
    padding: 12px;
    &:hover {
      background-color: white;
      color: $darkBlue;
    }
  }
}
</style>
