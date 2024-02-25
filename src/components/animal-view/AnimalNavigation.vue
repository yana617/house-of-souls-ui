<template>
  <div class="animal-navigation">
    <router-link class="animal-navigation__link" :to="`/animals`">
      Животные
    </router-link>
    <div v-if="animalType" class="animal-navigation__right-arrow" />
    <router-link v-if="animalType" class="animal-navigation__link" :to="`/animals?type=${animalType}`">
      {{ typeTranslate }}
    </router-link>
    <div v-if="animalName || age" class="animal-navigation__right-arrow" />
    <span v-if="animalName" class="animal-navigation__animal-name">{{ animalName }}</span>
    <span v-if="age && !animalName">{{ ageTranslate }}</span>
  </div>
</template>

<script>
import translates from '@/utils/translates/index';

export default {
  name: 'AnimalNavigation',
  props: {
    animalName: String,
    type: String,
  },
  computed: {
    animalType() {
      return this.type || this.$route.query?.type;
    },
    age() {
      return this.$route.query?.age;
    },
    typeTranslate() {
      return translates[this.animalType]?.many || this.animalType;
    },
    ageTranslate() {
      return translates[this.age].toLowerCase();
    },
  },
};
</script>

<style scoped lang="scss">
$blue: #3f91f7;
$grey1: #8a92a6;

.animal-navigation {
  display: flex;
  align-items: center;
  color: $grey1;
  font-size: 16px;

  &__right-arrow {
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 2px;
    margin: 2px 6px 0 2px;

    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  &__animal-name {
    color: $blue;
  }

  &__link {
    color: $grey1;
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
