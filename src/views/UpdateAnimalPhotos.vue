<template>
  <div class="update-animal-photos">
    <div class="update-animal-photos__sub-container">
      <div class="update-animal-photos__header">
        <div class="update-animal-photos__header__left">
          <h2>Фотографии - {{ animal.name }}</h2>
          <h4>Максимум - 15 фото, максимальный размер фотографии 10MB</h4>
        </div>
        <CommonButton class="update-animal-photos__save-btn" title="Сохранить" @click="onSubmit" />
      </div>

      <div class="update-animal-photos__photos-container">
        <PhotoInput @on-photos-selected="onPhotosSelected" />

        <div ref="el" class="update-animal-photos__photos">
          <Photo
            v-for="(image, index) of images"
            :key="image.url"
            :url="image.url"
            :display-order="index"
            @on-delete="onDeleteImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRaw } from 'vue';
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
const images = ref([]); // { id?: string, url: string, file?: File }[]

useSortable(el, images);

store.dispatch('app/setLoading', true);
store.dispatch('animals/getAnimalById', { id: animalId }).finally(() => {
  store.dispatch('app/setLoading', false);
  images.value = animal.value?.photos || [];
});

const onPhotosSelected = (files) => {
  if (files.length + images.value?.length > MAX_IMAGES) {
    notifications.error(`Максимум ${MAX_IMAGES} фото`);
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = URL.createObjectURL(file);
    images.value.push({ url, file });
  }
}

const onDeleteImage = (index) => {
  mages.value.splice(index, 1);
};

function onSubmit() {
  const existedPhotos = animal.value?.photos || [];

  const photos = toRaw(images.value);
  const formData = new FormData();
  const filesOrder = [];

  const existedPhotosNewOrder = {};

  photos.forEach((img, index) => {
    if (!!img.file) {
      formData.append(index + 1, img.file);
      filesOrder.push(index + 1);
    } else {
      existedPhotosNewOrder[img.id] = index + 1;
    }
  });

  const existedPhotosWithUpdatedOrder = existedPhotos.reduce((acc, { id }, index) => {
    const previousOrder = index + 1;
    if (existedPhotosNewOrder[id] !== previousOrder) {
      acc.push({ id, display_order: existedPhotosNewOrder[id] })
    }
    return acc;
  }, []);


  formData.append("filesOrder", filesOrder.join(","))
  formData.append("existedPhotosWithUpdatedOrder", JSON.stringify(existedPhotosWithUpdatedOrder));

  store.dispatch('app/setLoading', true);
  store
    .dispatch(`animals/updateImages`, { id: animalId, body: formData })
    .then()
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
}

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
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

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
  }

  &__photos {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
}
</style>