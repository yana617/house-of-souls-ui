<template>
  <div v-if="user" class="profile">
    <div class="profile__header">
      <div class="profile__main-data-container">
        <div class="profile__img-container">
          <img class="profile__img" src="@/assets/cat_infos.jpeg" />
        </div>
        <div class="profile__name-phone-container">
          <span class="profile__name">{{ user.name }} {{ user.surname }}</span>
          <a :href="`tel:${user.phone}`">
            <span class="profile__phone">+{{ user.phone }}</span>
          </a>
          <span class="profile__visits">
            <b>{{ personalClaims.total || '..' }}</b> посещений
          </span>
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
      <a-tab-pane v-if="isAnotherUserProfile && havePermissionsToEditPermissions" key="3" tab="Права">
        <PermissionsAndRoles :userId="userId" userRole="USER" />
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
      return !!this.$route.params.id && state.users.user && this.$route.params.id !== state.users.user.id;
    },
    anotherUserProfile: (state) => state.users.userProfile,
    user: (state) => state.users.user,
    personalClaims: (state) => state.claims.personal,
    userId() {
      if (!this.user) {
        return null;
      }
      return this.user.id;
    },
    userToDisplay(state) {
      if (this.isAnotherUserProfile) {
        return state.users.userProfile;
      }
      return state.users.user;
    },
    havePermissionsToEditPermissions: (state) => {
      const permissions = state.permissions.my;
      return permissions && permissions.includes('EDIT_PERMISSIONS');
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
      if (this.isAnotherUserProfile) {
        await this.$store.dispatch('users/getUserProfile', { userId: this.userId });
      } else if (!this.user) {
        await this.$store.dispatch('users/getUser');
      }
      this.$store.dispatch('claims/getClaimsByUserId', { userId: this.userId }).then(() => {
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
