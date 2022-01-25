<template>
  <div class="permissions_and_roles">
    <div class="permissions_and_roles__form">
      <ChangePermissions />
      <hr class="permissions_and_roles__line" />
      <ChangeRole />
    </div>
  </div>
</template>

<script>
import ChangeRole from './ChangeRole.vue';
import ChangePermissions from './ChangePermissions.vue';

export default {
  name: 'PermissionsAndRoles',
  components: { ChangeRole, ChangePermissions },
  props: {
    userId: String,
  },
  async created() {
    this.$store.dispatch('app/setLoading', true);
    await this.loadAll();
    this.$store.dispatch('app/setLoading', false);
  },
  methods: {
    async loadAll() {
      await this.$store.dispatch('users/getUserPermissions', this.userId);
      await this.$store.dispatch('permissions/getPermissions');
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.permissions_and_roles {
  display: flex;
  justify-content: center;
  padding: 10px 0 20px 0;

  &__form {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__line {
    height: 100%;
  }

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;

    &__form {
      flex-direction: column;
    }
    &__line {
      height: unset;
      width: 100%;
    }
  }
}
</style>
