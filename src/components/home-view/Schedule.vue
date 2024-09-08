<template>
  <div v-if="claims" class="schedule">
    <div class="schedule__dates-info">
      с {{ fromDate }} по {{ toDate }}
    </div>
    <div class="schedule__container">
      <div class="schedule__sub-container">
        <div class="schedule__line">
          <div style="min-width: 80px" />
          <span v-for="day in claims" :key="day.date" class="schedule__date">
            <span class="schedule__date__sub-container">
              {{ dayOfWeek(day.date) }}
              <span class="schedule__date__numeric">{{ parseDate(day.date) }}</span>
            </span>
          </span>
        </div>
        <ScheduleTimeLine
          title="УТРО"
          type="morning"
          :schedule="morningSchedule"
          @refresh-schedule="refreshSchedule"
        />
        <ScheduleTimeLine
          class="schedule__evening"
          title="ВЕЧЕР"
          type="evening"
          border-top
          :schedule="eveningSchedule"
          @refresh-schedule="refreshSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { daysOfWeek, parseDate } from '@/utils/date';
import ScheduleTimeLine from './ScheduleTimeLine.vue';

export default {
  name: 'Schedule',
  components: { ScheduleTimeLine },
  props: {
    from: String,
    to: String,
    claims: Array,
  },
  emits: ['refresh-schedule'],
  computed: {
    morningSchedule() {
      return this.claims.map((day) => ({ date: day.date, claims: day.morning }));
    },
    eveningSchedule() {
      return this.claims.map((day) => ({ date: day.date, claims: day.evening }));
    },
    fromDate() {
      return parseDate(this.from);
    },
    toDate() {
      return parseDate(this.to);
    },
  },
  methods: {
    dayOfWeek(date) {
      const dayOfWeekNumber = new Date(date).getDay();
      return daysOfWeek[dayOfWeekNumber];
    },
    parseDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' });
    },
    refreshSchedule() {
      this.$emit('refresh-schedule');
    },
  },
};
</script>

<style scoped lang="scss">
$dayWidth: 160px;
$lightGrey: rgb(230, 230, 230);
$lightBlue: #d0e1f9;

.schedule {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  line-height: 1.15;

  &__dates-info {
    background-color: $lightBlue;
    width: 100%;
    color: black;
    padding: 8px;
    font-size: 16px;
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
    border-left: 1px solid $lightGrey;
    border-right: 1px solid $lightGrey;
    border-bottom: 1px solid $lightGrey;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 8px;
    width: $dayWidth;
    background-color: white;
    text-align: center;
    font-size: 16px;
    flex-wrap: nowrap;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0 ,0, 0.05);

    &__sub-container {
      margin: auto;
    }
  }
}
</style>
