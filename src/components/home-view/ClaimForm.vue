<template>
  <div class="claim-form" @click.stop>
    <span class="claim-form__header">{{ title }}</span>
    <span class="claim-form__error">{{ getError('guest.name') }}</span>
    <span class="claim-form__error">{{ getError('guest.surname') }}</span>
    <span class="claim-form__error">{{ getError('guest.phone') }}</span>
    <ClaimBaseInfo v-model:is-guest="isGuest" :claim="claimModel" :is-update-mode="isUpdateMode" />
    <label for="time-select" class="claim-form__title">{{ labels.arrivalTime }}</label>
    <a-time-picker
      id="time-select"
      v-model:value="claimModel.arrival_time"
      style="width: 100%"
      placeholder="Выбрать время"
      format="HH:mm"
      :minute-step="15"
    />
    <span class="claim-form__error">{{ getError('arrival_time') }}</span>
    <BaseInput v-model="claimModel.additional_people" :label="labels.additionalPeople" />
    <span class="claim-form__error">{{ getError('additional_people') }}</span>
    <BaseInput
      v-model="claimModel.comment"
      is-textarea
      :label="labels.comment"
      :description="commentDescription"
    />
    <span class="claim-form__error">{{ getError('comment') }}</span>
    <a-checkbox v-model:checked="claimModel.questionable" class="claim-form__checkbox">
      {{ labels.questionable }}
    </a-checkbox>
    <span>{{ descriptions.questionable }} </span>
    <CommonButton
      :loading="loading"
      class="claim-form__submit-btn"
      :title="submitButton"
      @click="submit()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dayjs from 'dayjs';

import CommonButton from '@/components/common/CommonButton.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import { claimTimeDescription, claimFormLabels, claimFormDescriptions } from '@/utils/constants';
import { findError } from '@/utils/validation';
import ClaimBaseInfo from './ClaimBaseInfo.vue';

export default {
  name: 'ClaimForm',
  components: {
    CommonButton,
    BaseInput,
    ClaimBaseInfo,
  },
  props: {
    title: String,
    claim: Object,
    submitButton: String,
    isUpdateMode: Boolean,
    loading: Boolean,
    errors: Array,
  },
  emits: ['on-submit'],
  data() {
    return {
      claimModel: {
        date: this.claim.date,
        type: this.claim.type,
        additional_people: this.claim.additional_people || 0,
        comment: this.claim.comment || '',
        questionable: this.claim.questionable || false,
        arrival_time: this.claim.arrival_time ? dayjs(this.claim.arrival_time, 'HH:mm') : null,
        guest_id: this.claim.guest_id,
        guest: {
          name: this.claim.guest?.name || '',
          surname: this.claim.guest?.surname || '',
          phone: this.claim.guest?.phone || '',
        },
      },
      isGuest: false,
      labels: claimFormLabels,
      descriptions: claimFormDescriptions,
      findError,
    };
  },
  computed: mapState({
    user: (state) => state.auth.user,
    commentDescription() {
      return `${claimTimeDescription[this.claim.type]} ${this.descriptions.comment}`;
    },
  }),
  unmounted() {
    this.$store.dispatch('claims/clearErrors');
  },
  methods: {
    submit() {
      const body = {
        _id: this.claim._id,
        ...this.claimModel,
        comment: this.claimModel.comment.length !== 0 ? this.claimModel.comment : null,
        arrival_time: this.claimModel.arrival_time
          ? this.claimModel.arrival_time.format('HH:mm')
          : null,
        additional_people: parseInt(this.claimModel.additional_people, 10) || null,
        user_id: this.user.id,
      };
      if (!this.isGuest) {
        delete body.guest;
      }
      this.$emit('on-submit', body);
    },
    getError(field) {
      return this.findError(this.errors, field);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$greyBlue: #2c3e50;

.claim-form {
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: left;

  &__header {
    font-size: 18px;
    margin: 8px 0 16px;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
    margin: 16px 0 8px;
  }

  &__checkbox {
    font-size: 14px;
    font-weight: bold;
    margin: 16px 0 4px;
    color: $greyBlue;
  }

  &__submit-btn {
    color: $green;
    border-color: $green;
    margin-top: 16px;
    &:hover {
      background-color: $green;
      color: white;
    }
  }
  &__error {
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
  }

  @media (max-width: 450px) {
    max-width: 100%;
    min-width: 100%;
    left: 0;
    border-radius: 0;
  }
}
</style>
