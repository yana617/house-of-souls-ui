<template>
  <router-link class="animal-card" :to="`/animals/${id}`">
    <div class="animal-card__image-container">
      <img class="animal-card__image" :src="photos[0]" />
      <div></div>
    </div>
    <p class="animal-card__name">{{ name }}</p>
    <p class="animal-card__description">{{ description }}</p>
    <p class="animal-card__advertising-text">{{ cutText }}</p>
    <span class="animal-card__go-btn">Подробнее</span>
  </router-link>
</template>

<script>
import { computeYearTranslate } from '@/utils/computedTranslates';
import { calculateAge } from '@/utils/date';
import translates from '@/utils/translates/index';
import Filters from '@/utils/enums/Filters';
import AnimalType from '@/utils/enums/AnimalType';

export default {
  name: 'AnimalCard',
  props: {
    id: String,
    name: String,
    photos: Array,
    height: Number,
    sex: String,
    sterilized: Boolean,
    type: String,
    advertisingText: String,
    birthday: String,
    hasViewAnimalPermission: Boolean,
  },
  computed: {
    description() {
      const sterilizedText = translates[Filters.STERILIZED].one[this.sex]?.toLowerCase();
      const sterilizedFullText = this.sterilized ? sterilizedText : `не ${sterilizedText}`;
      const heightText = this.type === AnimalType.DOG ? `, ${this.height} см в холке` : '';
      const age = this.hasViewAnimalPermission ? `, ${this.age}` : '';
      return `${translates[this.sex]}, ${sterilizedFullText}${heightText}${age}`;
    },
    cutText() {
      const cutLength = this.$matchMedia.mobile ? 60 : 40;
      return `${this.advertisingText?.slice(0, cutLength)}...`;
    },
    age() {
      let age = calculateAge(this.birthday);
      const description = computeYearTranslate(age);
      age = age ? `${age} ` : '';
      return `${age}${description}`;
    },
  },
};
</script>

<style scoped lang="scss">
$darkBlue: #2f3e4e;
$grey2: #8a92a6;
$blue: #3f91f7;

.animal-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
  border-radius: 8px;
  overflow: hidden;
  color: $darkBlue;
  padding-bottom: 16px;

  &__image-container {
    height: 170px;
    width: 100%;
  }

  &__image {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    object-fit: cover;
  }

  &__name {
    margin: 0;
    padding: 0 16px;
    margin-top: 16px;
    font-size: 18px;
  }

  &__description {
    text-align: left;
    margin: 0;
    padding: 0 16px;
    font-size: 14px;
    color: $grey2;
    height: 40px;
  }

  &__advertising-text {
    text-align: left;
    padding: 16px 16px 0 16px;
    font-size: 14px;
  }

  &__go-btn {
    color: $blue;
    padding: 0 16px;
  }

  @media (max-width: 1300px) {
    &__image-container {
      height: 150px;
    }
  }

  @media (max-width: 500px) {
    &__image-container {
      height: 180px;
    }
    &__description {
      height: unset;
    }
  }
}
</style>
