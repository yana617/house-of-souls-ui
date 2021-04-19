<template>
  <div @click="$emit('onclose')" class="modal__wrapper claim-info-modal__wrapper">
    <div class="claim-info-modal" @click.stop>
      <img @click="$emit('onclose')" class="claim-info-modal__close-icon" src="@/assets/close.png" />
      <div class="claim-info-modal__header"></div>
      <span class="claim-info-modal__info-title">Данные о волонтёре</span>
      <span class="claim-info-modal__info-description"> {{ user.name }} {{ user.surname }} </span>
      <a class="claim-info-modal__info-description" :href="`tel:${user.phone}`">{{ user.phone }}</a>
      <span v-if="haveAdditionFields" class="claim-info-modal__info-description">
        <div class="claim-info-modal__additional-fields" v-for="field in user.user_additional_fields" :key="field._id">
          <img
            v-if="field.value"
            :key="field.id"
            class="claim-info-modal__icon"
            :src="additionalFieldsById[field.additional_field_template_id].icon"
          />
          <Tooltip
            class="claim-info-modal__tooltip"
            v-if="field.value"
            :helpText="additionalFieldsById[field.additional_field_template_id].label"
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Tooltip from '../common/CustomTooltip.vue';

export default {
  name: 'ClaimInfoModal',
  components: { Tooltip },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.current,
    haveAdditionFields() {
      return this.user.user_additional_fields.some((field) => !!field.value);
    },
    additionalFieldsById() {
      const additionalFieldsById = {};
      this.additionalFields.forEach((field) => {
        additionalFieldsById[field._id] = field;
      });
      return additionalFieldsById;
    },
  }),
  props: {
    additional_people: Number,
    arrival_time: String,
    comment: String,
    user: Object,
  },
};
</script>

<style lang="scss">
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

  &__info-title {
    font-size: 14px;
    font-weight: bold;
    margin: 8px 0;
  }

  &__info-description {
    display: flex;
    font-size: 14px;
    font-weight: normal;
    margin: 2px 0;
  }

  &__comment {
    &__wrapper {
      border: 1px solid $lightGrey;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
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
