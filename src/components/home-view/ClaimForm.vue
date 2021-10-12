<template>
  <div class="claim-form" @click.stop>
    <img @click="$emit('onclose')" class="claim-form__close-icon" src="@/assets/close.png" />
    <span class="claim-form__header">{{ title }}</span>
    <ClaimBaseInfo :claim="claimModel" :isUpdateMode="isUpdateMode" v-model:isGuest="isGuest" />
    <label class="claim-form__title">{{ labels.arrivalTime }}</label>
    <a-time-picker
      style="width: 100%"
      placeholder="Выбрать время"
      format="HH:mm"
      v-model:value="claimModel.arrival_time"
      :minute-step="15"
    ></a-time-picker>
    <BaseInput :label="labels.additionalPeople" v-model="claimModel.additional_people" />
    <BaseInput is-textarea :label="labels.comment" :description="description" v-model="claimModel.comment" />
    <a-checkbox class="claim-form__checkbox" v-model:checked="claimModel.questionable">
      {{ labels.questionable }}
    </a-checkbox>
    <span>{{ descriptions.questionable }} </span>
    <Button class="claim-form__submit-btn" :title="submitButton" @click="submit()" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

import Button from '@/components/common/Button.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import ClaimBaseInfo from './ClaimBaseInfo.vue';

const typeDescription = {
  morning: 'Смена обычно проходит с 09.00 до 13.00.',
  evening: 'Смена обычно проходит с 17.00 до 21-22.00.',
};
const subDescription = 'Если вы отклоняетесь от этого времени - предупредите в комментарии пожалуйста!';

const labels = {
  arrivalTime: 'Примерное прибытие на смену (если известно)',
  additionalPeople: 'С вами будут еще люди? Укажите, пожалуйста, сколько.',
  comment: 'Комментарий',
  questionable: 'Под вопросом',
};
const descriptions = {
  questionable: 'Если вы не уверены что у вас получится приехать, отметьте пожалуйста',
};

export default {
  name: 'ClaimForm',
  components: {
    Button,
    BaseInput,
    ClaimBaseInfo,
  },
  props: {
    title: String,
    claim: Object,
    submitButton: String,
    isUpdateMode: Boolean,
  },
  data() {
    return {
      claimModel: {
        date: this.claim.date,
        type: this.claim.type,
        additional_people: this.claim.additional_people || 0,
        comment: this.claim.comment || '',
        questionable: this.claim.questionable || false,
        arrival_time: this.claim.arrival_time ? moment(this.claim.arrival_time, 'HH:mm') : null,
        guest: {
          name: this.claim.guest?.name || '',
          surname: this.claim.guest?.surname || '',
          phone: this.claim.guest?.phone || '',
        },
      },
      isGuest: false,
      labels,
      descriptions,
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
    description() {
      return `${typeDescription[this.claim.type]} ${subDescription}`;
    },
  }),
  methods: {
    submit() {
      const body = {
        ...this.claimModel,
        arrival_time: this.claimModel.arrival_time ? this.arrival_time.format('HH:mm') : null,
        additional_people: parseInt(this.claimModel.additional_people, 10) || null,
      };
      if (!this.isGuest) {
        delete body.guest;
        body.user_id = this.user.id;
      }
      this.$emit('on-submit', body);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$greyBlue: #2c3e50;

.claim-form {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  top: 50%;
  transform: translateY(-50%);
  left: calc(50% - 200px);
  padding: 8px 16px 16px 16px;
  text-align: left;
  max-width: 400px;
  min-width: 400px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

  &__close-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 12px;
    top: 12px;
    cursor: pointer;
  }

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

  @media (max-width: 450px) {
    max-width: 100%;
    min-width: 100%;
    left: 0;
    border-radius: 0;
  }
}
</style>
