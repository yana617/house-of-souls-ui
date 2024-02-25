<template>
  <div class="animal__container">
    <div v-if="animal" class="animal">
      <AnimalNavigation :type="animal.type" :animal-name="animal.name" />
      <div class="animal__base">
        <div v-if="hasViewAnimalPermission" class="animal__base__left">
          <AnimalImageNameContainer />
          <CuratorContactForVolunteers />
        </div>
        <AnimalDescription :has-view-animal-permission="hasViewAnimalPermission" />
      </div>
      <CuratorContactForGuests v-if="!hasViewAnimalPermission" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AnimalNavigation from '@/components/animal-view/AnimalNavigation.vue';
import AnimalImageNameContainer from '@/components/animal-view/AnimalImageNameContainer.vue';
import AnimalDescription from '@/components/animal-view/AnimalDescription.vue';
import CuratorContactForVolunteers from '@/components/animal-view/CuratorContactForVolunteers.vue';
import CuratorContactForGuests from '@/components/animal-view/CuratorContactForGuests.vue';

export default {
  name: 'Animal',
  components: {
    AnimalNavigation,
    AnimalImageNameContainer,
    AnimalDescription,
    CuratorContactForVolunteers,
    CuratorContactForGuests,
  },
  computed: mapState({
    notices: (state) => state.animals.notices,
    permissions: (state) => state.permissions.my,
    animalId() {
      return this.$route.params.id;
    },
    animal(state) {
      return state.animals.data[this.animalId];
    },
    hasViewAnimalPermission() {
      return this.permissions.includes('VIEW_ANIMAL');
    },
  }),
  created() {
    this.$store.dispatch('notices/clearNotices');
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('animals/getAnimalById', { id: this.animalId }).finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
    if (!this.hasViewAnimalPermission) {
      this.$store.dispatch('animalMedicalHistory/getLastMedicalItem', {
        animal_id: this.animalId,
        type: 'vaccine',
      });
    }
  },
};
</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;

.animal {
  &__container {
    background-color: $lightestGrey;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
  }

  width: 60%;
  padding: 32px;

  &__base {
    display: flex;
    padding-top: 32px;

    &__left {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin-right: 32px;
    }
  }

  @media (max-width: 1800px) {
    width: 70%;
  }

  @media (max-width: 1500px) {
    width: 80%;
  }

  @media (max-width: 1100px) {
    width: 90%;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 850px) {
    &__base {
      flex-direction: column;

      &__left {
        width: 100%;
      }
    }
  }

  @media (max-width: 425px) {
    padding: 24px 0;
    background-color: white;

    &__base__left {
      margin: 32px 0 0 0;
    }
  }
}
</style>
