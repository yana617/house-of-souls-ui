<template>
  <div class="home">
    <Info v-for="info in infos" :key="info.title" v-bind="info" />
    <Schedule :schedule="currentSchedule" />
    <Schedule :schedule="nextWeekSchedule" />
  </div>
  <Footer />
</template>

<script>
import {
  mapState,
} from 'vuex';

import Footer from '../components/Footer.vue';
import Info from '../components/Info.vue';
import Schedule from '../components/Schedule.vue';

export default {
  name: 'Home',
  components: {
    Footer,
    Info,
    Schedule,
  },
  computed: mapState({
    infos: (state) => state.info.actualInfo,
    currentSchedule: (state) => state.schedule.current,
    nextWeekSchedule: (state) => state.schedule.nextWeek,
  }),
  created() {
    this.$store.dispatch('info/getInfo');

    const prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
    const nextMonday = new Date();
    nextMonday.setDate(prevMonday.getDate() + 7);
    const prevMondayStr = prevMonday.toISOString().slice(0, 10);
    const nextMondayStr = nextMonday.toISOString().slice(0, 10);
    this.$store.dispatch('schedule/getSchedule', { from: prevMondayStr, to: nextMondayStr });

    const inTwoWeeksMonday = new Date();
    inTwoWeeksMonday.setDate(nextMonday.getDate() + 7);
    const inTwoWeeksMondayStr = inTwoWeeksMonday.toISOString().slice(0, 10);
    this.$store.dispatch('schedule/getNextWeekSchedule', { from: nextMondayStr, to: inTwoWeeksMondayStr });

    this.$store.dispatch('users/getAdditionalFields');
  },
};
</script>

<style scoped lang="scss">
$headerHeight: 50px;
$footerHeight: 60px;
$footerHeightMobile: 90px;

.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - #{$headerHeight + $footerHeight});
  padding-bottom: 16px;
  @media (max-width: 500px) {
    min-height: calc(100vh - #{$headerHeight + $footerHeightMobile});
  }
}
</style>
