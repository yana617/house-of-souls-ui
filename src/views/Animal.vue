<template>
  <div class="animal__container">
    <div class="animal" v-if="animal">
      <AnimalNavigation :type="animal.type" :animalName="animal.name" />
      <div class="animal__base">
        <div v-if="hasPermission('VIEW_ANIMAL')" class="animal__base__left">
          <AnimalImageNameContainer />
          <CuratorContact />
        </div>
        <AnimalDescription :hasViewAnimalPermission="hasPermission('VIEW_ANIMAL')" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AnimalNavigation from '@/components/animal-view/AnimalNavigation.vue';
import AnimalImageNameContainer from '@/components/animal-view/AnimalImageNameContainer.vue';
import AnimalDescription from '@/components/animal-view/AnimalDescription.vue';
import CuratorContact from '@/components/animal-view/CuratorContact.vue';

export default {
  name: 'Animal',
  components: {
    AnimalNavigation,
    AnimalImageNameContainer,
    AnimalDescription,
    CuratorContact,
  },
  created() {
    this.$store.dispatch('notices/clearNotices');
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('animals/getAnimalById', { id: this.animalId }).finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
    if (!this.hasPermission('VIEW_ANIMAL')) {
      this.$store.dispatch('animalMedicalHistory/getLastMedicalItem', { animal_id: this.animalId, type: 'vaccine' });
    }
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
  }),
  methods: {
    hasPermission(permission) {
      return this.permissions.includes(permission);
    },
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

    &__left {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin: 32px 32px 32px 0;
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
