<template>
  <div class="description-icon-items">
    <div class="description-icon-items__container">
      <img v-if="animal.type === 'dog'" class="description-icon-items__icon" src="@/assets/dog.png" />
      <img v-if="animal.type === 'cat'" class="description-icon-items__icon" src="@/assets/cat.png" />
      <div class="description-icon-items__sub-container">
        <span class="description-icon-items__data-title">Тип</span>
        <span class="description-icon-items__data-description">{{ typeTranslate }}</span>
      </div>
    </div>

    <div class="description-icon-items__container margin-left">
      <img v-if="animal.sex === 'male'" class="description-icon-items__icon" src="@/assets/male.png" />
      <img v-if="animal.sex === 'female'" class="description-icon-items__icon" src="@/assets/female.png" />
      <div class="description-icon-items__sub-container">
        <span class="description-icon-items__data-title">Пол</span>
        <span class="description-icon-items__data-description">{{ sexTranslate }}</span>
      </div>
    </div>

    <div class="description-icon-items__container margin-left" v-if="hasViewAnimalPermission">
      <img class="description-icon-items__icon" src="@/assets/calendar.png" />
      <div class="description-icon-items__sub-container">
        <span class="description-icon-items__data-title">Дата рождения</span>
        <span class="description-icon-items__data-description">{{ formattedBirthday }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { animalTypes, animalSex } from '@/utils/constants';
import { computeYearTranslate } from '@/utils/computedTranslates';
import { calculateAge, parseDateWithNumbers } from '@/utils/date';

export default {
  name: 'DescriptionIconItems',
  props: {
    hasViewAnimalPermission: Boolean,
  },
  components: {},
  computed: mapState({
    animalId() {
      return this.$route.params.id;
    },
    animal(state) {
      return state.animals.data[this.animalId] || {};
    },
    typeTranslate() {
      return animalTypes[this.animal.type] || this.animal.type;
    },
    sexTranslate() {
      return animalSex[this.animal.sex] || this.animal.sex;
    },
    formattedBirthday() {
      let age = calculateAge(this.animal.birthday);
      const description = computeYearTranslate(age);
      age = age ? `${age} ` : '';
      return `${parseDateWithNumbers(this.animal.birthday)} (${age}${description})`;
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
