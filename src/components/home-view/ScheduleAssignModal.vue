<template>
  <div @click="$emit('onclose')" class="modal__wrapper schedule-assign-modal__wrapper">
    <div class="schedule-assign-modal" @click.stop>
      <img @click="$emit('onclose')" class="schedule-assign-modal__close-icon" src="@/assets/close.png" />
      <span class="schedule-assign-modal__header">Запись в график</span>
      <span class="schedule-assign-modal__info-title">
        <b v-if="!anotherPerson">{{ userData }}</b>
        <b v-if="anotherPerson">
          Запись другого человека <a @click="anotherPerson = false">(записать себя)</a>
        </b>
      </span>
      <div v-if="anotherPerson">
        <input class="schedule-assign-modal__another-prs-input" v-model="name" type="text" placeholder="Имя" />
        <input class="schedule-assign-modal__another-prs-input" v-model="surname" type="text" placeholder="Фамилия" />
        <input class="schedule-assign-modal__another-prs-input" v-model="phone" type="text" placeholder="Телефон" />
      </div>
      <Button
        v-if="!anotherPerson"
        class="schedule-assign-modal__assign-btn"
        title="Записать другого человека"
        @click="anotherPerson = true"
      />
      <span class="schedule-assign-modal__info-title">
        Дата <b>{{ parsedDate }} ({{ dayOfWeek }})</b>
      </span>
      <span class="schedule-assign-modal__info-title">
        Время <b>{{ typeOfTime }}</b>
      </span>
      <span>{{ description }}</span>
      <span class="schedule-assign-modal__info-title"><b>Примерное прибытие на смену (если известно)</b></span>
      <a-time-picker
        class="schedule-assign-modal__time-picker"
        placeholder="Выбрать время"
        format="HH:mm"
        @change="onTimeChange"
        :minute-step="15"
      ></a-time-picker>
      <span class="schedule-assign-modal__info-title"><b>С вами будут еще люди? Укажите, пожалуйста, сколько.</b></span>
      <input class="schedule-assign-modal__addition-people" v-model="additional_people" type="number" />
      <span class="schedule-assign-modal__info-title"><b>Комментарий</b></span>
      <textarea class="schedule-assign-modal__comment" v-model="comment" />
      <a-checkbox class="schedule-assign-modal__checkbox" v-model:checked="questionable">Под вопросом</a-checkbox>
      <Button class="schedule-assign-modal__submit-btn" title="Записаться" @click="submit()" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { daysOfWeek, parseDate, typeOfTime } from '@/utils/date';
import Button from '@/components/common/Button.vue';

const typeDescription = {
  morning: 'Смена обычно проходит с 09.00 до 13.00.',
  evening: 'Смена обычно проходит с 17.00 до 21-22:00.',
};

const subDescription = 'Если вы отклоняетесь от этого времени - предупредите в комментарии пожалуйста!';

export default defineComponent({
  name: 'ScheduleAssignModal',
  components: { Button },
  props: {
    type: String,
    date: Date,
  },
  data() {
    return {
      anotherPerson: false,
      name: '',
      surname: '',
      phone: '',
      additional_people: 0,
      comment: '',
      questionable: false,
      time: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    userData() {
      if (!this.user) return '';
      return `${this.user.name} ${this.user.surname} - ${this.user.phone}`;
    },
    parsedDate() {
      return parseDate(this.date);
    },
    dayOfWeek() {
      return daysOfWeek[new Date(this.date).getDay()];
    },
    typeOfTime() {
      return typeOfTime[this.type];
    },
    description() {
      return `${typeDescription[this.type]} ${subDescription}`;
    },
  },
  methods: {
    onTimeChange(time, timeString) {
      this.time = timeString;
    },
    submit() {
      const body = {
        anotherPerson: this.anotherPerson,
        ...(this.anotherPerson
          ? { user: { name: this.name, surname: this.surname, phone: this.phone } }
          : { user: this.user }),
        arrival_time: this.time || null,
        additional_people: parseInt(this.additional_people, 10) || null,
        comment: this.comment,
        questionable: this.questionable,
        date: this.date,
        type: this.type,
      };
      this.$store.dispatch('claim/createClaim', body).then(() => {
        this.$emit('onclose');
      });
    },
  },
});
</script>

<style scoped lang="scss">
$lightGrey: #ccc;
$green: #42b983;

.schedule-assign-modal {
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
    margin: 8px 0;
  }

  &__info-title {
    font-size: 14px;
    margin: 6px 0;
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
    margin: 6px 0;
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

  &__assign-btn {
    color: grey;
    border-color: grey;
    &:hover {
      background-color: grey;
      color: white;
    }
  }

  &__another-prs-input {
    width: 100%;
    margin-bottom: 4px;
  }

  &__time-picker {
    width: 100%;
  }

  @media (max-width: 450px) {
    max-width: 100%;
    min-width: 100%;
    left: 0;
    border-radius: 0;
  }
}
</style>
