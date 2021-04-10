<template>
  <div v-if="user" class="profile">
    <div class="profile__header">
      <a :href="`tel:${user.phone}`"><Button class="profile__call-btn" title="позвонить" /></a>
      <div class="profile__main-data-container">
        <div class="profile__img-container">
          <img class="profile__img" src="@/assets/cat_infos.jpeg" />
        </div>
        <div class="profile__name-phone-container">
          <span class="profile__name">{{ user.name }} {{ user.surname }}</span>
          <span class="profile__phone">+{{ user.phone }}</span>
          <span class="profile__visits"><b>20</b> посещений</span>
        </div>
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Посещения">
        <Visit />
        <Visit />
        <Visit />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Личные данные">
        <ProfileForm :userId="user._id" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';

import Visit from '@/components/profile-view/Visit.vue';
import ProfileForm from '@/components/profile-view/ProfileForm.vue';
import Button from '@/components/common/Button.vue';

export default {
  name: 'Profile',
  components: { Visit, ProfileForm, Button },
  data() {
    return {
      activeKey: ref('1'),
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
  }),
};
</script>

<style scoped lang="scss">
.profile {
  &__header {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: rgba(66, 185, 131, 1);
    position: relative;
    max-width: 100%;
    color: black;
    background-position: 0% 65%;
    background-size: cover;
    background-image: url('~@/assets/profile-background.jpeg');
  }
  &__main-data-container {
    position: absolute;
    bottom: 20px;
    left: 10%;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.4);
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

  &__call-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: rgba(24, 144, 255, 0.7);
  }

  @media (max-width: 768px) {
    &__header {
      background-position: center;
    }
    &__main-data-container {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
