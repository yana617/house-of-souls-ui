<template>
  <div class="admin">
    <div class="admin__nav-panel">
      <router-link v-for="link in links" :key="link.slug" class="admin__nav-panel__link" :to="link.url">
        {{ link.label }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ADMIN_LINKS } from '@/router/constants';

export default {
  name: 'AdminPanel',
  data() {
    return {
      links: ADMIN_LINKS,
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
$headerHeight: 50px;
$navPanelWidth: 230px;
$lightGrey: #ccc;
$greyBlue: #2c3e50;

.router-link-active {
  color: white !important;
  background-color: #233241;
}

.admin {
  display: flex;
  flex-direction: row;
  padding-left: $navPanelWidth;

  &__nav-panel {
    display: flex;
    flex-direction: column;
    width: $navPanelWidth;
    min-width: $navPanelWidth;
    margin-left: -$navPanelWidth;
    height: calc(100vh - #{$headerHeight});
    border-right: 1px solid $lightGrey;
    background-color: #20242a;
    padding-top: 48px;
    position: fixed;

    &__link {
      display: flex;
      color: rgba(200, 200, 200, 0.7);
      font-size: 14px;
      padding: 12px 16px;
      text-decoration: none;

      &:hover {
        color: $lightGrey;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 0px;

    &__nav-panel {
      display: none;
    }
  }
}
</style>
