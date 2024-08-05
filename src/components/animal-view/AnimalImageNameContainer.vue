<template>
  <div class="animal-image-name-container">
    <div v-if="noNotices" class="animal-image-name-container__indent" />
    <StatusHashtag :status="animal.status" />
    <img class="animal-image-name-container__image" alt="avatar" :src="animal.photos[0]" />
    <h4 class="animal-image-name-container__name">
      {{ animal.name }}
    </h4>
    <CommonButton
      v-if="!noNotices"
      class="animal-image-name-container__notices-btn"
      title="Лечение"
      @click="showNotices()"
    />
    <div v-if="noNotices" class="animal-image-name-container__indent" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CommonButton from '@/components/common/CommonButton.vue';
import StatusHashtag from './StatusHashtag.vue';

export default {
  name: 'AnimalImageNameContainer',
  components: { CommonButton, StatusHashtag },
  computed: mapState({
    notices: (state) => state.notices.list,
    animalId() {
      return this.$route.params.id;
    },
    animal: (state) => state.animals.current,
    noNotices() {
      return this.notices.length === 0;
    },
  }),
  created() {
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('notices/getNotices', { animal_id: this.animalId }).finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
  },
};
</script>

<style scoped lang="scss">
$darkBlue: #2f3e4e;

.animal-image-name-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 100%;
  padding: 32px 24px;

  &__image {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    object-fit: cover;
    margin: 24px 0;
  }

  &__name {
    color: $darkBlue;
    font-weight: 600;
    font-size: 26px;
    line-height: 29px;
  }

  &__notices-btn {
    background-color: $darkBlue;
    color: white;
    border-color: $darkBlue;
    width: 80%;
    margin: 8px 0 16px;
    border-radius: 24px;
    padding: 12px;
    &:hover {
      background-color: white;
      color: $darkBlue;
    }
  }

  &__indent {
    height: 32px;
  }

  @media (max-width: 425px) {
    box-shadow: none;
    padding: 0;
  }
}
</style>
