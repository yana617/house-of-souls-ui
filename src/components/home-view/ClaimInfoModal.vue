<template>
  <div class="modal__wrapper claim-info-modal__wrapper" @click="$emit('onclose')">
    <div class="claim-info-modal" @click.stop>
      <img
        class="claim-info-modal__close-icon"
        src="@/assets/close.png"
        alt="close"
        @click="$emit('onclose')"
      >
      <div class="claim-info-modal__header" />
      <span class="claim-info-modal__info-title">Данные о волонтёре</span>
      <span class="claim-info-modal__info-description name"> {{ userToShow.name }} {{ userToShow.surname }} </span>
      <a v-if="userToShow.phone" class="claim-info-modal__info-description phone" :href="`tel:+${userToShow.phone}`">
        +{{ phoneToShow }}
      </a>
      <span v-if="haveTruthyAdditionFields" class="claim-info-modal__additional-fields">
        <div
          v-for="field in user.user_additional_fields"
          :key="field._id"
          class="claim-info-modal__additional-fields__item"
        >
          <CheckCircleTwoTone v-if="field.value" :two-tone-color="twoToneColor" />
          <span v-if="field.value" class="claim-info-modal__additional-fields__label">
            {{ additionalFieldsById[field.additional_field_template_id]?.label }}
          </span>
          <Tooltip
            v-if="field.value"
            class="claim-info-modal__tooltip"
            :help-text="additionalFieldsById[field.additional_field_template_id]?.description"
          />
        </div>
      </span>
      <span class="claim-info-modal__info-title">Дополнительные люди на смене</span>
      <span class="claim-info-modal__info-description">{{ additional_people || '-' }}</span>
      <span class="claim-info-modal__info-title">Примерное прибытие на смену</span>
      <span class="claim-info-modal__info-description">{{ arrival_time || '-' }}</span>
      <span class="claim-info-modal__info-title">Комментарий</span>
      <div v-if="comment" class="claim-info-modal__comment__wrapper">
        {{ comment }}
      </div>
      <span v-if="!comment" class="claim-info-modal__info-description">-</span>
      <span v-if="questionable" class="claim-info-modal__info-title red">Под вопросом!</span>
      <CommonButton
        v-if="isAdmin"
        class="claim-info-modal__delete-btn"
        :title="isMyClaim ? 'Отписаться' : 'Удалить запись'"
        @click="onDelete()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';

import CommonButton from '@/components/common/CommonButton.vue';
import prettifyPhone from '@/utils/prettifyPhone';
import Tooltip from '../common/CustomTooltip.vue';

const TWO_TONE_COLOR = '#52c41a';

export default {
  name: 'ClaimInfoModal',
  components: { Tooltip, CheckCircleTwoTone, CommonButton },
  props: {
    _id: String,
    additional_people: Number,
    arrival_time: String,
    comment: String,
    user: Object,
    guest: {
      type: [Object, null],
    },
    guest_id: {
      type: [String, null],
    },
    questionable: Boolean,
  },
  emits: ['refresh-schedule', 'onclose'],
  data() {
    return {
      twoToneColor: TWO_TONE_COLOR,
    };
  },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.all,
    haveTruthyAdditionFields() {
      return (
        !this.guest_id
        && this.user.user_additional_fields
        && this.user.user_additional_fields.some((field) => !!field.value)
      );
    },
    additionalFieldsById() {
      const additionalFieldsById = {};
      this.additionalFields.forEach((field) => {
        additionalFieldsById[field.id] = field;
      });
      return additionalFieldsById;
    },
    userToShow() {
      if (this.guest_id) {
        return this.guest;
      }
      return this.user;
    },
    authUser: (state) => state.auth.user,
    isMyClaim() {
      return this.authUser && this.authUser.id === this.user.id;
    },
    isAdmin() {
      return this.authUser && this.authUser.role === 'ADMIN';
    },
    phoneToShow() {
      return prettifyPhone(this.userToShow.phone);
    },
  }),
  methods: {
    onDelete() {
      this.$store.dispatch('app/setLoading', true);
      this.$store
        .dispatch('claims/deleteClaim', { _id: this._id })
        .then(() => {
          this.$emit('refresh-schedule');
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false);
          this.$emit('onclose');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;

.claim-info-modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  top: calc(50% - 200px);
  left: calc(50% - 200px);
  padding: 8px 16px 16px 16px;
  text-align: left;
  max-width: 400px;
  min-width: 400px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

  &__wrapper {
    background-color: rgba(0, 0, 50, 0.3);
    backdrop-filter: blur(1px);
  }

  &__additional-fields {
    margin: 2px 0;
    display: flex;
    flex-direction: column;

    &__item {
      display: flex;
      align-items: center;
    }

    &__label {
      margin: 0 8px;
    }
  }

  &__info-title {
    font-size: 14px;
    font-weight: bold;
    margin: 8px 0;

    &.red {
      color: red;
    }
  }

  &__info-description {
    display: flex;
    font-size: 14px;
    font-weight: normal;
    margin: 2px 0;

    &.name, &.phone {
      font-size: 16px;
    }
  }

  &__comment {
    &__wrapper {
      border: 1px solid $lightGrey;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  &__tooltip {
    margin-left: 0;
  }

  &__close-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 12px;
    top: 12px;
    cursor: pointer;
  }

  &__delete-btn {
    color: red;
    border-color: red;
    margin-top: 8px;
    width: 150px;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  @media (max-width: 450px) {
    max-width: 100%;
    min-width: 100%;
    left: 0;
    top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
