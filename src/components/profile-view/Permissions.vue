<template>
  <div class="permissions">
    <div class="permissions__form">
      <div class="permissions__sub-container">
        <span><b>Права предоставляемые ролью пользователя</b></span>
        <br />
        <a-checkbox class="permissions__item" v-for="perm in translatedRolePermissions" :key="perm" checked disabled>
          {{ perm.translate }}
        </a-checkbox>
        <br />
        <span><b>Редактируемые</b></span>
        <br />
        <a-checkbox
          class="permissions__item"
          v-for="perm in translatedAdditionalPermissions"
          :key="perm"
          :checked="updatedPermissions[perm.name]"
          @change="(e) => onChange(e, perm.name)"
        >
          {{ perm.translate }}
        </a-checkbox>
        <a-checkbox
          class="permissions__item"
          v-for="perm in userPermissionsToAdd"
          :key="perm"
          @change="(e) => onChange(e, perm.name)"
        >
          {{ perm.translate }}
        </a-checkbox>
        <br />
        <Button class="permissions__save-btn" title="сохранить" @click="updatePermissions" />
      </div>
      <hr class="permissions__line" />
      <div class="permissions__sub-container">
        <span><b>Роль пользователя</b></span>
        <br />
        <span>{{ transtatedUserRole?.translate }}</span>
        <br />
        <span><b>Поменять роль</b></span>
        <br />
        <a-select
          placeholder="Выберите роль"
          ref="select"
          v-model:value="updatedRole"
          style="width: 300px"
          :options="roles"
        >
        </a-select>
        <br />
        <Button class="permissions__save-btn" title="сохранить" @click="updateRole" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';

export default {
  name: 'Permissions',
  components: { Button },
  props: {
    userId: String,
    userRole: String,
  },
  data() {
    return {
      updatedRole: null,
      updatedPermissions: {},
    };
  },
  created() {
    this.loadAllPermissions();
  },
  computed: mapState({
    allPermissions: (state) => state.permissions.list || [],
    allRoles: (state) => state.roles.list || [],
    userRolePermissions: (state) => state.users.permissions.rolePermissions,
    userAdditionalPermissions: (state) => state.users.permissions.userPermissions,
    userPermissionsToAdd() {
      return this.allPermissions.filter(
        (p) => !this.userAdditionalPermissions.includes(p.name) && !this.userRolePermissions.includes(p.name),
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
    roles() {
      return this.allRoles.map((role) => ({
        label: role.translate,
        value: role.name,
        disabled: role.name === this.userRole,
      }));
    },
    transtatedUserRole() {
      return this.allRoles.find((role) => role.name === this.userRole);
    },
  }),
  methods: {
    updatePermissions() {
      this.$store.dispatch('permissions/updatePermissions', {
        userId: this.userId,
        permissions: this.updatedPermissions,
      });
    },
    updateRole() {
      this.$store.dispatch('users/updateRole', { userId: this.userId, role: this.updatedRole }).then(() => {
        this.loadAllPermissions();
      });
    },
    loadAllPermissions() {
      this.$store.dispatch('users/getUserPermissions');
      this.$store.dispatch('permissions/getPermissions');
      this.$store.dispatch('roles/getRoles');
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

.permissions {
  display: flex;
  justify-content: center;
  padding: 10px 0 20px 0;

  &__item {
    margin-left: 0 !important;
  }

  &__form {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__sub-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 32px;
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

  &__line {
    height: 100%;
  }

  @media (max-width: 768px) {
    &__form {
      flex-direction: column;
    }

    &__sub-container {
      margin: 24px 0px;
    }

    &__line {
      height: unset;
      width: 100%;
    }
  }
  @media (max-width: 350px) {
    &__sub-container {
      margin: 24px 12px;
    }
  }
}
</style>
