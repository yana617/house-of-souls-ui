<template>
  <div class="list__container">
    <div class="list">
      <div v-for="houseType of fullList" :key="houseType.label" class="list__place">
        <h2>{{ houseType.label }}</h2>

        <div class="list__place__rooms-container">
          <div v-for="room of houseType.animalsByHouseType" :key="room.label">
            <div class="list__place__room">
              <h3>{{ room.label }}</h3>
              <span v-if="!room.animals.length">-</span>
              <span v-for="animal of room.animals" :key="animal.id">{{ animal.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimalPlace from '@/utils/enums/AnimalPlace';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const animals = computed(() => store.state.animals.list);

const getAnimals = (place = AnimalPlace.MAIN_HOUSE, room = 1) => {
  return animals.value?.filter((a) => a.place == place && a.room == room);
};

const fullList = computed(() => [{
  label: "Собачий дом",
  animalsByHouseType: [...Array(6).keys()].map((index) => ({
    label: `Комната ${index + 1}`,
    animals: getAnimals(AnimalPlace.MAIN_HOUSE, index + 1)
  })),
}, {
  label: "Вольеры",
  animalsByHouseType: [...Array(4).keys()].map((index) => ({
    label: `Вольер ${index + 1}`,
    animals: getAnimals(AnimalPlace.AVIARY, index + 1)
  })),
}, {
  label: "Кошачий дом",
  animalsByHouseType: [...Array(4).keys()].map((index) => ({
    label: `Комната ${index + 1}`,
    animals: getAnimals(AnimalPlace.CAT_HOUSE, index + 1)
  })),
}, {
  label: "Бытовка",
  animalsByHouseType: [...Array(3).keys()].map((index) => ({
    label: `Комната ${index + 1}`,
    animals: getAnimals(AnimalPlace.QUARANTINE_HOUSE, index + 1)
  })),
}]);
</script>

<style lang="scss">
$lightestGrey: #eff1f3;

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 0;
  width: 1100px;
  min-width: 1100px;

  &__container {
    display: flex;
    justify-content: center;
    overflow: auto;
    max-width: 100%;
  }

  &__place {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__rooms-container {
      display: flex;
      gap: 8px;
    }

    &__room {
      display: flex;
      flex-direction: column;
      width: 150px;
      gap: 8px;
      padding: 16px 32px;
      background-color: $lightestGrey;
      border-radius: 16px;
    }
  }

  @media (max-width: 1200px) {
    &__container {
      justify-content: flex-start;
      padding: 32px;
    }
  }
}
</style>