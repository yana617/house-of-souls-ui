<template>
  <AnimalTypeList
    :animal-type="AnimalType.DOG"
    title="Собаки из приюта в Минске, которые ищут новый дом"
    :description="SHORT_DESCRIPTION"
  />
</template>

<script setup>
import AnimalTypeList from '@/components/animal-list-view/AnimalTypeList.vue';
import AnimalType from '@/utils/enums/AnimalType';
import { useSeo, SHELTER_JSON_LD, SITE_URL } from '@/composables/use-seo';

const SHORT_DESCRIPTION =
  'Собаки из мини-приюта Домик Спасённых Душ';
const DESCRIPTION =
  'Собаки из мини-приюта Домик Спасённых Душ ищут новый дом.' +
  ' Посмотрите всех собак и помогите им обрести семью.';

useSeo({
  title: 'Собаки из приюта в Минске',
  description: DESCRIPTION,
  url: `${SITE_URL}/sobaki`,
  jsonLd: SHELTER_JSON_LD,
});
</script>
