<template>
  <div class="animal-image-name-container">
    <div v-if="noNotices" class="animal-image-name-container__indent" />
    <StatusHashtag :status="animal.status" />
    <img
      v-if="animal.photos?.[0]?.url"
      class="animal-image-name-container__image"
      alt="avatar"
      :src="animal.photos?.[0]?.url"
    >
    <div v-else class="animal-image-name-container__no-image">
      <span>Нет фото</span>
    </div>
    <h4 class="animal-image-name-container__name">
      {{ animal.name }}
    </h4>
    <CommonButton
      v-if="!noNotices"
      class="animal-image-name-container__notices-btn"
      title="Лечение"
      @click="openModal()"
    />
    <div v-if="animal.taken_home_date" class="animal-image-name-container__taken-home-date">
      Забрали {{ parseDateWithNumbers(animal.taken_home_date) }}
    </div>
    <div v-if="noNotices" class="animal-image-name-container__indent" />

    <NoticesModal
      :visible="isNoticesModalOpened"
      @onclose="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import CommonButton from '@/components/common/CommonButton.vue';
import StatusHashtag from './StatusHashtag.vue';
import { parseDateWithNumbers } from '@/utils/date';

const store = useStore();
const route = useRoute();

const animalId = computed(() => route.params.id);
const notices = computed(() => store.state.notices.list);
const animal = computed(() => store.state.animals.current);
const noNotices = computed(() => notices.value.length === 0);

const isNoticesModalOpened = ref(false);

onMounted(() => {
  store.dispatch('app/setLoading', true);
  store.dispatch('notices/getNotices', { animal_id: animalId.value })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
});

const openModal = () => {
  isNoticesModalOpened.value = true;
};
const closeModal = () => {
  isNoticesModalOpened.value = false;
};
</script>

<style scoped lang="scss">
$darkBlue: #2f3e4e;
$lightGrey: #ccc;
$green: #42b983;

.animal-image-name-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 100%;
  padding: 32px 24px;
  height: 540px;

  &__image, &__no-image {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    object-fit: cover;
    margin: 24px 0;
    background-color: $lightGrey;
  }

  &__no-image {
    display: flex;
    align-items: center;
    justify-content: center;
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

  &__taken-home-date {
    width: 180px;
    padding: 8px 16px;
    border-radius: 24px;
    border: 1px solid $green;
    color: $green;
  }

  &__indent {
    height: 32px;
  }

  @media (max-width: 767px) {
    height: unset;
  }

  @media (max-width: 479px) {
    box-shadow: none;
    padding: 0;
  }
}
</style>
