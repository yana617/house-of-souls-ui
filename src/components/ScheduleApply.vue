<template>
  <span class="schedule-apply">
    <span>{{ username }}</span>
    <b class="schedule-apply__additional-people" v-if="apply.additionalPeople">
      +{{ apply.additionalPeople }}
    </b>
    <div class="schedule-apply__icons" v-if="haveAdditionFields">
      <img
        v-for="field in userAdditionalFields"
        :key="`${user.id}-${field.name}`"
        class="schedule-apply__icon"
        :src="field.icon"
      />
    </div>
  </span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Schedule',
  props: {
    apply: Object,
  },
  computed: mapState({
    additionalFields: (state) => state.users.additionalFields,
    user() {
      return this.apply.user;
    },
    additionalFieldsTypes() {
      return this.additionalFields.map((field) => field.name);
    },
    haveAdditionFields() {
      return this.additionalFieldsTypes.some((field) => !!this.user[field]);
    },
    userAdditionalFields() {
      const fields = [];
      this.additionalFields.forEach((field) => {
        if (this.user[field.name]) {
          fields.push(field);
        }
      });
      return fields;
    },
    username() {
      const { name, surname, egida_nick } = this.user;
      if (egida_nick) {
        return `${name} ${egida_nick}`;
      }
      return `${name} ${surname}`;
    },
  }),
};
</script>

<style scoped lang="scss">
.schedule-apply {
  display: flex;

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
}
</style>
