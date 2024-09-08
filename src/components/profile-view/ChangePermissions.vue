<template>
  <div class="change-permissions">
    <span><b>Права предоставляемые ролью пользователя</b></span>
    <br>
    <a-checkbox
      v-for="perm in translatedRolePermissions"
      :key="perm"
      class="change-permissions__item"
      checked
      disabled
    >
      {{ perm.translate }}
    </a-checkbox>
    <br>
    <span><b>Редактируемые</b></span>
    <br>
    <a-checkbox
      v-for="perm in translatedAdditionalPermissions"
      :key="perm"
      class="change-permissions__item"
      :checked="updatedPermissions[perm.name]"
      @change="(e) => onChange(e, perm.name)"
    >
      {{ perm.translate }}
    </a-checkbox>
    <a-checkbox
      v-for="perm in userPermissionsToAdd"
      :key="perm"
      class="change-permissions__item"
      @change="(e) => onChange(e, perm.name)"
    >
      {{ perm.translate }}
    </a-checkbox>
    <br>
    <CommonButton
      :loading="loading"
      class="change-permissions__save-btn"
      title="сохранить"
      @click="updatePermissions"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CommonButton from '@/components/common/CommonButton.vue';

export default {
  name: 'ChangePermissions',
  components: { CommonButton },
  data() {
    return {
      updatedPermissions: {},
      loading: false,
    };
  },
  computed: mapState({
    userId: (state) => state.users.userProfile.id,
    allPermissions: (state) => state.permissions.list || [],
    userRolePermissions: (state) => state.users.permissions.rolePermissions || [],
    userAdditionalPermissions: (state) => state.users.permissions.userPermissions || [],
    userPermissionsToAdd() {
      return this.allPermissions.filter(
        (p) => !this.userAdditionalPermissions.includes(p.name)
          && !this.userRolePermissions.includes(p.name),
      );
    },
    translatedRolePermissions() {
      return this.allPermissions.filter((p) => this.userRolePermissions.includes(p.name));
    },
    translatedAdditionalPermissions() {
      this.userAdditionalPermissions.forEach((p) => {
        this.updatedPermissions[p] = true;
      });
      return this.allPermissions.filter((p) => this.userAdditionalPermissions.includes(p.name));
    },
  }),
  methods: {
    updatePermissions() {
      this.loading = true;
      this.$store
        .dispatch('permissions/updatePermissions', {
          userId: this.userId,
          permissions: this.updatedPermissions,
        })
        .then(() => {
          this.$store.dispatch('users/getUserPermissions', this.userId);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChange(e, name) {
      const { checked } = e.target;
      this.updatedPermissions[name] = checked;
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.change-permissions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 32px;

  &__item {
    margin-left: 0 !important;
    text-align: left;
  }

  &__save-btn {
    color: $green;
    border-color: $green;
    width: 100px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  @media (max-width: 768px) {
    margin: 24px 0px;
  }
  @media (max-width: 350px) {
    margin: 24px 12px;
  }
}
</style>
