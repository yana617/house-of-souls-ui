<template>
  <div class="volunteers-requests">
    <span id="title">Неверифицированные пользователи</span>
    <a-table
      v-if="!$matchMedia.mobile"
      :columns="volunteersColumns"
      :data-source="users"
      :row-key="(record) => record._id"
      class="volunteers-requests__table"
    >
      <template #createdAt="{ text: date }">
        <span>{{ getDate(date) }}</span>
      </template>
      <template #name="{ record }">
        <span>{{ userInfo(record) }}</span>
      </template>
      <template #userAdditionalFields="{ record }">
        <span>
          <AdditionalFieldsTags
            :userAdditionalFields="record.user_additional_fields"
            :additionalFieldsTemplates="additionalFieldsTemplates"
          />
        </span>
      </template>
      <template #action="{}">
        <span>
          <a>Верифицировать</a>
        </span>
      </template>
    </a-table>
    <div v-if="$matchMedia.mobile">
      <div v-for="user in users" :key="user._id" class="volunteers-requests__mobile">
        <div class="volunteers-requests__mobile__container top">
          <h4 class="volunteers-requests__mobile__createdAt">{{ getDate(user.createdAt) }}</h4>
          <h3 class="volunteers-requests__mobile__name">{{ userInfo(user) }}</h3>
        </div>
        <div class="volunteers-requests__mobile__container bottom">
          <h4>{{ user.phone }}</h4>
          <div class="volunteers-requests__mobile__line" />
          <AdditionalFieldsTags
            :userAdditionalFields="user.user_additional_fields"
            :additionalFieldsTemplates="additionalFieldsTemplates"
          />
        </div>
        <Button class="volunteers-requests__mobile__submit-btn" title="Верифицировать" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { volunteersColumns } from '@/utils/constants';
import { parseDateAndTime, calculateAge } from '@/utils/date';
import AdditionalFieldsTags from '@/components/volunteers-requests-view/AdditionalFieldsTags.vue';
import Button from '@/components/common/Button.vue';

export default {
  name: 'VolunteersRequests',
  components: { Button, AdditionalFieldsTags },
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
    getAge(date) {
      return calculateAge(date);
    },
    userInfo(user) {
      return `${user.name} ${user.surname} (${this.getAge(user.birthday)})`;
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$lightGrey: #ccc;
$lightestGrey: #f0f0f0;

.volunteers-requests {
  width: 100%;

  &__mobile {
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
      font-size: 12px;
    }

    &__submit-btn {
      color: $green;
      border-color: $green;
      margin-top: 8px;
    }
  }
}
</style>
