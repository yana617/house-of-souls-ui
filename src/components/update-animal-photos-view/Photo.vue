<template>
  <div class="photo">
    <img :src="url">
    <div class="photo__delete-icon" @click="onDeleteImage">
      <CloseOutlined />
    </div>
  </div>
</template>

<script setup>
import { CloseOutlined } from "@ant-design/icons-vue";

const { id } = defineProps({
  url: String,
  id: String,
});

const emit = defineEmits(['onDelete']);

const onDeleteImage = () => {
  emit("onDelete", id)
}

</script>

<style scoped lang="scss">
$grey1: #8a92a6;

.photo {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &__delete-icon {
    background-color: white;
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}
</style>