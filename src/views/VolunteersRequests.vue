<template>
  <div class="volunteers-requests">
    <span id="title">Неверифицированные пользователи</span>
    <a-table
      :columns="volunteersColumns"
      :data-source="users"
      :row-key="(record) => record._id"
      class="volunteers-requests__table"
    >
      <template #createdAt="{ text: date }">
        <span>{{ getDate(date) }}</span>
      </template>
      <template #name="{ record }">
        <span>{{ record.name }} {{ record.surname }} ({{ getAge(record.birthday) }})</span>
      </template>
      <template #userAdditionalFields="{ text: userAdditionalFields }">
        <span>
          <a-tag v-for="uaf in userAdditionalFields" :key="uaf._id" :color="uaf.value ? 'green' : 'volcano'">
            {{ userAdditionalField(uaf.additional_field_template_id) }}
          </a-tag>
        </span>
      </template>
      <template #action="{}">
        <span>
          <a>Верифицировать</a>
        </span>
      </template>
    </a-table>
    <div class="volunteers-requests__mobile-container">
      <VolunteerRequestMobile v-for="user in users" :key="user._id" v-bind="user" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { volunteersColumns } from '../utils/constants';
import { parseDateAndTime, calculateAge } from '../utils/date';
import VolunteerRequestMobile from '../components/volunteers-requests-view/VolunteerRequestMobile.vue';

export default {
  name: 'VolunteersRequests',
  components: { VolunteerRequestMobile },
  created() {
    this.$store.dispatch('users/getUsers', { isVerified: false });
    this.$store.dispatch('additionalFields/getAdditionalFields');
  },
  computed: mapState({
    users: (state) => state.users.list,
    additionalFieldsTemplates: (state) => state.additionalFields.current,
  }),
  setup() {
    return {
      volunteersColumns,
    };
  },
  methods: {
    getDate(date) {
      return parseDateAndTime(date);
    },
    userAdditionalField(id) {
      if (!this.additionalFieldsTemplates) return '..';
      return this.additionalFieldsTemplates.find((f) => f._id === id).label;
    },
    getAge(date) {
      return calculateAge(date);
    },
  },
};
</script>

<style lang="scss">
.volunteers-requests {
  width: 100%;

  &__mobile-container {
    display: none;
  }

  @media (max-width: 900px) {
    &__table {
      display: none;
    }
    &__mobile-container {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
