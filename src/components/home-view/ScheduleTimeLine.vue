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
      />
      <Button v-if="user" class="schedule-time-line__claim-btn" title="Записаться" @click="openAssignModal(day.date)" />
      <span v-if="!user && !day.claims.length" class="schedule-time-line__no-assigned">
        Никто не записан
      </span>
    </div>
    <ClaimInfoModal v-if="claimInfoModalOpen" v-bind="selectedClaim" @onclose="claimInfoModalOpen = false" />
    <ScheduleAssignModal
      v-if="scheduleAssignModalOpen"
      :type="type"
      :date="assignDate"
      @onclose="scheduleAssignModalOpen = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';
import ScheduleClaim from './ScheduleClaim.vue';
import ClaimInfoModal from './ClaimInfoModal.vue';
import ScheduleAssignModal from './ScheduleAssignModal.vue';

export default {
  name: 'ScheduleTimeLine',
  components: {
    Button,
    ScheduleClaim,
    ClaimInfoModal,
    ScheduleAssignModal,
  },
  props: {
    schedule: Array,
    title: String,
    type: String,
    borderTop: Boolean,
  },
  data() {
    return {
      claimInfoModalOpen: false,
      scheduleAssignModalOpen: false,
      selectedClaim: null,
      assignDate: null,
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
  }),
  methods: {
    openApply(claim) {
      this.claimInfoModalOpen = true;
      this.selectedClaim = claim;
    },
    openAssignModal(date) {
      this.assignDate = date;
      this.scheduleAssignModalOpen = true;
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

  &__claim-btn {
    width: $dayWidth;
    color: $green;
    border-color: $green;
    margin-top: 4px;
    &:hover {
      background-color: $green;
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
