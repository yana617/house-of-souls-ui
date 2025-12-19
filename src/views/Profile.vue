<template>
  <div v-if="userToDisplay" class="profile">
    <ProfileHeader :is-super-admin="isSuperAdmin" />
    <a-tabs v-model:active-key="activeKey" class="ant-tabs-centered">
      <a-tab-pane key="1" tab="Посещения">
        <VisitsTable :claims="personalClaims" />
      </a-tab-pane>
      <a-tab-pane v-if="!isAnotherUserProfile" key="2" tab="Личные данные">
        <ProfileForm :user-id="userId" />
      </a-tab-pane>
      <a-tab-pane v-if="isSuperAdmin" key="3" tab="Права">
        <PermissionsAndRoles :user-id="userId" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const activeKey = ref('1');

const user = computed(() => store.state.auth.user);
const anotherUserProfile = computed(() => store.state.users.userProfile);
const personalClaims = computed(() => {
  const claims = store.state.claims.personal;
  return claims ? [...claims].reverse() : [];
});

const isAnotherUserProfile = computed(() => {
  return !!route.params.id && route.params.id !== user.value?.id;
});

const userId = computed(() => {
  if (isAnotherUserProfile.value) {
    return route.params.id;
  }
  return user.value?.id;
});

const userToDisplay = computed(() => {
  if (isAnotherUserProfile.value) {
    return anotherUserProfile.value;
  }
  return user.value;
});

const hasPermissionsToEditPermissions = computed(() => {
  const permissions = store.state.permissions.my;
  return permissions && permissions.includes('EDIT_PERMISSIONS');
});

const isSuperAdmin = computed(
  () => isAnotherUserProfile.value && hasPermissionsToEditPermissions.value,
);

const loadUserAndClaims = async () => {
  store.dispatch('app/setLoading', true);
  store.dispatch('roles/getRoles');

  let loadUser = Promise.resolve();

  if (isAnotherUserProfile.value) {
    loadUser = store.dispatch('users/getUserProfile', { userId: userId.value });
  } else if (!user.value) {
    loadUser = store.dispatch('users/getUser');
  }

  try {
    await loadUser;
    await store.dispatch('claims/getClaimsByUserId', { userId: userId.value });
  } finally {
    store.dispatch('app/setLoading', false);
  }
};

const clearUserProfile = () => {
  store.dispatch('users/clearUserProfile');
};

watch(isAnotherUserProfile, () => {
  loadUserAndClaims();
});

onMounted(() => {
  loadUserAndClaims();
});

onUnmounted(() => {
  clearUserProfile();
});
</script>
