<template>
  <div class="volunteers-requests" v-if="hasPermissions('EDIT_PERMISSIONS')">
    <span id="title">Неверифицированные пользователи</span>
    <a-table
      v-if="!$matchMedia.mobile"
      :columns="volunteersColumns"
      :data-source="users"
      :row-key="(record) => record.id"
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
            v-if="!noAtf"
            :userAdditionalFields="record.user_additional_fields"
          />
          <span v-if="noAtf || !record.user_additional_fields">-</span>
        </span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="changeRole(record.id)">Сделать волонтером</a>
        </span>
      </template>
    </a-table>
    <div v-if="$matchMedia.mobile">
      <div v-for="user in users" :key="user.id" class="volunteers-requests__mobile">
        <div class="volunteers-requests__mobile__container top">
          <h4 class="volunteers-requests__mobile__createdAt">{{ getDate(user.createdAt) }}</h4>
          <h3 class="volunteers-requests__mobile__name">{{ userInfo(user) }}</h3>
        </div>
        <div class="volunteers-requests__mobile__container bottom">
          <h4>{{ user.phone }}</h4>
          <div v-if="!noAtf" class="volunteers-requests__mobile__line" />
          <AdditionalFieldsTags v-if="!noAtf" :userAdditionalFields="user.user_additional_fields" />
        </div>
        <Button
          @click="changeRole(user.id)"
          class="volunteers-requests__mobile__submit-btn"
          title="Сделать волонтером"
        />
      </div>
      <span class="volunteers-requests__mobile__no-users" v-if="users.length === 0">
        Пока нет заявок
      </span>
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
    this.loadUsers();
    this.$store.dispatch('additionalFields/getAdditionalFields');
  },
  unmounted() {
    this.$store.dispatch('users/clearUsersList');
  },
  computed: mapState({
    permissions: (state) => state.permissions.my,
    users: (state) => state.users.list,
    noAtf: (state) => !state.additionalFields.current
      || state.additionalFields.current.length === 0,
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
    changeRole(userId) {
      this.$store.dispatch('users/updateRole', { userId, role: 'VOLUNTEER' }).then(() => {
        this.loadUsers();
      });
    },
    loadUsers() {
      this.$store.dispatch('app/setLoading', true);
      this.$store
        .dispatch('users/getUsers', { roles: 'USER', sortBy: 'createdAt', order: 'desc' })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false);
        });
    },
    hasPermissions(permission) {
      return this.permissions.includes(permission);
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

    &__no-users {
      display: flex;
      padding: 0 22px;
    }
  }
}
</style>
