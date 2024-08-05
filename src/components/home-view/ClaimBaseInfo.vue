<template>
  <b v-if="!isUpdateMode && isGuest" class="claim-base-info__submit-another-person__title">
    Запись другого человека <a @click="$emit('update:isGuest', false)">(записать себя)</a>
  </b>
  <GuestForm
    v-if="!isUpdateMode && isGuest"
    v-model:name="claimModel.guest.name"
    v-model:surname="claimModel.guest.surname"
    v-model:phone="claimModel.guest.phone"
  />
  <span v-if="!isGuest" class="claim-base-info__text"> <b>Имя</b>{{ user.name }} {{ user.surname }}</span>
  <span v-if="!isGuest" class="claim-base-info__text"> <b>Телефон</b> +{{ user.phone }} </span>
  <span class="claim-base-info__text"> <b>Дата</b> {{ date }} </span>
  <span class="claim-base-info__text"> <b>Время</b> {{ typeOfTime }} </span>
  <CommonButton
    v-if="!isUpdateMode && !isGuest && havePermissions('CREATE_CLAIM_FOR_UNREGISTERED_USERS')"
    class="claim-base-info__submit-another-person__btn"
    title="Записать другого человека"
    @click="$emit('update:isGuest', true)"
  />
</template>

<script>
import { mapState } from 'vuex';

import { daysOfWeek, parseDate, typeOfTime } from '@/utils/date';
import CommonButton from '@/components/common/CommonButton.vue';
import GuestForm from './GuestForm.vue';

export default {
  components: { GuestForm, CommonButton },
  props: {
    isUpdateMode: Boolean,
    claim: Object,
    isGuest: Boolean,
  },
  emits: ['update:isGuest'],
  data() {
    return {
      claimModel: this.claim,
    };
  },
  computed: mapState({
    permissions: (state) => state.permissions.my,
    user(state) {
      const { user } = state.auth;
      if (this.claim.guest_id) {
        const { name, surname, phone } = this.claim.guest;
        return { name, surname, phone };
      }
      const { name, surname, phone } = user;
      return { name, surname, phone };
    },
    date() {
      const parsedDate = parseDate(this.claimModel.date);
      const dayOfWeek = daysOfWeek[new Date(this.claimModel.date).getDay()];
      return `${parsedDate} (${dayOfWeek})`;
    },
    typeOfTime() {
      return typeOfTime[this.claim.type];
    },
  }),
  methods: {
    havePermissions(permission) {
      return this.permissions.includes(permission);
    },
  },
};
</script>

<style scoped lang="scss">
.claim-base-info {
  &__submit-another-person {
    &__title {
      margin-bottom: 8px;
    }
    &__btn {
      color: grey;
      border-color: grey;
      margin-top: 8px;
      &:hover {
        background-color: grey;
        color: white;
      }
    }
  }
  &__text {
    margin: 4px 0;
    display: flex;

    b {
      width: 80px;
    }
  }
}
</style>
