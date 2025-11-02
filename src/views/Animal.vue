<template>
  <div class="animal__container">
    <div v-if="animal?.name" class="animal">
      <AnimalNavigation :type="animal.type" :animal-name="animal.name" />
      <AdsInfoForGuests v-if="!hasViewAnimalPermission" />
      <div class="animal__base" :class="{ notVolunteer: !hasViewAnimalPermission }">
        <div v-if="hasViewAnimalPermission" class="animal__base__left">
          <AnimalImageNameContainer />
          <CuratorContactForVolunteers />
        </div>
        <AnimalDescription />
      </div>
      <AdsInfoForVolunteers v-if="hasViewAnimalPermission" />
      <CuratorContactForGuests v-if="!hasViewAnimalPermission" />
      <CommonButton
        v-permission="'DELETE_ANIMAL'"
        class="animal__delete-btn"
        title="Удалить"
        @click="handleDelete()"
      />
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
import AdsInfoForVolunteers from '@/components/animal-view/AdsInfoForVolunteers.vue';
import AdsInfoForGuests from '@/components/animal-view/AdsInfoForGuests.vue';
import CommonButton from '@/components/common/CommonButton.vue';

export default {
  name: 'Animal',
  components: {
    AnimalNavigation,
    AnimalImageNameContainer,
    AnimalDescription,
    CuratorContactForVolunteers,
    CuratorContactForGuests,
    AdsInfoForVolunteers,
    AdsInfoForGuests,
    CommonButton,
  },
  computed: mapState({
    notices: (state) => state.animals.notices,
    permissions: (state) => state.permissions.my,
    animalId() {
      return this.$route.params.id;
    },
    animal: (state) => state.animals.current,
    hasViewAnimalPermission() {
      return this.permissions.includes('VIEW_ANIMALS');
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
  unmounted() {
    this.$store.dispatch('animals/clearAnimal');
  },
  methods: {
    handleDelete() {
      this.$store.dispatch('animals/deleteAnimal', {
        id: this.animalId,
      }).then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;

.animal {
  width: 60%;
  padding: 32px;
  
  &__container {
    background-color: $lightestGrey;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__base {
    display: flex;
    padding-top: 32px;
    height: 700px;

    &.notVolunteer {
      height: unset;
    }

    &__left {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin-right: 32px;
      height: 100%;
    }
  }

  &__delete-btn {
    color: red;
    border-color: red;
    width: 100%;
    margin-top: 32px;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  @media (max-width: 1800px) {
    width: 70%;
  }

  @media (max-width: 1500px) {
    width: 80%;
  }

  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 1023px) {
    width: 100%;

    &__base {
      flex-direction: column;
      height: unset;

      &__left {
        width: 100%;
        height: unset;
      }
    }
  }

  @media (max-width: 479px) {
    padding: 24px 0;
    background-color: white;

    &__base__left {
      margin: 32px 0 0 0;
    }

    &__delete-btn {
      width: 90%;
    }
  }
}
</style>
