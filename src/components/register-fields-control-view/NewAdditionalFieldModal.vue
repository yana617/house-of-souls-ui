<template>
  <div @click="closeModal()" class="modal__wrapper">
    <div class="new-additional-field-modal" @click.stop>
      <img @click="closeModal()" class="new-additional-field-modal__close-icon" src="@/assets/close.png" />
      <h2>Новое дополнительное поле</h2>
      <div class="new-additional-field-modal__icon-container">
        <input
          id="new-additional-field-icon-input"
          type="file"
          accept="image/*"
          class="new-additional-field-modal__unvisible-input"
          @change="onIconChange"
        />
        <div
          class="new-additional-field-modal__icon-sub-container"
          :class="{ 'new-additional-field-modal__no-icon': !icon }"
        >
          <img class="new-additional-field-modal__icon" :src="icon" />
        </div>
        <Button class="new-additional-field-modal__btn__upload-icon" @click="uploadIcon()" title="Загрузить иконку" />
      </div>
      <input
        class="new-additional-field-modal__name"
        placeholder="Короткое название (желательно одно слово)"
        v-model="name"
      />
      <textarea class="new-additional-field-modal__description" v-model="description" placeholder="Описание" />
      <Button class="new-additional-field-modal__btn__save" @click="save()" title="Добавить" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';

export default {
  name: 'NewAdditionalFieldModal',
  components: { Button },
  computed: mapState({
    icon: (state) => state.additionalFields.new.icon,
  }),
  data() {
    return {
      name: null,
      description: null,
    };
  },
  methods: {
    closeModal() {
      this.$store.dispatch('app/setModal', null);
    },
    uploadIcon() {
      document.getElementById('new-additional-field-icon-input').click();
    },
    onIconChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const [icon] = files;
      const formData = new FormData();
      formData.append('icon', icon);
      this.$store.dispatch('additionalFields/uploadIcon', formData);
    },
    save() {
      const body = {
        icon: this.icon,
        name: this.name,
        description: this.description,
      };
      this.$store.dispatch('additionalFields/saveAdditionalField', body).then(() => {
        this.$store.dispatch('additionalFields/getAdditionalFields');
        this.$store.dispatch('app/setModal', null);
      });
    },
  },
};
</script>

<style lang="scss">
$green: #42b983;
$lightGrey: #ccc;

.new-additional-field-modal {
  width: 700px;
  height: 300px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 16px;

  &__close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 12px;
    cursor: pointer;
  }

  &__name,
  &__description {
    display: flex;
    width: 80%;
    border: 1px solid $lightGrey;
    outline: none;
    padding: 8px 16px;
    margin: 8px;
  }

  &__description {
    resize: none;
  }

  &__btn {
    &__upload-icon {
      color: black !important;
      border-color: black !important;
    }
    &__save {
      color: $green !important;
      border-color: $green !important;
    }
  }

  &__icon-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__icon-sub-container {
    display: flex;
    margin-right: 16px;
    max-width: 40px;
    max-height: 40px;
    min-height: 40px;
    min-width: 40px;
  }

  &__icon {
    max-width: 40px;
    max-height: 40px;
  }

  &__no-icon {
    background-color: $lightGrey;
    border-radius: 4px;
  }

  &__unvisible-input {
    display: none;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
}
</style>
