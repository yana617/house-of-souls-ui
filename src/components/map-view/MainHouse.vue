<template>
  <div class="main-house">
    <span class="main-house__title">Главный дом</span>
    <div class="main-house__room1" :class="{ blink: isBlink(1) }">
      <RoomNumber room-number="1" />
      <AnimalCount :count="firstRoomAnimals.length" />
      <Door class="main-house__room1__door" />
    </div>
    <div class="main-house__room2" :class="{ blink: isBlink(2) }">
      <RoomNumber room-number="2" />
      <AnimalCount :count="secondRoomAnimals.length" />
      <Door class="main-house__room2__door" />
    </div>
    <div class="main-house__room3">
      <div class="main-house__room3__a" :class="{ blink: isBlink(3) }">
        <RoomNumber room-number="3" />
        <AnimalCount :count="thirdRoomAnimals.length" />
        <Door is-vertical class="main-house__room3__a__door" />
      </div>
      <div class="main-house__room3__b" :class="{ blink: isBlink(4) }">
        <RoomNumber room-number="4" />
        <AnimalCount :count="fourthRoomAnimals.length" />
      </div>
    </div>
    <div class="main-house__room4">
      <div class="main-house__room4__a" :class="{ blink: isBlink(5) }">
        <RoomNumber room-number="5" />
        <AnimalCount :count="fifthRoomAnimals.length" />
        <Door class="main-house__room4__a__door" />
      </div>
      <div class="main-house__room4__b">
        <div class="main-house__room4__b__a">
          <Door class="main-house__room4__b__a__door main-house__main-door" />
        </div>
        <div class="main-house__room4__b__b" :class="{ blink: isBlink(6) }">
          <RoomNumber room-number="6" />
          <AnimalCount :count="sixthRoomAnimals.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomNumber from './RoomNumber.vue';
import Door from './Door.vue';
import { getAnimalCardSize } from '@/utils/get-animal-card-size';
import AnimalPlace from '@/utils/enums/AnimalPlace';

export default {
  name: 'MainHouse',
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

  &__main-door {
    background-color: yellow;
    border: 1px solid black;
  }

  &__title {
    position: absolute;
    top: -20px;
    right: 0;
  }

  &__room1 {
    width: 200px;
    height: 100px;
    position: absolute;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;

    &__door {
      right: 30px;
    }
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
  
    &__door {
      right: 40px;
    }
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
      position: relative;
    }

    &__a {
      border-right: 1px solid black;
      
      &__door {
        top: 70px;
      }
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

    &__a {
      &__door {
        left: 40px;
        z-index: 10;
      }
    }

    &__a,
    &__b {
      width: 200px;
      height: 100px;
      position: relative;
    }

    &__b {
      border-top: 1px solid black;
      display: flex;
      position: relative;

      &__a,
      &__b {
        width: 100px;
        min-height: 100%;
        position: relative;
      }

      &__a {
        border-right: 1px solid black;
        position: relative;

        &__door {
          left: 40px;
        }
      }
    }
  }
}
</style>