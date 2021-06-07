<template>
  <div @click="$emit('on-claim-click', claim)" class="schedule-claim" :class="{ 'is-my-claim': isMyClaim }">
    <div v-if="haveAdditionFields" class="schedule-claim__additional-fields">
      <div
        class="schedule-claim__additional-fields__wrapper"
        v-for="field in claim.user.user_additional_fields"
        :key="field._id"
      >
        <img v-if="field.value" class="schedule-claim__icon" :src="getIcon(field.additional_field_template_id)" />
      </div>
    </div>
    <span><b class="schedule-claim__questionable">{{ claim.questionable ? '?' : '' }}</b> {{ username }}</span>
    <b class="schedule-claim__additional-people" v-if="claim.additional_people"> +{{ claim.additional_people }} </b>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Schedule',
  props: {
    claim: Object,
  },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.current,
    user: (state) => state.users.user,
    claimUser() {
      return this.claim.user;
    },
    userAdditionalFields() {
      return this.claimUser.user_additional_fields;
    },
    username() {
      const { name, surname } = this.claimUser;
      return `${name} ${surname}`;
    },
    haveAdditionFields() {
      return this.userAdditionalFields.some((field) => !!field.value);
    },
    isMyClaim() {
      return this.user && this.user._id === this.claimUser._id;
    },
  }),
  methods: {
    getIcon(id) {
      if (!this.additionalFields) return '';
      const fieldObj = this.additionalFields.find((field) => field._id === id);
      if (!fieldObj) {
        return '';
      }
      return fieldObj.icon;
    },
  },
};
</script>

<style scoped lang="scss">
.schedule-claim {
  display: flex;
  position: relative;
  cursor: pointer;

  &.is-my-claim {
    font-weight: bold;
    background-color: rgba(151,251,151,0.2);
  }

  &__additional-fields {
    position: absolute;
    display: none;
    align-items: center;
    top: -1px;
    right: 104%;
    background-color: white;
    height: 27px;
    border-radius: 2px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);

    &__wrapper {
      margin: 0px 2px;
    }
  }

  &:hover &__additional-fields {
    display: flex;
  }

  &__additional-people {
    margin-left: 2px;
    font-size: 12px;
  }

  &__icons {
    display: flex;
    flex-wrap: nowrap;
    margin-left: auto;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }

  &__questionable {
    color: red;
  }
}
</style>
