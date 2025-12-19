<template>
  <div class="profile-header">
    <div class="profile-header__main-data-container">
      <div class="profile-header__img-container">
        <img class="profile-header__img" src="@/assets/cat_infos.webp" alt="profile-icon">
      </div>
      <div class="profile-header__name-phone-container">
        <div class="profile-header__name-role-container">
          <span class="profile-header__name">{{ userToDisplay.name }} {{ userToDisplay.surname }}</span>
          <span v-if="translatedUserRole" class="profile-header__role">
            {{ translatedUserRole.translate }}
          </span>
        </div>
        <a :href="`tel:+${userToDisplay.phone}`">
          <span class="profile-header__phone">+{{ phoneToDisplay }}</span>
        </a>
        <span class="profile-header__visits">
          <b>{{ claimsCount }}</b> посещений
        </span>
      </div>
    </div>
    <CommonButton
      v-if="isSuperAdmin"
      class="profile-header__reset-password-btn"
      title="Сгенерировать ссылку для смены пароля"
      @click="$router.push(`/forgot-password?userId=${userId}`)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import prettifyPhone from '@/utils/prettifyPhone';
import CommonButton from '@/components/common/CommonButton.vue';

const { isSuperAdmin } = defineProps({
  isSuperAdmin: Boolean,
});

const store = useStore();
const route = useRoute();

const allRoles = computed(() => store.state.roles.list || []);
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

const translatedUserRole = computed(() => {
  return allRoles.value.find((role) => role.name === userToDisplay.value?.role);
});

const claimsCount = computed(() => {
  if (!personalClaims.value) {
    return '..';
  }
  return personalClaims.value.length;
});

const phoneToDisplay = computed(() => {
  return prettifyPhone(userToDisplay.value?.phone);
});
</script>

<style scoped lang="scss">
$lightBlue: #e7f5fc;
$darkGrey: #646464;

.profile-header {
  position: relative;
  width: 100%;
  height: 150px;
  background-color: $lightBlue;
  position: relative;
  max-width: 100%;
  color: black;

  &__main-data-container {
    position: absolute;
    bottom: 20px;
    left: 20%;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 4px;
  }

  &__img-container {
    width: 80px;
    height: 80px;
    max-width: 80px;
    overflow: hidden;
    border-radius: 40px;
    background-color: white;
  }

  &__img {
    min-width: 80px;
    min-height: 80px;
    overflow: hidden;
    max-width: 80px;
    border-radius: 40px;
  }

  &__name-phone-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 16px;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
  }

  &__phone {
    font-size: 16px;
    margin-bottom: 2px;
  }

  &__visits {
    font-size: 16px;
  }

  &__name-role-container {
    display: flex;
    align-items: center;
  }

  &__role {
    margin-left: 8px;
    padding-top: 4px;
    font-size: 16px;
    color: $darkGrey;
  }

  &__reset-password-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    color: red;
    border-color: red;

    &:hover {
      background-color: red;
      border-color: red;
      color: white;
    }
  }

  @media (max-width: 767px) {
    &__header {
      height: 180px;
      display: flex;
      flex-direction: column;
    }

    &__main-data-container {
      position: relative;
      left: unset;
      bottom: unset;
    }

    &__reset-password-btn {
      position: relative;
      right: unset;
      top: unset;
      margin: 16px;
    }

    &__name-role-container {
      flex-direction: column;
      align-items: flex-start;
    }

    &__role {
      margin-left: 0px;
      padding-top: 0px;
    }
  }
}
</style>
