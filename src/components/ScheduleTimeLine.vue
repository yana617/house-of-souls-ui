<template>
  <div v-if="haveTypeData" class="schedule-time-line">
    <span class="schedule-time-line__title">{{ title }}</span>
    <div
      v-for="day in schedule"
      :key="day.date"
      :class="`schedule-time-line__applies ${borderTop ? 'border-top' : ''}`"
    >
      <ScheduleApply
        v-for="apply in day[type]"
        :key="apply.apply_id"
        class="schedule-time-line__apply"
        :apply="apply"
      />
      <Button class="schedule-time-line__apply-btn" title="Записаться" />
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import ScheduleApply from './ScheduleApply.vue';

export default {
  name: 'ScheduleTimeLine',
  components: { Button, ScheduleApply },
  props: {
    schedule: Array,
    title: String,
    type: String,
    borderTop: Boolean,
  },
  computed: {
    haveTypeData() {
      return this.schedule.every((day) => !!day[this.type]);
    },
  },
};
</script>

<style scoped lang="scss">
$dayWidth: 170px;

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

  &__apply {
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

  &__apply-btn {
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
