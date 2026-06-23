<template>
  <div v-if="hasPermissions('EDIT_PERMISSIONS')" class="volunteers-requests">
    <span id="title">Неверифицированные пользователи</span>
    <a-table
      v-if="!$matchMedia.tablet"
      :columns="volunteersColumns"
      :data-source="users"
      :row-key="(record) => record.id"
      :row-class-name="(record) => ({
        'volunteers-requests__deactivated-row': record.createdAt !== record.updatedAt,
      })
      "
    >
      <template #createdAt="{ text: date }">
        <span>{{ getDate(date) }}</span>
      </template>
      <template #name="{ record }">
        <span>{{ userInfo(record) }}</span>
      </template>
      <template #userAdditionalFields="{ record }">
        <span>
          <AdditionalFieldsTags v-if="!noAtf" :user-additional-fields="record.user_additional_fields" />
          <span v-if="noAtf || !record.user_additional_fields">-</span>
        </span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="changeRole(record.id)">Сделать волонтером</a>
        </span>
      </template>
    </a-table>
    <div v-if="$matchMedia.tablet">
      <div v-for="user in users" :key="user.id" class="volunteers-requests__mobile">
        <div class="volunteers-requests__mobile__header">
          <span class="volunteers-requests__mobile__name">{{ userInfo(user) }}</span>
          <span class="volunteers-requests__mobile__date">{{ getDate(user.createdAt) }}</span>
        </div>
        <div class="volunteers-requests__mobile__body">
          <span class="volunteers-requests__mobile__phone">+{{ prettifyPhone(user.phone) }}</span>
          <template v-if="!noAtf">
            <div class="volunteers-requests__mobile__line" />
            <AdditionalFieldsTags :user-additional-fields="user.user_additional_fields" />
          </template>
        </div>
        <CommonButton
          class="volunteers-requests__mobile__submit-btn"
          title="Сделать волонтером"
          @click="changeRole(user.id)"
        />
      </div>
      <span v-if="users.length === 0" class="volunteers-requests__mobile__no-users">
        Пока нет заявок
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

import { volunteersColumns } from '@/utils/constants';
import { parseDateAndTime, calculateAge } from '@/utils/date';
import AdditionalFieldsTags from '@/components/volunteers-requests-view/AdditionalFieldsTags.vue';
import CommonButton from '@/components/common/CommonButton.vue';
import prettifyPhone from '@/utils/prettifyPhone';

const store = useStore();

const permissions = computed(() => store.state.permissions.my);
const users = computed(() => store.state.users.list);
const noAtf = computed(
  () =>
    !store.state.additionalFields.current ||
    store.state.additionalFields.current.length === 0,
);

function getDate(date) {
  return parseDateAndTime(date);
}

function getAge(date) {
  return calculateAge(date);
}

function userInfo(user) {
  return `${user.name} ${user.surname} (${getAge(user.birthday)})`;
}

function hasPermissions(permission) {
  return permissions.value.includes(permission);
}

function loadUsers() {
  store.dispatch('app/setLoading', true);
  store
    .dispatch('users/getUsers', {
      roles: 'USER',
      sortBy: 'createdAt',
      order: 'desc',
      limit: 100,
    })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
}

function changeRole(userId) {
  store.dispatch('users/updateRole', { userId, role: 'VOLUNTEER' }).then(() => {
    loadUsers();
  });
}

onMounted(() => {
  loadUsers();
  store.dispatch('additionalFields/getAdditionalFields');
});

onUnmounted(() => {
  store.dispatch('users/clearUsersList');
});
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightGrey: #ccc;
$lightestGrey: #f0f0f0;
$lightRed: #ffe5e1;

.volunteers-requests {
  width: 100%;

  &__deactivated-row {
    background-color: $lightRed;
  }

  &__mobile {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
    border: 1px solid $lightestGrey;
    border-radius: 8px;
    margin: 8px 16px;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }

    &__name {
      font-weight: 600;
      font-size: 15px;
      text-align: left;
    }

    &__date {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      flex-shrink: 0;
    }

    &__body {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }

    &__phone {
      font-size: 14px;
      color: #555;
    }

    &__line {
      width: 1px;
      height: 20px;
      background-color: $lightGrey;
      margin: 0 4px;
    }

    &__submit-btn {
      margin-top: 8px;
      width: 100%;
      color: $green;
      border-color: $green;

      &:hover {
        background-color: $green;
        color: white;
      }
    }

    &__no-users {
      display: flex;
      padding: 0 22px;
    }
  }
}
</style>
