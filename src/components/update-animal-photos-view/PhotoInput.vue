<template>
  <div class="photo-input">
    <label for="upload" class="photo-input__label">
      Выбрать фото
    </label>
    <input
      id="upload"
      ref="filesInput"
      type="file"
      accept="image/*"
      multiple
      @change="onFilesChange"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onPhotosSelected']);

const filesInput = ref();

const onFilesChange = () => {
  const files = filesInput?.value?.files;
  if (!files.length) return;

  emit("onPhotosSelected", files);
}

</script>

<style scoped lang="scss">
$grey1: #8a92a6;

.photo-input {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  input {
    display: none;
  }

  &__label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>