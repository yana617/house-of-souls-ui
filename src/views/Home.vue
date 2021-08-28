<template>
  <a-layout style="min-height: 100vh">
    <a-layout-content style="background-color: white">
      <div class="home">
        <Notice v-for="noticeId in notices.list" :key="noticeId" :noticeId="noticeId" v-bind="notices.data[noticeId]" />
        <Schedule v-bind="currentSchedule" @refreshSchedule="loadCurrentSchedule" />
        <Schedule v-bind="nextWeekSchedule" @refreshSchedule="loadNextWeekSchedule" />
      </div>
    </a-layout-content>
    <HistoryActions />
  </a-layout>
  <a-layout-footer>
    <Footer />
  </a-layout-footer>
</template>

<script>
import { mapState } from 'vuex';

import HistoryActions from '@/components/home-view/HistoryActions.vue';
import Footer from '@/components/common/Footer.vue';
import Notice from '@/components/home-view/Notice.vue';
import Schedule from '@/components/home-view/Schedule.vue';
// import { getWeekDatesRange } from '@/utils/date';

export default {
  name: 'Home',
  components: {
    Footer,
    Notice,
    Schedule,
    HistoryActions,
  },
  computed: mapState({
    notices: (state) => state.notices,
    currentSchedule: (state) => state.claim.currentSchedule,
    nextWeekSchedule: (state) => state.claim.nextWeekSchedule,
  }),
  created() {
    this.$store.dispatch('notices/getNotices');

    this.loadCurrentSchedule();
    this.loadNextWeekSchedule();

    this.$store.dispatch('additionalFields/getAdditionalFields');
    this.$store.dispatch('historyActions/getHistoryActions');
  },
  methods: {
    loadCurrentSchedule() {
      // TO-DO remove when backend will work
      // this.$store.dispatch('claim/getSchedule', getWeekDatesRange());
      const fromTimeStamp = new Date('2021-05-03').setHours(0, 0, 0);
      const toTimeStamp = new Date('2021-05-09').setHours(23, 59, 59);
      this.$store.dispatch('claim/getSchedule', { from: fromTimeStamp, to: toTimeStamp });
    },
    loadNextWeekSchedule() {
      // this.$store.dispatch('claim/getNextWeekSchedule', getWeekDatesRange(+1));
      const fromTimeStamp = new Date('2021-05-10').setHours(0, 0, 0);
      const toTimeStamp = new Date('2021-05-16').setHours(23, 59, 59);
      this.$store.dispatch('claim/getNextWeekSchedule', { from: fromTimeStamp, to: toTimeStamp });
    },
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
