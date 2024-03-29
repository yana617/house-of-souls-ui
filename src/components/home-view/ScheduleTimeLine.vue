<template>
  <div class="schedule-time-line">
    <span class="schedule-time-line__title">{{ title }}</span>
    <div
      v-for="day in schedule"
      :key="day.date"
      class="schedule-time-line__applies"
      :class="{ 'border-top': borderTop }"
    >
      <NoPeople v-if="!day.claims.length" />
      <ScheduleClaim
        v-for="claim in day.claims"
        :key="claim.id"
        class="schedule-time-line__claim"
        :claim="claim"
        @on-claim-click="openApply"
        @on-update-click="openUpdateClaimModal(claim)"
      />
      <Button
        v-if="hasPermissionsToAssign && user && canSubscribe(day.claims)"
        class="schedule-time-line__claim-btn"
        title="Записаться"
        @click="openAssignModal(day.date, day.claims)"
      />
      <Button
        v-if="!hasPermissionToAssignUnregisteredUsers && canUnsubscribe(day.claims)"
        class="schedule-time-line__unsubscribe-btn"
        title="Отписаться"
        @click="unsubscribe(day.claims)"
      />
    </div>
    <ClaimInfoModal
      v-if="claimInfoModalOpen"
      v-bind="selectedClaim"
      @onclose="claimInfoModalOpen = false"
      @refreshSchedule="refreshSchedule"
    />
    <a-modal
      v-model:visible="updateOrCreateModalOpen"
      :footer="null"
      centered
      :afterClose="onClaimModalClose"
      destroyOnClose
    >
      <ClaimModal
        :claim="claimForCreateOrUpdate"
        :mode="mode"
        :canSubscribeYourself="canSubscribeYourself"
        @onclose="onClaimModalClose"
      />
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';
import ScheduleClaim from './ScheduleClaim.vue';
import ClaimInfoModal from './ClaimInfoModal.vue';
import ClaimModal from './ClaimModal.vue';
import NoPeople from './NoPeople.vue';

export default {
  name: 'ScheduleTimeLine',
  components: {
    Button,
    ScheduleClaim,
    ClaimInfoModal,
    ClaimModal,
    NoPeople,
  },
  props: {
    schedule: Array,
    title: String,
    type: String,
    borderTop: Boolean,
    period: String,
  },
  data() {
    return {
      claimInfoModalOpen: false,
      updateOrCreateModalOpen: false,
      selectedClaim: null,
      assignDate: null,
      mode: null,
      claim: {},
      canSubscribeYourself: true,
    };
  },
  computed: mapState({
    user: (state) => state.auth.user,
    permissions: (state) => state.permissions.my,
    hasPermissionToAssignUnregisteredUsers() {
      return this.permissions.includes('CREATE_CLAIM_FOR_UNREGISTERED_USERS');
    },
    hasPermissionsToAssign() {
      const permissions = ['CREATE_CLAIM', 'CREATE_CLAIM_FOR_UNREGISTERED_USERS'];
      return permissions.some((p) => this.permissions.includes(p));
    },
    claimForCreateOrUpdate() {
      if (this.mode === 'create') {
        return { type: this.type, date: this.assignDate };
      }
      return this.claim;
    },
  }),
  methods: {
    openApply(claim) {
      this.claimInfoModalOpen = true;
      this.selectedClaim = claim;
    },
    openAssignModal(date, claims) {
      this.assignDate = date;
      this.mode = 'create';
      this.canSubscribeYourself = true;
      if (this.hasPermissionToAssignUnregisteredUsers) {
        const hasOwnClaims = this.user
          && claims.some((claim) => claim.user.id === this.user.id && !claim.guest_id);
        this.canSubscribeYourself = !hasOwnClaims;
      }
      this.updateOrCreateModalOpen = true;
    },
    openUpdateClaimModal(claim) {
      this.claim = claim;
      this.mode = 'update';
      this.updateOrCreateModalOpen = true;
    },
    canSubscribe(claims) {
      return this.hasPermissionToAssignUnregisteredUsers || !this.canUnsubscribe(claims);
    },
    canUnsubscribe(claims) {
      return this.user && claims.some((claim) => claim.user.id === this.user.id);
    },
    unsubscribe(claims) {
      const userClaim = claims.find((claim) => claim.user.id === this.user.id);
      this.$store.dispatch('app/setLoading', true);
      this.$store
        .dispatch('claims/deleteClaim', { _id: userClaim._id })
        .then(() => {
          this.refreshSchedule();
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false);
        });
    },
    onClaimModalClose() {
      this.updateOrCreateModalOpen = false;
      this.refreshSchedule();
    },
    refreshSchedule() {
      this.$emit('refreshSchedule');
    },
  },
};
</script>

<style scoped lang="scss">
$dayWidth: 160px;
$green: #42b983;
$lightGrey: #ccc;

.schedule-time-line {
  display: flex;

  &__applies {
    display: flex;
    flex-direction: column;
    margin: 0 4px;
    width: $dayWidth;

    &.border-top {
      border-top: 1px solid $lightGrey;
    }
  }

  &__claim {
    display: flex;
    width: $dayWidth;
    font-size: 14px;
    padding: 4px 8px;
    text-align: left;
    border-left: 1px solid $lightGrey;
    border-right: 1px solid $lightGrey;
    border-bottom: 1px solid $lightGrey;
  }

  &__title {
    display: table-cell;
    min-height: 100%;
    min-width: 80px;
    padding-top: 16px;
    font-size: 16px;
  }

  &__claim-btn,
  &__unsubscribe-btn {
    width: $dayWidth;
    margin-top: 6px;
  }

  &__claim-btn {
    color: $green;
    border-color: $green;
    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__unsubscribe-btn {
    color: red;
    border-color: red;
    &:hover {
      background-color: red;
      color: white;
    }
  }
}
</style>
