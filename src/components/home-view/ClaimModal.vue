<template>
  <ClaimForm
    :claim="claim"
    :submit-button="submitButton"
    :title="title"
    :errors="isUpdateMode ? updateErrors : createErrors"
    :is-update-mode="isUpdateMode"
    :loading="loading"
    @on-submit="submit"
    @onclose="$emit('onclose')"
  />
</template>

<script>
import { mapState } from 'vuex';

import notifications from '@/utils/notifications';
import ClaimForm from './ClaimForm.vue';

const submitButton = {
  update: 'Сохранить',
  create: 'Записаться',
};

const title = {
  update: 'Редактирование записи',
  create: 'Запись в график',
};

const action = {
  update: 'updateClaim',
  create: 'createClaim',
};

export default {
  name: 'ClaimModal',
  components: { ClaimForm },
  props: {
    claim: Object,
    mode: String,
    canSubscribeYourself: Boolean,
  },
  emits: ['onclose'],
  data() {
    return {
      loading: false,
    };
  },
  computed: mapState({
    createErrors: (state) => state.claims.createErrors,
    updateErrors: (state) => state.claims.updateErrors,
    submitButton() {
      return submitButton[this.mode];
    },
    title() {
      return title[this.mode];
    },
    isUpdateMode() {
      return this.mode === 'update';
    },
  }),
  methods: {
    submit(body) {
      if (this.mode === 'create' && !this.canSubscribeYourself && !body.guest) {
        notifications.error('Вы уже записаны в график. Вы можете записать только незарегистрированных пользователей!');
        return;
      }
      this.loading = true;
      this.$store
        .dispatch(`claims/${action[this.mode]}`, body)
        .then(() => {
          if ((this.isUpdateMode && this.updateErrors.length === 0)
              || (!this.isUpdateMode && this.createErrors.length === 0)) {
            this.$emit('onclose');
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
