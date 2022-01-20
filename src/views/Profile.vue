<template>
  <div v-if="userToDisplay" class="profile">
    <div class="profile__header">
      <div class="profile__main-data-container">
        <div class="profile__img-container">
          <img class="profile__img" src="@/assets/cat_infos.jpeg" />
        </div>
        <div class="profile__name-phone-container">
          <span class="profile__name">{{ userToDisplay.name }} {{ userToDisplay.surname }}</span>
          <a :href="`tel:+${userToDisplay.phone}`">
            <span class="profile__phone">+{{ userToDisplay.phone }}</span>
          </a>
          <span class="profile__visits"><b>{{ claimsCount }}</b> посещений</span>
        </div>
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Посещения">
        <VisitsTable :claims="personalClaims.claims" />
      </a-tab-pane>
      <a-tab-pane v-if="!isAnotherUserProfile" key="2" tab="Личные данные">
        <ProfileForm :userId="userId" />
      </a-tab-pane>
      <a-tab-pane v-if="isAnotherUserProfile && hasPermissionsToEditPermissions" key="3" tab="Права">
        <PermissionsAndRoles :userId="userId" />
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

export default {
  name: 'Profile',
  components: { VisitsTable, ProfileForm, PermissionsAndRoles },
  data() {
    return {
      activeKey: ref('1'),
    };
  },
  created() {
    this.loadUserAndClaims();
  },
  computed: mapState({
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
      const { claims } = this.personalClaims;
      if (!claims || (!claims.length && typeof claims.length !== 'number')) {
        return '..';
      }
      return claims.length;
    },
  }),
  watch: {
    isAnotherUserProfile() {
      this.loadUserAndClaims();
    },
  },
  methods: {
    async loadUserAndClaims() {
      this.$store.dispatch('app/setLoading', true);
      let loadUser = Promise.resolve();
      if (this.isAnotherUserProfile) {
        loadUser = this.$store.dispatch('users/getUserProfile', { userId: this.userId });
      } else if (!this.user) {
        loadUser = this.$store.dispatch('users/getUser');
      }
      loadUser
        .then(() => {
          this.$store.dispatch('claims/getClaimsByUserId', { userId: this.userId }).finally(() => {
            this.$store.dispatch('app/setLoading', false);
          });
        })
        .catch(() => {
          this.$store.dispatch('app/setLoading', false);
        });
    },
  },
  unmounted() {
    this.$store.dispatch('users/clearUserProfile');
  },
};
</script>

<style scoped lang="scss">
$lightBlue: #e7f5fc;

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

  @media (max-width: 450px) {
    &__main-data-container {
      left: unset;
    }
  }
}
</style>
