<template>
  <div class="home">
    <Info v-for="info in infos" :key="info.title" v-bind="info" />
    <Schedule :schedule="currentSchedule" />
    <Schedule :schedule="nextWeekSchedule" />
  </div>
  <Footer />
</template>

<script>
import { mapState } from 'vuex';

import Footer from '@/components/common/Footer.vue';
import Info from '@/components/home-view/Info.vue';
import Schedule from '@/components/home-view/Schedule.vue';
import { getPrevMondayString, getNextMondayString, getInTwoWeeksMondayString } from '@/utils/date';

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

    const nextMondayStr = getNextMondayString();
    this.$store.dispatch('schedule/getSchedule', { from: getPrevMondayString(), to: nextMondayStr });
    this.$store.dispatch('schedule/getNextWeekSchedule', { from: nextMondayStr, to: getInTwoWeeksMondayString() });

    this.$store.dispatch('additionalFields/getAdditionalFields');
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
