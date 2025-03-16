<template>
  <a-dropdown>
    <template #overlay>
      <a-menu>
        <router-link :to="`/animals/${id}/edit`">
          <a-menu-item key="1">
            Редактировать
          </a-menu-item>
        </router-link>
        <router-link :to="`/animals/${id}/photos`">
          <a-menu-item key="2">
            Обновить фото
          </a-menu-item>
        </router-link>
      </a-menu>
    </template>
    <a-button>
      Действия
      <DownOutlined />
    </a-button>
  </a-dropdown>
</template>

<script setup>
import { DownOutlined } from '@ant-design/icons-vue';

const { id } = defineProps({
  id: String,
})
</script>

<style scoped></style>
