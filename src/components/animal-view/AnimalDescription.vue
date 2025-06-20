<template>
  <div class="animal-description" :class="{ 'full-width': !hasViewAnimalPermission }">
    <div class="animal-description__title-container">
      <span class="animal-description__title">Описание</span>
    </div>
    <DescriptionIconItems :has-view-animal-permission="hasViewAnimalPermission" />
    <div v-if="hasViewAnimalPermission" class="animal-description__row border-bottom">
      <div class="animal-description__row__sub-container">
        <span class="animal-description__data-title">Расположение</span>
        <span class="animal-description__data-description">{{ placeTranslate }}</span>
      </div>
      <div class="animal-description__row__sub-container">
        <span class="animal-description__data-title">{{ roomTitle }}</span>
        <span class="animal-description__data-description">
          <router-link v-if="animal.room" :to="`/map?place=${animal.place}&room=${animal.room}`">
            {{ animal.room }}
          </router-link>
          <span v-if="!animal.room">-</span>
        </span>
      </div>
    </div>

    <div v-if="hasViewAnimalPermission" class="animal-description__row">
      <div class="animal-description__row__sub-container">
        <span class="animal-description__data-title">Дата поступления</span>
        <span class="animal-description__data-description">
          {{ formattedSecondBirthday }} (в домике - {{ getPassedTimeCount() }})
        </span>
      </div>
    </div>

    <div class="animal-description__row border-bottom" :class="{ 'no-padding': hasViewAnimalPermission }">
      <div class="animal-description__row__sub-container">
        <span class="animal-description__data-title">История</span>
        <span class="animal-description__data-description">{{ animal.description || "-" }}</span>
      </div>
    </div>

    <div class="animal-description__row">
      <div class="animal-description__row__sub-container">
        <span class="animal-description__data-title">{{ sterilizedTitle }}</span>
        <span class="animal-description__data-description">{{ sterilizedTranslate }}</span>
      </div>
      <div v-if="isDog && animal.height" class="animal-description__row__sub-container">
        <span class="animal-description__data-title">Рост в холке</span>
        <span class="animal-description__data-description"> {{ heightTranslate }}</span>
      </div>
      <div v-if="!hasViewAnimalPermission" class="animal-description__row__sub-container">
        <span class="animal-description__data-title">Последняя прививка</span>
        <span class="animal-description__data-description">{{ formattedLastVaccine }}</span>
      </div>
    </div>

    <div class="animal-description__row no-padding">
      <div class="animal-description__row__sub-container">
        <span class="animal-description__data-title">Особенности здоровья</span>
        <span class="animal-description__data-description">{{ animal.health_details || '-' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Filters from '@/utils/enums/Filters';
import {
  computeHeightRangeTranslate,
  computeMonthTranslate,
  computeYearTranslate,
} from '@/utils/computedTranslates';
import { parseDateWithNumbers, calculatePassedTime } from '@/utils/date';
import translates from '@/utils/translates/index';
import AnimalType from '@/utils/enums/AnimalType';
import AnimalPlace from '@/utils/enums/AnimalPlace';

import DescriptionIconItems from './DescriptionIconItems.vue';

export default {
  name: 'AnimalDescription',
  components: { DescriptionIconItems },
  computed: mapState({
    permissions: (state) => state.permissions.my,
    lastVaccine: (state) => state.animalMedicalHistory.last,
    animalId() {
      return this.$route.params.id;
    },
    animal: (state) => state.animals.current,
    roomTitle() {
      return this.animal.place === AnimalPlace.AVIARY ? 'Номер вольера' : 'Комната';
    },
    sterilizedTitle() {
      return translates[Filters.STERILIZED]?.title?.[this.animal.sex];
    },
    heightTranslate() {
      const { height } = this.animal;
      return `${height} см в холке (${computeHeightRangeTranslate(height)})`;
    },
    placeTranslate() {
      return translates[this.animal.place] || '-';
    },
    sterilizedTranslate() {
      const start = this.animal.sterilized ? '' : 'Не ';
      const end = translates[Filters.STERILIZED]?.one?.[this.animal.sex];
      return `${start}${start ? end?.toLowerCase() : end}`;
    },
    formattedLastVaccine() {
      if (!this.lastVaccine) {
        return '-';
      }
      return "-";
      // const { date, drugName } = this.lastVaccine;
      // return `${parseDateWithNumbers(date)} (${drugName})`;
    },
    formattedSecondBirthday() {
      return parseDateWithNumbers(this.animal.second_birthday);
    },
    isDog() {
      return this.animal?.type === AnimalType.DOG;
    },
    hasViewAnimalPermission() {
      return this.permissions.includes('VIEW_ANIMALS');
    },
  }),
  methods: {
    getPassedTimeCount() {
      const count = calculatePassedTime(this.animal.second_birthday);
      const years = count.years ? `${count.years} ${computeYearTranslate(count.years)} ` : '';
      const months = count.months ? `${count.months} ${computeMonthTranslate(count.months)}` : '';
      return `${years}${months}` || 'недавно';
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;
$black1: #232d42;
$grey2: #f4f6f9;

.animal-description {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 70%;
  color: $black1;
  box-sizing: border-box;

  &.full-width {
    width: 100%;
  }

  &__title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 32px;
  }

  &__title {
    font-weight: 500;
    font-size: 28px;
    margin-right: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
    padding: 20px 32px;
    width: 100%;

    &.no-padding {
      padding-top: 0px;
    }

    &.border-bottom {
      border-bottom: 1.5px solid $grey2;
    }

    &__sub-container {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-right: 64px;
    }
  }

  &__data-title {
    font-weight: 400;
    font-size: 16px;
    color: $grey1;
    margin-bottom: 4px;
    text-align: left;
  }

  &__data-description {
    font-size: 18px;
    text-align: left;
  }

  @media (max-width: 1500px) {
    &__row__sub-container {
      margin-right: 48px;
    }
  }

  @media (max-width: 1200px) {
    &__row__sub-container {
      margin-right: 32px;
    }
  }

  @media (max-width: 850px) {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 700px) {
    &__row {
      flex-direction: column;
      align-items: flex-start;
      padding: 0px 32px;

      &__sub-container {
        margin: 16px 0;
      }
    }
  }

  @media (max-width: 479px) {
    box-shadow: none;
  }
}
</style>
