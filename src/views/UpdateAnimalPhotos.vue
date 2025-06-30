<template>
  <div class="update-animal-photos">
    <div class="update-animal-photos__sub-container">
      <AnimalNavigation :type="animal.type" :animal-name="animal.name" />
      <div class="update-animal-photos__header">
        <div class="update-animal-photos__header__left">
          <h2>Фотографии - {{ animal.name }}</h2>
          <h4 style="text-align:left">
            Максимум - 15 фото, максимальный размер фотографии 10MB
          </h4>
        </div>

        <PhotoInput @on-photos-selected="onPhotosSelected" />
      </div>

      <div class="update-animal-photos__photos-container">
        <div ref="el" class="update-animal-photos__photos">
          <Photo
            v-for="image of images"
            :id="image.id"
            :key="image.url"
            :url="image.url"
            @on-delete="onDeleteImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useSortable } from '@vueuse/integrations/useSortable';

import PhotoInput from '@/components/update-animal-photos-view/PhotoInput.vue';
import Photo from '@/components/update-animal-photos-view/Photo.vue';
import notifications from '@/utils/notifications';

const el = ref(null);

const store = useStore();
const route = useRoute();

const animalId = route.params.id;
const animal = computed(() => store.state.animals.current);

const MAX_IMAGES = 15;
const images = ref([]); // { id?: string, url: string }[]

const loadImages = () => {
  store.dispatch('app/setLoading', true);
  store.dispatch('animals/getAnimalById', { id: animalId }).finally(() => {
    store.dispatch('app/setLoading', false);
    images.value = [...animal.value?.photos] || [];
  });
}
loadImages();

useSortable(el, images, {
  onUpdate: (e) => {
    const imageId = images.value[e.oldIndex].id;

    store.dispatch('app/setLoading', true);
    store.dispatch(
      'animals/updateImageOrder',
      { id: animalId, imageId, body: { display_order: e.newIndex + 1 } },
    )
      .then(() => {
        loadImages();
      });
  }
});

const onPhotosSelected = (files) => {
  if (files.length + images.value?.length > MAX_IMAGES) {
    notifications.error(`Максимум ${MAX_IMAGES} фото`);
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    formData.append(i, file);
  }

  store.dispatch('app/setLoading', true);
  store
    .dispatch(`animals/uploadImages`, { id: animalId, body: formData })
    .then(() => {
      loadImages();
    })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
}

const onDeleteImage = (imageId) => {
  store.dispatch('app/setLoading', true);
  store
    .dispatch(`animals/deleteImage`, { id: animalId, imageId })
    .then(() => {
      loadImages();
    })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
};

</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;
$green: #42b983;

.update-animal-photos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  &__sub-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;

    &__left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__save-btn {
    color: $green;
    background-color: white;
    border-color: $green;
    margin: 8px 4px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__photos-container {
    display: flex;
    margin-top: 24px;
    gap: 16px;
    flex-wrap: wrap;
    max-width: 1064px;
    min-width: 700px;

    @media (min-width: 1200px) {
      min-width: 1064px;
    }

    @media (max-width: 800px) {
      min-width: unset;
      max-width: 100%;
    }
  }

  &__photos {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
}
</style>