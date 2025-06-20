<template>
  <div class="map-container">
    <div class="map">
      <div class="map__door" />
      <div class="map__quarantine-house">
        <QuarantineHouse :animals="quarantineHouseAnimals" />
      </div>
      <div class="map__main-house">
        <MainHouse :animals="mainHouseAnimals" />
      </div>
      <div class="map__cat-house">
        <CatHouse :animals="catHouseAnimals" />
      </div>
      <div class="map__aviary1" :class="{ blink: isAviaryBlink(1) }">
        <RoomNumber room-number="1" />
        <AnimalCount :count="aviary1Animals.length" />
      </div>
      <div class="map__aviary23">
        <div class="map__aviary23__a" :class="{ blink: isAviaryBlink(2) }">
          <RoomNumber room-number="2" />
          <AnimalCount :count="aviary2Animals.length" />
        </div>
        <div class="map__aviary23__b" :class="{ blink: isAviaryBlink(3) }">
          <RoomNumber room-number="3" />
          <AnimalCount :count="aviary3Animals.length" />
        </div>
      </div>
      <div class="map__aviary4" :class="{ blink: isAviaryBlink(4) }">
        <RoomNumber room-number="4" />
        <AnimalCount :count="aviary4Animals.length" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MainHouse from '@/components/map-view/MainHouse.vue';
import CatHouse from '@/components/map-view/CatHouse.vue';
import AnimalCount from '@/components/map-view/AnimalCount.vue';
import QuarantineHouse from '@/components/map-view/QuarantineHouse.vue';
import RoomNumber from '@/components/map-view/RoomNumber.vue';
import AnimalPlace from '@/utils/enums/AnimalPlace';
import { getAnimalCardSize } from '@/utils/get-animal-card-size';

export default {
  name: 'Map',
  components: { MainHouse, CatHouse, QuarantineHouse, RoomNumber, AnimalCount },
  data() {
    return { getAnimalCardSize };
  },
  computed: mapState({
    animals: (state) => state.animals.list,
    mainHouseAnimals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.MAIN_HOUSE);
    },
    catHouseAnimals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.CAT_HOUSE);
    },
    quarantineHouseAnimals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.QUARANTINE_HOUSE);
    },
    aviary1Animals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.AVIARY && a.room === 1);
    },
    aviary2Animals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.AVIARY && a.room === 2);
    },
    aviary3Animals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.AVIARY && a.room === 3);
    },
    aviary4Animals() {
      return this.mappedAnimals.filter((a) => a.place === AnimalPlace.AVIARY && a.room === 4);
    },
    mappedAnimals() {
      return this.animals.map((animal) => ({
        photo: animal.photos ? animal.photos[0] : null,
        id: animal.id,
        name: animal.name,
        sex: animal.sex,
        place: animal.place,
        room: animal.room,
      }));
    }
  }),
  created() {
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('animals/getAnimals').finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
  },
  methods: {
    isAviaryBlink(roomNumber) {
      const { place, room } = this.$route.query;
      if (place === AnimalPlace.AVIARY && room == roomNumber) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style lang="scss">
$lightestGrey: #eff1f3;

.map-container {
  min-height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.blink {
  animation: BLINK-ANIMATION 2s linear infinite;
}

.map {
  display: flex;
  width: 1100px;
  height: 700px;
  background-color: $lightestGrey;
  border-radius: 8px;
  position: relative;

  &__door {
    position: absolute;
    width: 5px;
    height: 50px;
    background-color: grey;
    left: -2px;
    top: 250px;
  }

  &__quarantine-house {
    width: 300px;
    height: 200px;
    position: absolute;
    top: 0px;
    left: 50px;
  }

  &__main-house {
    position: absolute;
    top: 250px;
    left: 150px;
  }

  &__cat-house {
    position: absolute;
    top: 250px;
    left: 650px;
  }

  &__aviary1 {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 600px;
    left: 200px;
    border: 1px solid black;
    display: flex;
  }

  &__aviary23 {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 600px;
    left: 500px;
    border: 1px solid black;
    text-align: left;
    display: flex;
    flex-direction: column;

    &__a {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid black;
      display: flex;
      position: relative;
    }

    &__b {
      width: 100%;
      height: 50px;
      display: flex;
      position: relative;
    }
  }

  &__aviary4 {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0px;
    left: 800px;
    border: 1px solid black;
  }

  @keyframes BLINK-ANIMATION {
    0% {
      background-color: #98FB98;
    }

    50% {
      background-color: white;
    }

    100% {
      background-color: #98FB98;
    }
  }
}
</style>