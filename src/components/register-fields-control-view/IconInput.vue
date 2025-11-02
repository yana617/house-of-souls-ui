<template>
  <div class="icon-input__container">
    <div class="icon-input__sub-container" :class="{ 'icon-input__no-icon': !icon }">
      <img class="icon-input__image" alt="icon" :src="icon">
    </div>
    <CommonButton
      v-if="edit"
      class="icon-input__upload-btn"
      title="обновить иконку"
      @click="uploadIcon()"
    />
    <input
      id="icon-input-id"
      type="file"
      accept="image/*"
      class="icon-input__unvisible-input"
      @change="onIconChange"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    modelValue: String,
  },
  computed: mapState({
    uploadedIcon: (state) => state.additionalFields.new.icon,
  }),
  methods: {
    uploadIcon() {
      document.getElementById('additional-field-icon-input').click();
    },
    onIconChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const [icon] = files;
      const formData = new FormData();
      formData.append('icon', icon);
      this.$store.dispatch('additionalFields/uploadIcon', formData);
    },
  },
};
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;
$green: #42b983;

.icon-input {
  &__container {
    display: flex;
  }

  &__sub-container {
    display: flex;
    margin-right: 16px;
    max-width: 40px;
    max-height: 40px;
    min-height: 40px;
    min-width: 40px;
  }

  &__image {
    display: flex;
    width: 24px;
    height: 24px;
  }

  &__no-icon {
    background-color: $lightGrey;
  }

  &__upload-btn {
    display: flex;
    margin-left: 16px;
    padding: 0px 8px !important;
    color: $green;
    border-color: transparent;
    &:hover {
      color: blue;
    }
  }

  &__unvisible-input {
    display: none;
  }
}
</style>
