<template>
  <div v-if="schedule" class="schedule">
    <div class="schedule__dates-info">с {{ from }} по {{ to }}</div>
    <div class="schedule__container">
      <div class="schedule__sub-container">
        <div class="schedule__line">
          <div style="min-width: 80px"></div>
          <span v-for="day in schedule" :key="day.date" class="schedule__date">
            {{ dayOfWeek(day.date) }}
          </span>
        </div>
        <ScheduleTimeLine title="УТРО" type="morning" :schedule="schedule" />
        <ScheduleTimeLine class="schedule__evening" title="ВЕЧЕР" type="evening" borderTop :schedule="schedule" />
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleTimeLine from './ScheduleTimeLine.vue';
import { daysOfWeek, parseDate } from '../utils/date';

export default {
  name: 'Schedule',
  components: { ScheduleTimeLine },
  props: {
    schedule: Array,
  },
  computed: {
    from() {
      if (!this.schedule || !this.schedule.length) return '';
      return parseDate(this.schedule[0].date);
    },
    to() {
      if (!this.schedule || !this.schedule.length) return '';
      return parseDate(this.schedule[this.schedule.length - 1].date);
    },
  },
  methods: {
    dayOfWeek(date) {
      const dayOfWeekNumber = new Date(date).getDay();
      return daysOfWeek[dayOfWeekNumber];
    },
  },
};
</script>

<style scoped lang="scss">
$dayWidth: 160px;

.schedule {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;

  &__dates-info {
    background-color: rgb(247, 200, 101);
    width: 100%;
    color: black;
    padding: 8px;
  }

  &__container {
    display: flex;
    width: fit-content;
    max-width: 100%;
    padding: 0 8px;
  }

  &__sub-container {
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 100%;
    overflow-y: scroll;
  }

  &__line {
    display: flex;
  }

  &__evening {
    margin-top: 32px;
  }

  &__date {
    display: flex;
    min-width: $dayWidth;
    margin: 0 4px;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 8px;
    width: $dayWidth;
    background-color: rgba(247, 201, 101, 0.1);
    text-align: center;
  }
}
</style>
