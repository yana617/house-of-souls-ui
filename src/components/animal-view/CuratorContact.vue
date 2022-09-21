<template>
  <div class="curator-contact" :class="{ loading }">
    <div v-if="curator" class="curator-contact__sub-container">
      <span class="curator-contact__title">Куратор</span>
      <router-link v-if="hasCurator" :to="`/users/${animal.curator_id}`">
        <span class="curator-contact__name">{{ curator.name }}</span>
      </router-link>
      <span v-if="!hasCurator" class="curator-contact__name">{{ spareCurator.name }}</span>
    </div>
    <PhoneModal
      :visible="phoneModalOpen"
      :spare-curator="spareCurator"
      :place="animal.place"
      @onclose="phoneModalOpen = false"
    />
    <div v-if="!loading" class="curator-contact__phone-container" @click="phoneModalOpen = true">
      <img class="curator-contact__phone-icon" alt="phone" src="@/assets/phone.png" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { curators } from '@/utils/constants';
import PhoneModal from './PhoneModal.vue';

export default {
  name: 'CuratorContact',
  components: { PhoneModal },
  data() {
    return {
      phoneModalOpen: false,
      loading: false,
    };
  },
  computed: mapState({
    curator: (state) => state.users.curator,
    animalId() {
      return this.$route.params.id;
    },
    animal(state) {
      return state.animals.data[this.animalId] || {};
    },
    hasCurator() {
      return this.curator.name || this.loading;
    },
    spareCurator() {
      return curators[this.animal.type];
    },
  }),
  created() {
    if (this.animal.curator_id) {
      this.loading = true;
      this.$store.dispatch('users/getCurator', { userId: this.animal.curator_id }).finally(() => {
        this.loading = false;
      });
    }
  },
};
</script>

<style scoped lang="scss">
$blue: #3f91f7;
$grey: #8a92a6;
$darkBlue: #2f3e4e;

.curator-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 100%;
  margin-top: 32px;
  padding: 16px 48px;

  &.loading {
    animation: color-change 0.5s infinite linear alternate;
    transition: all 0.4s ease;
  }

  @keyframes color-change {
    0% {
      background-color: inherit;
    }
    100% {
      background-color: rgb(230, 230, 230);
    }
  }

  &__sub-container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-right: 64px;
  }

  &__title {
    font-weight: 400;
    font-size: 14px;
    color: #8a92a6;
    margin-bottom: 4px;
  }

  &__name {
    font-size: 16px;
    text-align: left;
  }

  &__phone-container {
    height: 44px;
    width: 44px;
    border-radius: 22px;
    background-color: $darkBlue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: $blue;
    }
  }

  &__phone-icon {
    height: 16px;
    width: 16px;
  }

  @media (max-width: 425px) {
    box-shadow: 0px 0px 28px rgba(208, 210, 218, 0.4);
    border-radius: 0;
    margin: 32px 0;
  }
}
</style>
