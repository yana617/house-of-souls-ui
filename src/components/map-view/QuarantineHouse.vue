<template>
  <div class="quarantine-house">
    <div class="quarantine-house__room1" :class="{ blink: isBlink(1) }">
      <RoomNumber room-number="1" />
      <MapAnimal
        v-for="animal of firstRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(150, 150, firstRoomAnimals.length)"
      />
    </div>
    <div class="quarantine-house__room2">
      <RoomNumber room-number="2" />
      <MapAnimal
        v-for="animal of secondRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(150, 150, secondRoomAnimals.length)"
      />
    </div>
    <div class="quarantine-house__room3">
      <RoomNumber room-number="3" />
      <MapAnimal
        v-for="animal of thirdRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(300, 50, thirdRoomAnimals.length)"
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
  name: 'QuarantineHouse',
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
  },
  methods: {
    animalsFilteredByRoomNumber(roomNumber) {
      return this.animals.filter((a) => a.room === roomNumber);
    },
    isBlink(roomNumber) {
      const { place, room } = this.$route.query;
      if (place === AnimalPlace.QUARANTINE_HOUSE && room == roomNumber) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style scoped lang="scss">
.quarantine-house {
  width: 300px;
  height: 200px;
  position: relative;
  text-align: left;

  &__room1 {
    width: 150px;
    height: 150px;
    position: absolute;
    border: 1px solid black;
    display: flex;
  }

  &__room2 {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 150px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  &__room3 {
    width: 300px;
    height: 50px;
    position: absolute;
    top: 150px;
    display: flex;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
}
</style>