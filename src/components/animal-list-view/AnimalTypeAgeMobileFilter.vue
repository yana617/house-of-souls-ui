<template>
  <div class="animal-type-age-mobile-filter">
    <router-link
      v-for="filter of imageFilters"
      :key="filter.labelShort"
      :to="generateLink(filter.type, filter.age)"
      :class="{ selected: isSelected(filter) }"
    >
      {{ filter.labelShort }}
    </router-link>
  </div>
</template>

<script>
import imageFilters from '@/utils/maps/imageFilters';

export default {
  name: 'AnimalTypeAgeMobileFilter',
  data() {
    return { imageFilters };
  },
  methods: {
    generateLink(type, age) {
      return `?type=${type}&age=${age}`;
    },
    isSelected(option) {
      const { age, type } = this.$route.query;
      if (age && type) {
        return option.age === age && option.type === type;
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;
$grey2: #f4f6f9;
$blue: #3f91f7;

.animal-type-age-mobile-filter {
  padding: 16px 0;
  max-width: 100%;
  overflow-y: scroll;
  display: flex;

  &::-webkit-scrollbar {
    background: transparent;
    width: 0px;
  }

  a {
    padding: 8px 24px;
    background: $grey2;
    border-radius: 24px;
    color: $grey1;
    margin-right: 16px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);

    &.selected {
      background-color: $blue;
      color: white;
    }
  }
}
</style>
