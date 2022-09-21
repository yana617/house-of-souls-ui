<template>
  <div class="description-icon-items">
    <div class="description-icon-items__container">
      <img v-if="isDog" class="description-icon-items__icon" alt="dog" src="@/assets/dog.png" />
      <img v-if="isCat" class="description-icon-items__icon" alt="cat" src="@/assets/cat.png" />
      <div class="description-icon-items__sub-container">
        <span class="description-icon-items__data-title">{{ translates.type }}</span>
        <span class="description-icon-items__data-description">{{ typeTranslate }}</span>
      </div>
    </div>

    <div class="description-icon-items__container margin-left">
      <img v-if="!isFemale" class="description-icon-items__icon" alt="male" src="@/assets/male.png" />
      <img v-if="isFemale" class="description-icon-items__icon" alt="female" src="@/assets/female.png" />
      <div class="description-icon-items__sub-container">
        <span class="description-icon-items__data-title">{{ translates.sex }}</span>
        <span class="description-icon-items__data-description">{{ sexTranslate }}</span>
      </div>
    </div>

    <div v-if="hasViewAnimalPermission" class="description-icon-items__container margin-left">
      <img class="description-icon-items__icon" alt="calendar-icon" src="@/assets/calendar.png" />
      <div class="description-icon-items__sub-container">
        <span class="description-icon-items__data-title">Дата рождения</span>
        <span class="description-icon-items__data-description">{{ formattedBirthday }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { computeYearTranslate } from '@/utils/computedTranslates';
import { calculateAge, parseDateWithNumbers } from '@/utils/date';
import translates from '@/utils/translates/index';
import AnimalType from '@/utils/enums/AnimalType';
import AnimalSex from '@/utils/enums/AnimalSex';

export default {
  name: 'DescriptionIconItems',
  components: {},
  props: {
    hasViewAnimalPermission: Boolean,
  },
  data() {
    return { translates };
  },
  computed: mapState({
    animalId() {
      return this.$route.params.id;
    },
    animal(state) {
      return state.animals.data[this.animalId] || {};
    },
    typeTranslate() {
      return translates[this.animal.type]?.one || this.animal.type;
    },
    sexTranslate() {
      return translates[this.animal.sex] || this.animal.sex;
    },
    formattedBirthday() {
      let age = calculateAge(this.animal.birthday);
      const description = computeYearTranslate(age);
      age = age ? `${age} ` : '';
      return `${parseDateWithNumbers(this.animal.birthday)} (${age}${description})`;
    },
    isDog() {
      return this.animal.type === AnimalType.DOG;
    },
    isCat() {
      return this.animal.type === AnimalType.CAT;
    },
    isFemale() {
      return this.animal.sex === AnimalSex.FEMALE;
    },
  }),
};
</script>

<style scoped lang="scss">
$darkBlue: #2f3e4e;
$green: #42b983;
$grey1: #8a92a6;

.description-icon-items {
  display: flex;
  align-items: center;
  padding: 16px 32px 16px;
  width: 100%;

  &__container {
    display: flex;

    &.margin-left {
      margin-left: 48px;
    }
  }

  &__icon {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 16px;
  }

  &__sub-container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  &__data-title {
    font-weight: 400;
    font-size: 14px;
    color: $grey1;
    margin-bottom: 4px;
    text-align: left;
  }

  &__data-description {
    font-size: 16px;
    text-align: left;
  }

  @media (max-width: 1200px) {
    &__sub-container {
      margin-right: 16px;
    }
  }

  @media (max-width: 850px) {
    &__sub-container {
      margin-right: 32px;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;

    &__container {
      margin: 16px 0;

      &.margin-left {
        margin-left: 0;
      }
    }
  }
}
</style>
