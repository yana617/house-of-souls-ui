<template>
  <div class="platforms">
    <h1 class="platforms__title">
      Платформы для рекламы
    </h1>
    <a-button
      type="primary"
      shape="round"
      class="platforms__add-button"
      @click="openModal"
    >
      Добавить
    </a-button>
    <a-table
      :columns="columns"
      :data-source="platforms"
      :row-key="(record) => record.id"
      :pagination="{
        defaultPageSize: 10,
        'onUpdate:current': (page) => (currentPage = page),
      }"
      size="small"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          {{ index + 1 }}
        </template>
        <template v-if="column.key === 'actions'">
          <a-popconfirm title="Удалить безвозвратно (и все данные об обьявлениях)?" @confirm="onDelete(record.id)">
            <a>Удалить</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>

    <AddPlatformModal v-if="isModalOpened" />
  </div>
</template>

<script setup>
import AddPlatformModal from '@/components/platforms-view/AddPlatformModal.vue';
import { MODAL } from '@/utils/constants';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const columns = [{
  title: '#',
  key: 'index',
  width: '50px',
}, {
  title: 'Имя',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Действия',
  dataIndex: 'actions',
  key: 'actions',
  width: '120px',
}];

const store = useStore();
const platforms = computed(() => store.state.platforms.list);
const modal = computed(() => store.state.app.modal);

const isModalOpened = computed(() => modal.value === MODAL.PLATFORM);

const openModal = () => {
  store.dispatch('app/setModal', MODAL.PLATFORM);
};

const onDelete = (id) => {
  store.dispatch('platforms/deletePlatform', id)
    .then(() => {
      store.dispatch('platforms/getPlatforms');
    });
}

onMounted(() => {
  store.dispatch('platforms/getPlatforms');
});

</script>

<style lang="scss" scoped>
$green: #42b983;

.platforms {
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;

  &__add-button {
    margin-bottom: 24px;
    width: fit-content;
    background-color: $green;
    border-color: $green;
  }

  &__title {
    text-align: left;
  }
}
</style>