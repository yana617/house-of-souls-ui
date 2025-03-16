<template>
  <div class="main-house">
    <div class="main-house__room1" :class="{ blink: isBlink(1) }">
      <RoomNumber room-number="1" />
      <MapAnimal
        v-for="animal of firstRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(200, 100, firstRoomAnimals.length)"
      />
    </div>
    <div class="main-house__room2" :class="{ blink: isBlink(2) }">
      <RoomNumber room-number="2" />
      <MapAnimal
        v-for="animal of secondRoomAnimals"
        :key="animal.id"
        v-bind="animal"
        :size="getAnimalCardSize(200, 100, secondRoomAnimals.length)"
      />
    </div>
    <div class="main-house__room3">
      <div class="main-house__room3__a" :class="{ blink: isBlink(3) }">
        <RoomNumber room-number="3" />
        <MapAnimal
          v-for="animal of thirdRoomAnimals"
          :key="animal.id"
          v-bind="animal"
          :size="getAnimalCardSize(100, 200, thirdRoomAnimals.length)"
        />
      </div>
      <div class="main-house__room3__b" :class="{ blink: isBlink(4) }">
        <RoomNumber room-number="4" />
        <MapAnimal
          v-for="animal of fourthRoomAnimals"
          :key="animal.id"
          v-bind="animal"
          :size="getAnimalCardSize(100, 200, fourthRoomAnimals.length)"
        />
      </div>
    </div>
    <div class="main-house__room4">
      <div class="main-house__room4__a" :class="{ blink: isBlink(5) }">
        <RoomNumber room-number="5" />
        <MapAnimal
          v-for="animal of fifthRoomAnimals"
          :key="animal.id"
          v-bind="animal"
          :size="getAnimalCardSize(200, 100, fifthRoomAnimals.length)"
        />
      </div>
      <div class="main-house__room4__b">
        <div class="main-house__room4__b__a">
          <div class="main-house__room4__b__a__door" />
        </div>
        <div class="main-house__room4__b__b" :class="{ blink: isBlink(6) }">
          <RoomNumber room-number="6" />
          <MapAnimal
            v-for="animal of sixthRoomAnimals"
            :key="animal.id"
            v-bind="animal"
            :size="getAnimalCardSize(100, 100, sixthRoomAnimals.length)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomNumber from './RoomNumber.vue';
import MapAnimal from './MapAnimal.vue';
import { getAnimalCardSize } from '@/utils/get-animal-card-size';
import AnimalPlace from '@/utils/enums/AnimalPlace';

export default {
  name: 'MainHouse',
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
    fifthRoomAnimals() {
      return this.animalsFilteredByRoomNumber(5);
    },
    sixthRoomAnimals() {
      return this.animalsFilteredByRoomNumber(6);
    }
  },
  methods: {
    animalsFilteredByRoomNumber(roomNumber) {
      return this.animals.filter((a) => a.room === roomNumber);
    },
    isBlink(roomNumber) {
      const { place, room } = this.$route.query;
      if (place === AnimalPlace.MAIN_HOUSE && room == roomNumber) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style scoped lang="scss">
$lightestGrey: #eff1f3;

.blink {
  animation: BLINK-ANIMATION 2s linear infinite;
}

.main-house {
  width: 400px;
  height: 300px;
  position: relative;
  text-align: left;

  &__room1 {
    width: 200px;
    height: 100px;
    position: absolute;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
  }

  &__room2 {
    width: 200px;
    height: 100px;
    position: absolute;
    left: 200px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
  }

  &__room3 {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 100px;
    display: flex;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;

    &__a,
    &__b {
      width: 100px;
      height: 199px;
    }

    &__a {
      border-right: 1px solid black;
    }
  }

  &__room4 {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 200px;
    top: 100px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;

    &__a,
    &__b {
      width: 200px;
      height: 100px;
    }

    &__b {
      border-top: 1px solid black;
      display: flex;

      &__a,
      &__b {
        width: 100px;
        min-height: 100%;
      }

      &__a {
        border-right: 1px solid black;
        position: relative;

        &__door {
          position: absolute;
          width: 40px;
          height: 5px;
          background-color: grey;
          bottom: -2px;
          left: 30px;
        }
      }
    }
  }
}
</style>