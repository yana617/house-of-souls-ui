<template>
  <div class="animal-navigation">
    <router-link class="animal-navigation__link" :to="`/animals`">Животные</router-link>
    <div class="animal-navigation__right-arrow"></div>
    <router-link class="animal-navigation__link" :to="`/animals?type=${type}`">{{ typeTranslate }}</router-link>
    <div class="animal-navigation__right-arrow"></div>
    <span class="animal-navigation__animal-name">{{ animalName }}</span>
  </div>
</template>

<script>
import { animalTypes } from '@/utils/constants';

export default {
  name: 'AnimalNavigation',
  props: {
    type: String,
    animalName: String,
  },
  computed: {
    typeTranslate() {
      return animalTypes[this.type] || this.type;
    },
  },
};
</script>

<style scoped lang="scss">
$blue: #3f91f7;
$grey: #8a92a6;

.animal-navigation {
  display: flex;
  align-items: center;
  color: $grey;

  &__right-arrow {
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 2px;
    margin: 0 6px 0 2px;

    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  &__animal-name {
    color: $blue;
  }

  &__link {
    color: $grey;
    &:hover {
      color: $blue;
      text-decoration: underline;
    }
  }

  @media (max-width: 425px) {
    margin-left: 24px;
  }
}
</style>
