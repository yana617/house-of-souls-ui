<template>
  <div class="materials">
    <div class="materials__header">
      <h1 class="materials__title">
        Материалы
      </h1>

      <div v-if="canEdit" class="materials__actions">
        <a-button
          v-if="!isEditMode"
          type="primary"
          shape="round"
          @click="enterEditMode"
        >
          Редактировать
        </a-button>

        <template v-else>
          <a-button shape="round" @click="cancelEdit">
            Отмена
          </a-button>
          <a-button
            type="primary"
            shape="round"
            :loading="isSaving"
            @click="save"
          >
            Сохранить
          </a-button>
        </template>
      </div>
    </div>

    <MaterialsView
      v-if="!isEditMode"
      :materials="materials"
    />

    <MaterialsEdit
      v-else
      v-model="editableMaterials"
    />
  </div>
</template>

<script setup>
import MaterialsEdit from '@/components/materials-view/MaterialsEdit.vue';
import MaterialsView from '@/components/materials-view/MaterialsView.vue';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isEditMode = ref(false);
const isSaving = ref(false);
const editableMaterials = ref([]);

const materials = computed(() => store.state.materials.list || []);

const canEdit = computed(() => {
  const permissions = store.state.permissions.my;
  return permissions && permissions.includes('EDIT_ANIMAL');
});

onMounted(() => {
  store.dispatch('materials/getMaterials');
});

const enterEditMode = () => {
  editableMaterials.value = JSON.parse(JSON.stringify(materials.value));
  isEditMode.value = true;
};

const cancelEdit = () => {
  editableMaterials.value = JSON.parse(JSON.stringify(materials.value));
  isEditMode.value = false;
};

const save = () => {
  isSaving.value = true;

  store
    .dispatch('materials/updateMaterials', editableMaterials.value)
    .then(() => store.dispatch('materials/getMaterials'))
    .finally(() => {
      isSaving.value = false;
      isEditMode.value = false;
    });
};
</script>

<style scoped lang="scss">
.materials {
  padding: 32px;
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__title {
    margin: 0;
  }

  &__actions button {
    margin-left: 8px;
  }

  @media (max-width: 1023px) {
    max-width: 100%;
  }
}
</style>
