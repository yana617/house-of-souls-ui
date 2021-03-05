<template>
  <div v-if="haveTypeData" class="schedule-time-line">
    <span class="schedule-time-line__title">{{ title }}</span>
    <div
      v-for="day in schedule"
      :key="day.date"
      class="schedule-time-line__applies"
      :class="{'border-top': borderTop}"
    >
      <ScheduleClaim
        v-for="claim in day[type]"
        :key="claim.id"
        class="schedule-time-line__claim"
        :claim="claim"
        @on-claim-click="openApply"
      />
      <Button class="schedule-time-line__claim-btn" title="Записаться" />
    </div>
    <ClaimInfoModal v-if="claimInfoModalOpen" v-bind="selectedClaim" @onclose="claimInfoModalOpen = false" />
  </div>
</template>

<script>
import Button from '../common/Button.vue';
import ScheduleClaim from './ScheduleClaim.vue';
import ClaimInfoModal from './ClaimInfoModal.vue';

export default {
  name: 'ScheduleTimeLine',
  components: { Button, ScheduleClaim, ClaimInfoModal },
  props: {
    schedule: Array,
    title: String,
    type: String,
    borderTop: Boolean,
  },
  data() {
    return {
      claimInfoModalOpen: false,
      selectedClaim: null,
    };
  },
  computed: {
    haveTypeData() {
      return this.schedule.every((day) => !!day[this.type]);
    },
  },
  methods: {
    openApply(claim) {
      this.claimInfoModalOpen = true;
      this.selectedClaim = claim;
    },
  },
};
</script>

<style scoped lang="scss">
$dayWidth: 160px;

.schedule-time-line {
  display: flex;

  &__applies {
    display: flex;
    flex-direction: column;
    margin: 0 4px;
    width: $dayWidth;

    &.border-top {
      border-top: 1px solid #ccc;
    }
  }

  &__claim {
    display: flex;
    width: $dayWidth;
    font-size: 14px;
    padding: 4px;
    text-align: left;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  &__title {
    display: table-cell;
    min-height: 100%;
    min-width: 80px;
    padding-top: 16px;
  }

  &__claim-btn {
    width: $dayWidth;
    color: #42b983;
    border-color: #42b983;
    margin-top: 4px;
    &:hover {
      background-color: #42b983;
      color: white;
    }
  }
}
</style>
