<template>
  <router-link
    class="map-animal"
    :to="`/animals/${id}`"
    :class="{ pink: sex === AnimalSex.FEMALE, blue: sex === AnimalSex.MALE }"
  >
    <img
      v-if="photo"
      :src="photo"
      :width="sizes[size]"
      :height="sizes[size]"
      class="map-animal__img"
    >
    <div v-else class="map-animal__name">
      <span class="map-animal__name__text" :class="{ pink: sex === AnimalSex.FEMALE, blue: sex === AnimalSex.MALE }">
        {{ name.charAt(0) }}
      </span>
    </div>
  </router-link>
</template>

<script>
import AnimalSex from '@/utils/enums/AnimalSex';

const sizes = {
  small: 20,
  medium: 35,
  large: 45,
}

export default {
  name: 'MapAnimal',
  props: {
    id: String,
    name: String,
    photo: String,
    size: String,
    sex: String,
  },
  data() {
    return { sizes, AnimalSex };
  },
};
</script>

<style scoped lang="scss">
$pink: #f699cd;
$grey1: #8a92a6;
$blue: #3f91f7;

.map-animal {
  position: relative;
  font-weight: 600;
  font-size: 24px;
  border: 2px solid $grey1;
  width: fit-content;
  height: fit-content;
  display: flex;
  border-radius: 50%;
  margin: 5px;

  &.pink {
    border-color: $pink;
  }

  &.blue {
    border-color: $blue;
  }

  &__img {
    border-radius: 50%;
  }

  &__name {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    min-height: 30px;

    &__text {
      display: flex;
      opacity: 0.8;

      &.pink {
        color: $pink;
      }

      &.blue {
        color: $blue;
      }
    }
  }
}
</style>