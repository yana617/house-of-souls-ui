<template>
  <div class="map-container">
    <h1>Карта</h1>
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
  <List />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import MainHouse from '@/components/map-view/MainHouse.vue';
import CatHouse from '@/components/map-view/CatHouse.vue';
import AnimalCount from '@/components/map-view/AnimalCount.vue';
import QuarantineHouse from '@/components/map-view/QuarantineHouse.vue';
import RoomNumber from '@/components/map-view/RoomNumber.vue';
import List from '@/components/map-view/List.vue';
import AnimalPlace from '@/utils/enums/AnimalPlace';
import AnimalStatus from '@/utils/enums/AnimalStatus';

const store = useStore();
const route = useRoute();

const animals = computed(() => store.state.animals.list);

const mappedAnimals = computed(() =>
  animals.value.map(animal => ({
    photo: animal.photos ? animal.photos[0] : null,
    id: animal.id,
    name: animal.name,
    sex: animal.sex,
    place: animal.place,
    room: animal.room,
  }))
);

const mainHouseAnimals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.MAIN_HOUSE)
);

const catHouseAnimals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.CAT_HOUSE)
);

const quarantineHouseAnimals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.QUARANTINE_HOUSE)
);

const aviary1Animals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.AVIARY && a.room === 1)
);

const aviary2Animals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.AVIARY && a.room === 2)
);

const aviary3Animals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.AVIARY && a.room === 3)
);

const aviary4Animals = computed(() =>
  mappedAnimals.value.filter(a => a.place === AnimalPlace.AVIARY && a.room === 4)
);

const isAviaryBlink = (roomNumber) => {
  const { place, room } = route.query;
  return place === AnimalPlace.AVIARY && room == roomNumber;
};

onMounted(() => {
  store.dispatch('app/setLoading', true);
  store.dispatch(
    'animals/getAnimals',
    { status: `${AnimalStatus.HOMELESS},${AnimalStatus.PREPARATION}` }
  ).finally(() => {
    store.dispatch('app/setLoading', false);
  });
});
</script>

<style lang="scss">
$lightestGrey: #eff1f3;

.map-container {
  display: flex;
  padding: 16px;
  overflow: auto;
  max-width: 100%;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
}

.blink {
  animation: BLINK-ANIMATION 2s linear infinite;
}

.map {
  display: flex;
  width: 1100px;
  height: 700px;
  min-width: 1100px;
  min-height: 700px;
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