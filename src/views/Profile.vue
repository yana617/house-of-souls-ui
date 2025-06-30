<template>
  <div v-if="userToDisplay" class="profile">
    <div class="profile__header">
      <div class="profile__main-data-container">
        <div class="profile__img-container">
          <img class="profile__img" src="@/assets/cat_infos.jpeg" alt="profile-icon">
        </div>
        <div class="profile__name-phone-container">
          <div class="profile__name-role-container">
            <span class="profile__name">{{ userToDisplay.name }} {{ userToDisplay.surname }}</span>
            <span v-if="translatedUserRole" class="profile__role">{{ translatedUserRole.translate }}</span>
          </div>
          <a :href="`tel:+${userToDisplay.phone}`">
            <span class="profile__phone">+{{ phoneToDisplay }}</span>
          </a>
          <span class="profile__visits">
            <b>{{ claimsCount }}</b> посещений
          </span>
        </div>
      </div>
      <CommonButton
        v-if="isAnotherUserProfile && hasPermissionsToEditPermissions"
        class="profile__reset-password-btn"
        title="Сгенерировать ссылку для смены пароля"
        @click="$router.push(`/forgot-password?userId=${userId}`)"
      />
    </div>
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="1" tab="Посещения">
        <VisitsTable :claims="personalClaims" />
      </a-tab-pane>
      <a-tab-pane v-if="!isAnotherUserProfile" key="2" tab="Личные данные">
        <ProfileForm :user-id="userId" />
      </a-tab-pane>
      <a-tab-pane v-if="isAnotherUserProfile && hasPermissionsToEditPermissions" key="3" tab="Права">
        <PermissionsAndRoles :user-id="userId" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';

import VisitsTable from '@/components/profile-view/VisitsTable.vue';
import ProfileForm from '@/components/profile-view/ProfileForm.vue';
import PermissionsAndRoles from '@/components/profile-view/PermissionsAndRoles.vue';
import prettifyPhone from '@/utils/prettifyPhone';
import CommonButton from '@/components/common/CommonButton.vue';

export default {
  name: 'Profile',
  components: {
    VisitsTable,
    ProfileForm,
    PermissionsAndRoles,
    CommonButton,
  },
  data() {
    return {
      activeKey: ref('1'),
    };
  },
  computed: mapState({
    allRoles: (state) => state.roles.list || [],
    translatedUserRole() {
      return this.allRoles.find((role) => role.name === this.userToDisplay?.role);
    },
    isAnotherUserProfile(state) {
      return !!this.$route.params.id && this.$route.params.id !== state.auth.user?.id;
    },
    anotherUserProfile: (state) => state.users.userProfile,
    user: (state) => state.auth.user,
    personalClaims: (state) => state.claims.personal,
    userId() {
      if (this.isAnotherUserProfile) {
        return this.$route.params.id;
      }
      return this.user.id;
    },
    userToDisplay() {
      if (this.isAnotherUserProfile) {
        return this.anotherUserProfile;
      }
      return this.user;
    },
    hasPermissionsToEditPermissions: (state) => {
      const permissions = state.permissions.my;
      return permissions && permissions.includes('EDIT_PERMISSIONS');
    },
    claimsCount() {
      if (!this.personalClaims) {
        return '..';
      }
      return this.personalClaims.length;
    },
    phoneToDisplay() {
      return prettifyPhone(this.userToDisplay.phone);
    },
  }),
  watch: {
    isAnotherUserProfile() {
      this.loadUserAndClaims();
    },
  },
  created() {
    this.loadUserAndClaims();
  },
  unmounted() {
    this.$store.dispatch('users/clearUserProfile');
  },
  methods: {
    async loadUserAndClaims() {
      this.$store.dispatch('app/setLoading', true);
      this.$store.dispatch('roles/getRoles');
      let loadUser = Promise.resolve();
      if (this.isAnotherUserProfile) {
        loadUser = this.$store.dispatch('users/getUserProfile', { userId: this.userId });
      } else if (!this.user) {
        loadUser = this.$store.dispatch('users/getUser');
      }
      loadUser
        .then(() => {
          this.$store
            .dispatch('claims/getClaimsByUserId', { userId: this.userId })
            .finally(() => {
              this.$store.dispatch('app/setLoading', false);
            });
        })
        .catch(() => {
          this.$store.dispatch('app/setLoading', false);
        });
    },
  },
};
</script>

<style scoped lang="scss">
$lightBlue: #e7f5fc;
$darkGrey: #646464;

.profile {
  &__header {
    position: relative;
    width: 100%;
    height: 150px;
    background-color: $lightBlue;
    position: relative;
    max-width: 100%;
    color: black;
  }

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
