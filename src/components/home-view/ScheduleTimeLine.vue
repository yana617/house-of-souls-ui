<template>
  <div class="schedule-time-line">
    <span class="schedule-time-line__title">{{ title }}</span>
    <div
      v-for="day in schedule"
      :key="day.date"
      class="schedule-time-line__applies"
      :class="{ 'border-top': borderTop }"
    >
      <ScheduleClaim
        v-for="claim in day.claims"
        :key="claim.id"
        class="schedule-time-line__claim"
        :claim="claim"
        @on-claim-click="openApply"
        @on-update-click="openUpdateClaimModal(claim)"
      />
      <Button
        v-if="havePermissionsToAssign && user && !canUnsubscribe(day.claims)"
        class="schedule-time-line__claim-btn"
        title="Записаться"
        @click="openAssignModal(day.date)"
      />
      <Button
        v-if="canUnsubscribe(day.claims)"
        class="schedule-time-line__unsubscribe-btn"
        title="Отписаться"
        @click="unsubscribe(day.claims)"
      />
      <span v-if="showNoClaims(day.claims.length)" class="schedule-time-line__no-assigned"> Никто не записан </span>
    </div>
    <ClaimInfoModal v-if="claimInfoModalOpen" v-bind="selectedClaim" @onclose="claimInfoModalOpen = false" />
    <ClaimModal v-if="claimModalOpen" :claim="claimForCreateOrUpdate" :mode="mode" @onclose="onClaimModalClose" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';
import ScheduleClaim from './ScheduleClaim.vue';
import ClaimInfoModal from './ClaimInfoModal.vue';
import ClaimModal from './ClaimModal.vue';

export default {
  name: 'ScheduleTimeLine',
  components: {
    Button,
    ScheduleClaim,
    ClaimInfoModal,
    ClaimModal,
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
      claimModalOpen: false,
      selectedClaim: null,
      assignDate: null,
      mode: null,
      claim: {},
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
    havePermissionsToAssign: (state) => {
      const permissions = state.permissions.my;
      return permissions && permissions.includes('CREATE_CLAIM');
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
    openAssignModal(date) {
      this.assignDate = date;
      this.mode = 'create';
      this.claimModalOpen = true;
    },
    openUpdateClaimModal(claim) {
      this.claim = claim;
      this.mode = 'update';
      this.claimModalOpen = true;
    },
    canUnsubscribe(claims) {
      return this.user && claims.some((claim) => claim.user._id === this.user._id);
    },
    unsubscribe(claims) {
      const userClaim = claims.find((claim) => claim.user._id === this.user._id);
      this.$store.dispatch('app/setLoading', true);
      this.$store.dispatch('claims/deleteClaim', { _id: userClaim._id }).then(() => {
        this.$store.dispatch('app/setLoading', false);
        this.$emit('refreshSchedule');
      });
    },
    onClaimModalClose() {
      this.claimModalOpen = false;
      this.$emit('refreshSchedule');
    },
    showNoClaims(claimsCount) {
      return !claimsCount && (!this.user || !this.havePermissionsToAssign);
    },
  },
};
</script>

<style scoped lang="scss">
$dayWidth: 160px;
$green: #42b983;
$lightGrey: #ccc;
$redBlack: rgb(50, 0, 0);

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
    padding: 4px;
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
    margin-top: 4px;
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

  &__no-assigned {
    font-size: 14px;
    margin-top: 8px;
    color: $redBlack;
    width: $dayWidth;
  }
}
</style>
