<template>
  <div class="admin">
    <div class="admin__dropdown-container">
      <Dropdown class="admin__dropdown" :items="links" :selected="selected" />
    </div>
    <div class="admin__nav-panel">
      <router-link
        v-for="link in links"
        :key="link.slug"
        class="admin__nav-panel__link"
        :to="link.url"
      >
        {{ link.label }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import { ADMIN_LINKS, PATHS } from '../router/constants';

export default {
  name: 'AdminPanel',
  components: { Dropdown },
  data() {
    return {
      links: ADMIN_LINKS,
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    selected() {
      return PATHS[this.path] || null;
    },
  },
};
</script>

<style lang="scss" scoped>
$headerHeight: 50px;

.router-link-active {
  background-color: #42b983;
}

.admin {
  display: flex;
  flex-direction: row;

  &__nav-panel {
    display: flex;
    flex-direction: column;
    width: 260px;
    height: calc(100vh - #{$headerHeight});
    border-right: 1px solid #ccc;
    background-color: #2c3e50;

    &__link {
      display: flex;
      color: white;
      font-size: 14px;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.2);
      text-decoration: none;
    }
  }

  &__dropdown-container {
    display: none;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    &__nav-panel {
      display: none;
    }

    &__dropdown-container {
      display: flex;
      background-color: #2c3e50;
      width: 100%;
      padding: 8px;
      align-items: center;
      justify-content: center;
    }

    &__dropdown {
      width: fit-content;
      min-width: 300px;
    }
  }
  @media (max-width: 450px) {
    &__dropdown {
      min-width: 210px;
      margin-left: 90px;
    }
  }
}
</style>
