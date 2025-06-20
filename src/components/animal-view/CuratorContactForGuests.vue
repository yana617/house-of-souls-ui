<template>
  <div class="curator-contact" :class="{ loading }">
    <p class="curator-contact__h1">
      Контакты
    </p>
    <div class="curator-contact__sub-container">
      <span class="curator-contact__title">Куратор</span>
      <span class="curator-contact__value">{{ curator.name || defaultCurator.name }}</span>
    </div>
    <div class="curator-contact__sub-container">
      <span class="curator-contact__title">Для связи</span>
      <a class="curator-contact__value" :href="`tel:${curatorPhone}`">
        {{ curatorPhone }}
      </a>
    </div>
    <div v-if="!curator.phone" class="curator-contact__sub-container">
      <span class="curator-contact__title">Для связи</span>
      <a class="curator-contact__value" :href="`tel:${defaultCurator.phones[1]}`">{{ defaultCurator.phones[1] }}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { defaultCuratorPhones } from '@/utils/constants';
import prettifyPhone from '@/utils/prettifyPhone';

export default {
  name: 'CuratorContactForGuests',
  data() {
    return {
      loading: false,
      prettifyPhone,
    };
  },
  computed: mapState({
    curator: (state) => state.users.curator,
    animalId() {
      return this.$route.params.id;
    },
    animal: (state) => state.animals.current,
    hasCurator() {
      return this.curator.name || this.loading;
    },
    defaultCurator() {
      return defaultCuratorPhones[this.animal.type] || defaultCuratorPhones.dog;
    },
    curatorPhone() {
      return this.curator.phone ? prettifyPhone(this.curator.phone) : this.defaultCurator.phones[0];
    }
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
$grey1: #8a92a6;
$darkBlue: #2f3e4e;

.curator-contact {
  display: flex;
  align-items: center;
  gap: 64px;
  background: white;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 100%;
  margin-top: 32px;
  padding: 16px 32px;
  height: 120px;

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
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    color: $grey1;
    margin-bottom: 4px;
  }

  &__value {
    font-size: 19px;
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

  &__h1 {
    display: none;
    font-weight: 500;
    font-size: 28px;
    line-height: 100%;
    padding-top: 16px;
    margin-bottom: 4px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    height: fit-content;
    align-items: flex-start;
    gap: 16px;

    &__h1 {
      display: flex;
    }
  }

  @media (max-width: 479px) {
    box-shadow: none;
    margin: 32px 0;
  }
}
</style>
