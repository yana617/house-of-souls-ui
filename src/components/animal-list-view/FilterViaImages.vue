<template>
  <div class="filter-via-images">
    <div
      v-for="filter of imageFilters"
      :key="filter.labelShort"
      class="filter-via-images__item margin-right"
      :class="{ selected: selected(filter.type, filter.age) }"
      @click="select(filter.type, filter.age)"
    >
      <img class="filter-via-images__item__image" alt="filter-image" :src="getImgUrl(filter.image)" />
      <div class="filter-via-images__item__title">
        <span class="filter-via-images__item__title__text">{{ filter.labelLong }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import imageFilters from '@/utils/maps/imageFilters';

export default {
  name: 'FilterViaImages',
  props: {
    hasViewAnimalPermission: Boolean,
  },
  data() {
    return { imageFilters };
  },
  computed: mapState({
    permissions: (state) => state.permissions.my,
    hasViewAnimalPermission() {
      return this.permissions.includes('VIEW_ANIMAL');
    },
  }),
  methods: {
    selected(itemType, itemAge) {
      const { type, age } = this.$route.query;
      if (!type || !age) {
        return false;
      }
      return type === itemType && age === itemAge;
    },
    getImgUrl(pet) {
      const images = require.context('../../assets/', false, /\.jpg|.jpeg$/);
      return images(`./${pet}`);
    },
    select(type, age) {
      if (!this.selected(type, age)) {
        this.$store.dispatch('app/setLoading', true);
        this.$store.dispatch('animals/getAnimals', { type, age }).finally(() => {
          this.$store.dispatch('app/setLoading', false);

          window.scrollTo({
            top: this.hasViewAnimalPermission ? 280 : 320,
            behavior: 'smooth',
          });
        });
        this.$router.push(`/animals?type=${type}&age=${age}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
$black1: #232d42;

.filter-via-images {
  width: 100%;
  display: flex;
  margin: 32px 0px;
  align-items: flex-end;

  &__item {
    display: flex;
    width: 25%;
    position: relative;
    cursor: pointer;

    &:hover &__image {
      filter: brightness(70%);
      transition: all 0.5s ease;
      -webkit-filter: brightness(70%);
      -webkit-transition: all 0.5s ease;
    }

    &.margin-right {
      margin-right: 24px;
    }

    &.selected {
      flex-direction: column;
      margin-top: -28px;
    }

    &.selected &__title {
      position: relative;
      padding: 0;
      margin-top: 8px;

      &:hover {
        justify-content: flex-start;
        align-items: flex-start;
      }

      &__text {
        color: $black1;
        padding: 0;
        border-radius: 6px;
      }
    }

    &__image {
      max-width: 100%;
      min-width: 100%;
      object-fit: cover;
      border-radius: 8px;
      max-height: 130px;
    }

    &__title {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 8px;

      &:hover {
        justify-content: center;
        align-items: center;
      }

      &__text {
        display: flex;
        color: white;
        font-weight: bold;
      }
    }

    &:last-child {
      &.margin-right {
        margin-right: 0 !important;
      }
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;

    &__item {
      width: 100%;
      margin: 8px 0;

      &.margin-right {
        margin-right: 0;
      }

      &__image {
      max-height: 150px;
    }
    }
  }
}
</style>
