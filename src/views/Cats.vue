<template>
  <AnimalTypeList
    :animal-type="AnimalType.CAT"
    title="Коты из приюта в Минске, которые ищут новый дом"
    :description="SHORT_DESCRIPTION"
  />
</template>

<script setup>
import AnimalTypeList from '@/components/animal-list-view/AnimalTypeList.vue';
import AnimalType from '@/utils/enums/AnimalType';
import { useSeo, SHELTER_JSON_LD, SITE_URL } from '@/composables/use-seo';

const SHORT_DESCRIPTION =
  'Коты из мини-приюта Домик Спасённых Душ';
const DESCRIPTION =
  'Коты из мини-приюта Домик Спасённых Душ ищут новый дом.' +
  ' Посмотрите всех котов и помогите им обрести семью.';

useSeo({
  title: 'Коты из приюта в Минске',
  description: DESCRIPTION,
  url: `${SITE_URL}/koty`,
  jsonLd: SHELTER_JSON_LD,
});
</script>
