<template>
  <div class="modal__wrapper" @click="closeModal()">
    <div class="new-notice-modal" @click.stop>
      <img class="new-notice-modal__close-icon" alt="close" src="@/assets/close.png" @click="closeModal()" />
      <h2>Добавление новости</h2>
      <input v-model="title" class="new-notice-modal__title" placeholder="Заголовок" />
      <span class="new-notice-modal__error">{{ getError('title') }}</span>
      <textarea v-model="description" class="new-notice-modal__description" placeholder="Подробности" />
      <span class="new-notice-modal__error">{{ getError('description') }}</span>
      <label class="new-notice-modal__authorized">
        Только для волонторов
        <a-switch v-model:checked="internalOnly" />
      </label>
      <CommonButton :loading="loading" class="new-notice-modal__create-btn" title="Добавить" @click="create()" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';

import { findError } from '@/utils/validation';
import CommonButton from '../common/CommonButton.vue';

export default {
  name: 'NewNoticeModal',
  components: { CommonButton },
  data() {
    return {
      title: null,
      description: null,
      internalOnly: ref(false),
      findError,
      loading: false,
    };
  },
  computed: mapState({
    errors: (state) => state.notices.createErrors,
  }),
  unmounted() {
    this.$store.dispatch('notices/clearCreateErrors');
  },
  methods: {
    closeModal() {
      this.$store.dispatch('app/setModal', null);
    },
    create() {
      const body = {
        title: this.title,
        description: this.description,
        internalOnly: this.internalOnly,
      };
      this.loading = true;
      this.$store
        .dispatch('notices/createNotice', body)
        .then(() => {
          if (this.errors.length === 0) {
            this.$store.dispatch('notices/getNotices');
            this.$store.dispatch('app/setModal', null);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getError(field) {
      return this.findError(this.errors, field);
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightGrey: #ccc;

.new-notice-modal {
  width: 600px;
  padding: 16px 0 8px 0;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;

  &__close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 12px;
    cursor: pointer;
  }

  &__title,
  &__description {
    display: flex;
    width: 80%;
    border: 1px solid $lightGrey;
    outline: none;
    padding: 8px 16px;
    margin: 8px;
  }

  &__authorized {
    width: 80%;
    text-align: left;
  }

  &__description {
    resize: none;
    height: 160px;
  }

  &__create-btn {
    color: $green;
    border-color: $green;
    margin-top: 16px;
    margin-bottom: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__error {
    width: 80%;
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    margin-top: -6px;
    margin-bottom: 4px;
  }
}
</style>
