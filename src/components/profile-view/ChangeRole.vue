<template>
  <div v-if="userRole" class="change-role">
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
    <Button :loading="loading" class="change-role__save-btn" title="сохранить" @click="updateRole" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';

export default {
  name: 'ChangeRole',
  components: { Button },
  data() {
    return {
      updatedRole: null,
      loading: false,
    };
  },
  computed: mapState({
    allRoles: (state) => state.roles.list || [],
    userRole: (state) => state.users.userProfile.role,
    userId: (state) => state.users.userProfile.id,
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
    async updateRole() {
      this.loading = true;
      await this.$store.dispatch('users/updateRole', { userId: this.userId, role: this.updatedRole }).then(() => {
        this.$store.dispatch('users/getUserPermissions', this.userId);
        this.$store.dispatch('users/getUserProfile', { userId: this.userId });
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.change-role {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 32px;

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
