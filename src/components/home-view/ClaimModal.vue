<template>
  <div @click="$emit('onclose')" class="modal__wrapper">
    <ClaimForm
      :claim="claim"
      :submitButton="submitButton"
      :title="title"
      :errors="isUpdateMode ? updateErrors : createErrors"
      :isUpdateMode="isUpdateMode"
      :loading="loading"
      @on-submit="submit"
      @onclose="this.$emit('onclose')"
    />
  </div>
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
  data() {
    return {
      loading: false,
    };
  },
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
