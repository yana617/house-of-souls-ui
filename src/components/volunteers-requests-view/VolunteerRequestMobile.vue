<template>
  <div class="volunteer-request">
    <div class="volunteer-request__container top">
      <h4 class="volunteer-request__createdAt">{{ getDate(createdAt) }}</h4>
      <h3 class="volunteer-request__name">{{ name }} {{ surname }} ({{ getAge(birthday) }})</h3>
    </div>
    <div class="volunteer-request__container bottom">
      <h4>{{ phone }}</h4>
      <div class="volunteer-request__line" />
      <a-tag v-for="uaf in userAdditionalFields" :key="uaf._id" :color="uaf.value ? 'green' : 'volcano'">
        {{ getUserAdditionalField(uaf.additional_field_template_id) }}
      </a-tag>
    </div>
    <Button class="volunteer-request__submit-btn" title="Верифицировать" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';
import { parseDateAndTime, calculateAge } from '../../utils/date';

export default {
  name: 'VolunteerRequestMobile',
  props: {
    createdAt: String,
    name: String,
    surname: String,
    phone: String,
    birthday: String,
    userAdditionalFields: Array,
  },
  components: { Button },
  computed: mapState({
    additionalFieldsTemplates: (state) => state.additionalFields.current,
  }),
  methods: {
    getDate(date) {
      return parseDateAndTime(date);
    },
    getAge(date) {
      return calculateAge(date);
    },
    getUserAdditionalField(id) {
      if (!this.additionalFieldsTemplates) return '..';
      const additionalFieldsTemplate = this.additionalFieldsTemplates.find((f) => f._id === id);
      return additionalFieldsTemplate ? additionalFieldsTemplate.label : '..';
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$lightGrey: #ccc;
$lightestGrey: #f0f0f0;

.volunteer-request {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border: 2px solid $lightestGrey;
  margin: 8px;
  h3,
  h4,
  h5 {
    margin: 0;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;

    &.top {
      margin-top: 12px;
    }
  }

  &__line {
    width: 1px;
    height: 24px;
    background-color: $lightGrey;
    margin-left: 8px;
    margin-right: 8px;
  }

  &__createdAt {
    position: absolute;
    top: 2px;
    left: calc(50% - 48px);
    font-size: 12px;
  }

  &__name {
    margin-left: 8px !important;
  }

  &__submit-btn {
    color: $green;
    border-color: $green;
    margin-top: 8px;
  }
}
</style>
