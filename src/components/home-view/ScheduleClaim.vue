<template>
  <div class="schedule-claim" :class="{ 'is-my-claim': isMyClaim }">
    <div v-if="haveTruthyAdditionFields()" class="schedule-claim__additional-fields">
      <div
        class="schedule-claim__additional-fields__wrapper"
        v-for="field in claim.user?.user_additional_fields"
        :key="field.id"
      >
        <img v-if="false" class="schedule-claim__icon" :src="getIcon(field.additional_field_template_d)" />
        <SmileOutlined v-if="field.value" class="schedule-claim__icon" />
      </div>
    </div>
    <span @click="$emit('on-claim-click', claim)" class="schedule-claim__main-container">
      <b v-if="claim.questionable" class="schedule-claim__questionable">?</b>
      {{ username }}
      <b class="schedule-claim__additional-people" v-if="claim.additional_people"> +{{ claim.additional_people }} </b>
    </span>
    <EditOutlined v-if="isMyClaim" @click="this.$emit('on-update-click')" style="margin-left: auto" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EditOutlined, SmileOutlined } from '@ant-design/icons-vue';

export default {
  name: 'Schedule',
  components: { EditOutlined, SmileOutlined },
  props: {
    claim: Object,
  },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.current,
    user: (state) => state.auth.user,
    claimUser() {
      if (this.claim.guest_id) {
        return this.claim.guest;
      }
      return this.claim.user;
    },
    userAdditionalFields() {
      return this.claimUser.user_additional_fields;
    },
    username() {
      const { name, surname } = this.claimUser;
      return `${name} ${surname}`;
    },
    isMyClaim() {
      return this.user && this.user?.id === this.claim.user?.id;
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
    additionalFieldTemplateExist(aftId) {
      if (!this.additionalFields || this.additionalFields.length === 0) return false;
      return this.additionalFields.find((field) => field.id === aftId);
    },
    haveTruthyAdditionFields() {
      return this.userAdditionalFields && this.userAdditionalFields.some(
        (field) => field.value && this.additionalFieldTemplateExist(field.additional_field_template_id),
      );
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
    background-color: rgba(151, 251, 151, 0.2);
  }

  &__main-container {
    display: flex;
  }

  &__additional-fields {
    position: absolute;
    display: none;
    align-items: center;
    top: -1px;
    right: 104%;
    background-color: white;
    height: 22px;
    border-radius: 2px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
    padding: 0 4px;
  }

  &:hover &__additional-fields {
    display: flex;
  }

  &__additional-people {
    margin-left: 2px;
    font-size: 12px;
  }

  &__icon {
    margin: 0 2px;
  }

  &__questionable {
    color: red;
    margin-right: 2px;
  }
}
</style>
