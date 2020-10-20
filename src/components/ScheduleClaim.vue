<template>
  <span @click="this.$emit('on-claim-click', this.claim)" class="schedule-claim">
    <div v-if="haveAdditionFields" class="schedule-claim__additional-fields">
      <div
        class="schedule-claim__additional-fields__wrapper"
        v-for="field in claim.user.user_additional_fields"
        :key="field.id"
      >
        <img v-if="field.value" class="schedule-claim__icon" :src="getIcon(field.additional_field_template_id)" />
      </div>
    </div>
    <span>{{ username }}</span>
    <b class="schedule-claim__additional-people" v-if="claim.additional_people"> +{{ claim.additional_people }} </b>
  </span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Schedule',
  props: {
    claim: Object,
  },
  computed: mapState({
    additionalFields: (state) => state.users.additionalFields,
    user() {
      return this.claim.user;
    },
    userAdditionalFields() {
      return this.user.user_additional_fields;
    },
    username() {
      const { name, surname, egida_nick } = this.user;
      if (egida_nick) {
        return `${name} ${egida_nick}`;
      }
      return `${name} ${surname}`;
    },
    haveAdditionFields() {
      return this.userAdditionalFields.some((field) => !!field.value);
    },
  }),
  methods: {
    getIcon(id) {
      const fields = this.additionalFields.filter((field) => field.id.toString() === id.toString());
      if (!fields.length) {
        return '';
      }
      return fields[0].icon;
    },
  },
};
</script>

<style scoped lang="scss">
.schedule-claim {
  display: flex;
  position: relative;
  cursor: pointer;

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
}
</style>
