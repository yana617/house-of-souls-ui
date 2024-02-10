<template>
  <div @click="closeModal()" class="modal__wrapper">
    <div class="new-notice-modal" @click.stop>
      <img alt="close icon" @click="closeModal()" class="new-notice-modal__close-icon" src="@/assets/close.png" />
      <h2>Добавление новости</h2>
      <input class="new-notice-modal__title" placeholder="Заголовок" v-model="title" />
      <span class="new-notice-modal__error">{{ getError('title') }}</span>
      <textarea class="new-notice-modal__description" v-model="description" placeholder="Подробности" />
      <span class="new-notice-modal__error">{{ getError('description') }}</span>
      <label for="authorized-switch" class="new-notice-modal__authorized">
        Только для волонторов
        <a-switch id="authorized-switch" v-model:checked="internalOnly" />
      </label>
      <Button :loading="loading" class="new-notice-modal__create-btn" @click="create()" title="Добавить" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';

import { findError } from '@/utils/validation';
import Button from '../common/Button.vue';

export default {
  name: 'NewNoticeModal',
  components: { Button },
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
