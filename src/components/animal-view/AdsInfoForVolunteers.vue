<template>
  <div class="ads-info-for-volunteers">
    <span class="ads-info-for-volunteers__title">Реклама</span>
    <div class="ads-info-for-volunteers__texts">
      <span class="ads-info-for-volunteers__texts__title">Текст</span>
      <router-link v-permission="'EDIT_ANIMAL'" :to="`/animals/${animal.id}/edit`">
        <div class="ads-info-for-volunteers__edit-button">
          Редактировать
        </div>
      </router-link>
      <div class="ads-info-for-volunteers__copy-button" @click="copyToClipboardAnimalText">
        Скопировать
      </div>
    </div>
    <div class="ads-info-for-volunteers__text">
      {{ animal.advertising_text }}
    </div>
    <div class="ads-info-for-volunteers__gallery">
      <div>
        <span class="ads-info-for-volunteers__gallery-title">Фотоальбом</span>
        <span v-if="$matchMedia.tablet" class="ads-info-for-volunteers__photos-count">
          {{ animal.photos.length }} фотографий
        </span>
      </div>


      <div class="ads-info-for-volunteers__gallery-info">
        <span v-if="!$matchMedia.tablet" class="ads-info-for-volunteers__photos-count">
          {{ animal.photos.length }} фотографий
        </span>
        <router-link v-permission="'EDIT_ANIMAL'" :to="`/animals/${animal.id}/photos`">
          <div class="ads-info-for-volunteers__edit-button">
            Редактировать
          </div>
        </router-link>
        <div v-if="animal.photos.length > 0" class="ads-info-for-volunteers__download-button">
          Скачать всё
        </div>
      </div>
    </div>
    <div class="ads-info-for-volunteers__gallery-container">
      <div v-for="image of animal.photos" :key="image.id" class="ads-info-for-volunteers__image-container">
        <img :src="image.url">
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import notifications from '@/utils/notifications';

const store = useStore();
const animal = computed(() => store.state.animals.current);

const copyToClipboardAnimalText = async () => {
  await navigator.clipboard.writeText(animal.value?.advertising_text);
  notifications.success('Успешно скопировано');
};
</script>

<style scoped lang="scss">
$black1: #232d42;
$blue: #3f91f7;
$green: #42b983;
$grey1: #8a92a6;

.ads-info-for-volunteers {
  display: flex;
  flex-direction: column;
  align-items: start;
  background: #ffffff;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 100%;
  color: $black1;
  box-sizing: border-box;
  margin-top: 32px;
  padding: 32px;
  gap: 32px;

  &__title {
    font-weight: 500;
    font-size: 32px;
    line-height: 100%;
  }

  &__texts {
    display: flex;
    align-items: end;
    gap: 16px;

    &__title {
      font-weight: 500;
      font-size: 19px;
      line-height: 175%;
    }
  }

  &__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 175%;
    text-align: left;
  }

  &__gallery {
    position: relative;
    width: 100%;
    display: flex;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__gallery-title {
    font-weight: 500;
    font-size: 19px;
    line-height: 175%;
  }

  &__gallery-info {
    position: absolute;
    display: flex;
    align-items: end;
    gap: 16px;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    text-wrap: nowrap;

    @media (max-width: 767px) {
      position: relative;
      transform: none;
      left: unset;
    }
  }

  &__edit-button,
  &__download-button,
  &__copy-button {
    font-weight: 400;
    font-size: 16px;
    line-height: 175%;
    color: $blue;
    cursor: pointer;
  }

  &__download-button,
  &__copy-button {
    color: $green;
  }

  &__photos-count {
    font-weight: 400;
    font-size: 16px;
    line-height: 175%;
    color: $grey1;

    @media (max-width: 767px) {
      margin-left: 16px;
    }
  }

  &__gallery-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;
    min-width: 100%;

    @media (max-width: 767px) {
      gap: 8px;
    }
  }

  &__image-container {
    flex: 0 0 calc(25% - 12px);

    img {
      display: block;
      width: 100%;
      height: 160px;
      border-radius: 8px;
      object-fit: cover;
      object-position: center;
    }

    @media (max-width: 767px) {
      flex: 0 0 calc(33.33% - 14px);
      min-height: 160px;
    }

    @media (max-width: 479px) {
      flex: 0 0 calc(50% - 8px);
      min-height: 160px;
    }
  }
}
</style>