<template>
  <div class="cat-house">
    <span class="cat-house__title">Кошачий дом</span>
    <div class="cat-house__room cat-house__room1" :class="{ blink: isBlink(1) }">
      <RoomNumber room-number="1" />
      <AnimalCount :count="firstRoomAnimals.length" />
    </div>
    <div class="cat-house__room cat-house__room2" :class="{ blink: isBlink(2) }">
      <RoomNumber room-number="2" />
      <AnimalCount :count="secondRoomAnimals.length" />
    </div>
    <div class="cat-house__room cat-house__room3" :class="{ blink: isBlink(3) }">
      <RoomNumber room-number="3" />
      <AnimalCount :count="thirdRoomAnimals.length" />
    </div>
    <div class="cat-house__room cat-house__room4" :class="{ blink: isBlink(4) }">
      <RoomNumber room-number="4" />
      <AnimalCount :count="fourthRoomAnimals.length" />
    </div>
    <Door is-vertical class="cat-house__main-door" />
  </div>
</template>

<script>
import RoomNumber from './RoomNumber.vue';
import Door from './Door.vue';
import AnimalPlace from '@/utils/enums/AnimalPlace';
import { getAnimalCardSize } from '@/utils/get-animal-card-size';

export default {
  name: 'CatHouse',
  components: {
    RoomNumber,
    Door,
  },
  props: {
    animals: Array,
  },
  data() {
    return { getAnimalCardSize };
  },
  computed: {
    firstRoomAnimals() {
      return this.animalsFilteredByRoomNumber(1);
    },
    secondRoomAnimals() {
      return this.animalsFilteredByRoomNumber(2);
    },
    thirdRoomAnimals() {
      return this.animalsFilteredByRoomNumber(3);
    },
    fourthRoomAnimals() {
      return this.animalsFilteredByRoomNumber(4);
    },
  },
  methods: {
    animalsFilteredByRoomNumber(roomNumber) {
      return this.animals.filter((a) => a.room === roomNumber);
    },
    isBlink(roomNumber) {
      const { place, room } = this.$route.query;
      if (place === AnimalPlace.CAT_HOUSE && room == roomNumber) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style scoped lang="scss">
$lightestGrey: #eff1f3;

.cat-house {
  width: 400px;
  height: 250px;
  position: relative;
  text-align: left;

  &__main-door {
    background-color: yellow;
    border: 1px solid black;
    left: -2px;
    right: unset;
    bottom: 20px !important;
  }

  &__title {
    position: absolute;
    bottom: -20px;
  }

  &__room {
    position: absolute;
    display: flex;
  }

  &__room1 {
    width: 200px;
    height: 150px;
    border: 1px solid black;
  }

  &__room2 {
    width: 200px;
    height: 150px;
    left: 200px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  &__room3 {
    width: 150px;
    height: 100px;
    top: 150px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  &__room4 {
    width: 250px;
    height: 100px;
    left: 150px;
    top: 150px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
}
</style>