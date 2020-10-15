<template>
  <div class="admin">
    <div class="admin__nav-panel">
      <router-link
        class="admin__nav-panel__link"
        to="/admin/volunteers-requests"
      >
        Запросы на волонтерство
      </router-link>
      <router-link
        class="admin__nav-panel__link"
        to="/admin/register-fields-control"
      >
        Управление полями регистрации
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  components: {},
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
}
</style>
