<template>
  <div class="claim-form" @click.stop>
    <img @click="$emit('onclose')" class="claim-form__close-icon" src="@/assets/close.png" />
    <span class="claim-form__header">{{ title }}</span>
    <b v-if="!isUpdateMode && anotherPerson" class="claim-form__another-person-assign-title">
      Запись другого человека <a @click="anotherPerson = false">(записать себя)</a>
    </b>
    <div v-if="!isUpdateMode && anotherPerson">
      <input class="claim-form__another-prs-input" v-model="name" type="text" placeholder="Имя" />
      <input class="claim-form__another-prs-input" v-model="surname" type="text" placeholder="Фамилия" />
      <input class="claim-form__another-prs-input" v-model="phone" type="text" placeholder="Телефон" />
    </div>
    <span v-if="!anotherPerson" class="claim-form__claim-base-info"> <b>Имя</b> {{ username }} </span>
    <span v-if="!anotherPerson" class="claim-form__claim-base-info"> <b>Телефон</b> +{{ userPhone }} </span>
    <span class="claim-form__claim-base-info"> <b>Дата</b> {{ parsedDate }} ({{ dayOfWeek }}) </span>
    <span class="claim-form__claim-base-info"> <b>Время</b> {{ typeOfTime }} </span>
    <Button
      v-if="!isUpdateMode && !anotherPerson && havePermissions('CREATE_CLAIM_FOR_UNREGISTERED_USERS')"
      class="claim-form__another-person-btn"
      title="Записать другого человека"
      @click="anotherPerson = true"
    />
    <span class="claim-form__info-title"><b>Примерное прибытие на смену (если известно)</b></span>
    <a-time-picker
      style="width: 100%"
      placeholder="Выбрать время"
      format="HH:mm"
      v-model:value="arrival_time"
      :minute-step="15"
    ></a-time-picker>
    <span class="claim-form__info-title"><b>С вами будут еще люди? Укажите, пожалуйста, сколько.</b></span>
    <input class="claim-form__addition-people" v-model="additional_people" type="number" />
    <span class="claim-form__info-title"><b>Комментарий</b></span>
    <span class="claim-form__description">{{ description }}</span>
    <textarea class="claim-form__comment" v-model="comment" />
    <a-checkbox class="claim-form__checkbox" v-model:checked="questionable">Под вопросом</a-checkbox>
    <span class="claim-form__questionable-description">
      Если вы не уверены что у вас получится приехать, отметьте пожалуйста
    </span>
    <Button class="claim-form__submit-btn" :title="submitButton" @click="submit()" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import moment from 'moment';

import { daysOfWeek, parseDate, typeOfTime } from '@/utils/date';
import Button from '@/components/common/Button.vue';

const typeDescription = {
  morning: 'Смена обычно проходит с 09.00 до 13.00.',
  evening: 'Смена обычно проходит с 17.00 до 21-22.00.',
};

const subDescription = 'Если вы отклоняетесь от этого времени - предупредите в комментарии пожалуйста!';

export default defineComponent({
  name: 'ScheduleAssignModal',
  components: { Button },
  props: {
    title: String,
    claim: Object,
    submitButton: String,
    isUpdateMode: Boolean,
  },
  data() {
    return {
      anotherPerson: !!this.claim.guest_id,
      name: this.claim.guest?.name || '',
      surname: this.claim.guest?.surname || '',
      phone: this.claim.guest?.phone || '',
      additional_people: this.claim.additional_people || 0,
      comment: this.claim.comment || '',
      questionable: this.claim.questionable || false,
      arrival_time: this.claim.arrival_time ? moment(this.claim.arrival_time, 'HH:mm') : null,
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
    permissions: (state) => state.permissions.my,
    username() {
      if (this.claim.guest_id) {
        const { name, surname } = this.claim.guest;
        return `${name} ${surname}`;
      }
      return `${this.user.name} ${this.user.surname}`;
    },
    userPhone() {
      if (this.claim.guest_id) {
        return this.claim.guest?.phone;
      }
      return this.user.phone;
    },
    parsedDate() {
      return parseDate(this.claim.date);
    },
    dayOfWeek() {
      return daysOfWeek[new Date(this.claim.date).getDay()];
    },
    typeOfTime() {
      return typeOfTime[this.claim.type];
    },
    description() {
      return `${typeDescription[this.claim.type]} ${subDescription}`;
    },
  }),
  methods: {
    havePermissions(permission) {
      return this.permissions.includes(permission);
    },
    submit() {
      const body = {
        arrival_time: this.arrival_time ? this.arrival_time.format('HH:mm') : null,
        additional_people: parseInt(this.additional_people, 10) || null,
        comment: this.comment,
        questionable: this.questionable,
        date: this.claim.date,
        type: this.claim.type,
      };
      if (this.anotherPerson) {
        body.guest = {
          name: this.name,
          surname: this.surname,
          phone: this.phone,
        };
      } else {
        body.user_id = this.user.id;
      }
      this.$emit('on-submit', body);
    },
  },
});
</script>

<style scoped lang="scss">
$lightGrey: #ccc;
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
    font-weight: normal;
    margin: 8px 0 16px;
  }

  &__info-title {
    font-size: 14px;
    margin: 16px 0 8px;
  }

  &__description {
    margin-bottom: 8px;
    font-size: 14px;
  }

  &__addition-people,
  &__comment,
  &__another-prs-input {
    outline: none;
    border: 1px solid $lightGrey;
    padding: 4px 8px;
    border-radius: 4px;
  }

  &__comment {
    resize: none;
  }

  &__checkbox {
    font-size: 14px;
    font-weight: bold;
    margin-top: 16px;
    color: $greyBlue;
  }

  &__submit-btn {
    color: $green;
    border-color: $green;
    margin-top: 4px;
    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__another-person-btn {
    color: grey;
    border-color: grey;
    margin-top: 8px;
    &:hover {
      background-color: grey;
      color: white;
    }
  }

  &__another-prs-input {
    width: 100%;
    margin-bottom: 4px;
  }

  &__questionable-description {
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 12px;
  }

  &__claim-base-info {
    margin: 4px 0;
    display: flex;

    b {
      width: 80px;
    }
  }

  &__another-person-assign-title {
    margin-bottom: 8px;
  }

  @media (max-width: 450px) {
    max-width: 100%;
    min-width: 100%;
    left: 0;
    border-radius: 0;
  }
}
</style>
