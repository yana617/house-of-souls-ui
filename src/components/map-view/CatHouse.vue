<template>
  <div class="cat-house">
    <div class="cat-house__room cat-house__room1" :class="{ blink: isBlink(1) }">
      <RoomNumber room-number="1" />
      <MapAnimal
        v-for="animal of firstRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(200, 150, firstRoomAnimals.length)"
      />
    </div>
    <div class="cat-house__room cat-house__room2" :class="{ blink: isBlink(2) }">
      <RoomNumber room-number="2" />
      <MapAnimal
        v-for="animal of secondRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(200, 150, secondRoomAnimals.length)"
      />
    </div>
    <div class="cat-house__room cat-house__room3" :class="{ blink: isBlink(3) }">
      <RoomNumber room-number="3" />
      <MapAnimal
        v-for="animal of thirdRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(150, 100, thirdRoomAnimals.length)"
      />
    </div>
    <div class="cat-house__room cat-house__room4" :class="{ blink: isBlink(4) }">
      <RoomNumber room-number="4" />
      <MapAnimal
        v-for="animal of fourthRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(250, 100, fourthRoomAnimals.length)"
      />
    </div>
  </div>
</template>

<script>
import RoomNumber from './RoomNumber.vue';
import MapAnimal from './MapAnimal.vue';
import AnimalPlace from '@/utils/enums/AnimalPlace';
import { getAnimalCardSize } from '@/utils/get-animal-card-size';

export default {
  name: 'CatHouse',
  components: {
    RoomNumber,
    MapAnimal,
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