<template>
  <div class="ads">
    <div class="ads__container">
      <div class="ads__title__container">
        <h1>Реклама</h1>
        <router-link class="animal-card" :to="`/ads/info`">
          <a-button type="primary" shape="round" class="ads__title__btn">
            Как это работает?
          </a-button>
        </router-link>
      </div>

      <a-table
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 900 }"
        :pagination="false"
        @change="handleTableChange"
      >
        <template #title>
          Дата последнего размещения / окончания проплаченных поднятий
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <router-link :to="`/animals/${record.key}`">
              {{ record[column.key] }}
            </router-link>
          </template>
          <template v-if="column.key !== 'name' && column.key !== 'index'">
            {{ record[column.key] ? parseDateWithNumbers(record[column.key]) : "" }}
            <a
              :style="record[column.key]
                ? { marginLeft: '8px', ...(isNew(record[column.key]) ? { color: 'green' } : {}) }
                : { color: 'red' }
              "
              @click="openModal(record.key, column.key)"
            >
              {{ record[column.key] ? 'обновить' : 'добавить' }}
            </a>
            <a-tag v-if="isUrgent(record[column.key])" class="ads__tag" color="red">
              горит
            </a-tag>
          </template>
        </template>
      </a-table>
    </div>

    <NewAdModal v-if="isModalOpen" :on-submit="onSubmit" :on-close="onModalClose" />
  </div>
</template>

<script setup>
import NewAdModal from '@/components/ads-view/NewAdModal.vue';
import { parseDateWithNumbers } from '@/utils/date';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isModalOpen = ref(false)
const modalAnimalId = ref(null)
const modalPlatformId = ref(null)

const platforms = computed(() => store.state.platforms.list);
const animalsWithAds = computed(() => store.state.ads.list);

const columns = computed(() => [
  { title: '#', width: 50, dataIndex: 'index', key: 'index', fixed: 'left' },
  { title: 'Имя', width: 130, dataIndex: 'name', key: 'name', fixed: 'left' },
  ...platforms.value.map((platform) => ({
    title: platform.name,
    dataIndex: platform.id,
    key: platform.id,
    sorter: true,
  })),
]);

const data = computed(() => (animalsWithAds.value || [])?.map((animal, index) => ({
  index: index + 1,
  key: animal.animal_id,
  name: animal.animal_name,
  ...animal.ads,
})));

const threeWeeksAgo = dayjs().subtract(3, 'week');
const isUrgent = (date) => {
  const dayJsDate = dayjs(date);

  if (date && dayJsDate.isBefore(threeWeeksAgo)) {
    return true;
  }
}

const oneWeekAgo = dayjs().subtract(1, 'week');
const isNew = (date) => {
  const dayJsDate = dayjs(date);

  if (date && dayJsDate.isAfter(oneWeekAgo)) {
    return true;
  }
}

const openModal = (animalId, platformId) => {
  isModalOpen.value = true;
  modalAnimalId.value = animalId;
  modalPlatformId.value = platformId;
};

const onModalClose = () => {
  store.dispatch('app/setModal', null);
  isModalOpen.value = false;
  modalAnimalId.value = null;
  modalPlatformId.value = null;
};

const onSubmit = (date) => {
  store.dispatch('app/setLoading', true);
  store.dispatch(
    'ads/createAd',
    { animal_id: modalAnimalId.value, platform_id: modalPlatformId.value, date },
  )
    .then(() => {
      loadAds();
      onModalClose();
    })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
};

const handleTableChange = (
  _,
  _2,
  sorter,
) => {
  loadAds(sorter.field, sorter.order);
};

const loadAds = (platformId, order) => {
  const sortByPlatform = platformId || store.state.platforms.list?.[0]?.id || null;
  const sortOrder = order === 'descend' ? 'DESC' : 'ASC';

  store.dispatch('ads/getAds', sortByPlatform ? { sortByPlatform, sortOrder } : {});
}

onMounted(async () => {
  await store.dispatch('platforms/getPlatforms');
  loadAds();
});
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightestGrey: #f0f0f0;
$lightGrey: #ccc;
$blue: #3f91f7;

.ads {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__container {
    display: flex;
    width: 70%;
    flex-direction: column;
    margin-bottom: 32px;
  }

  &__title {
    &__container {
      display: flex;
      gap: 24px;
      align-items: center;
    }

    &__btn {
      background-color: #e2e2e2;
      color: black;
      border: none;
    }
  }

  h1 {
    font-size: 36px;
    font-weight: 400;
    margin: 32px 0;
    padding: 0;
  }

  &__tag {
    margin-left: 8px;
  }

  @media (max-width: 1024px) {
    &__container {
      width: 90%;
    }
  }
}
</style>
