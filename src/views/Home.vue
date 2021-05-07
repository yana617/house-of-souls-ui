<template>
  <div class="home">
    <Notice v-for="noticeId in notices.list" :key="noticeId" :noticeId="noticeId" v-bind="notices.data[noticeId]" />
    <Schedule v-bind="currentSchedule" @refreshSchedule="loadCurrentSchedule" />
    <Schedule v-bind="nextWeekSchedule" @refreshSchedule="loadNextWeekSchedule" />
  </div>
  <Footer />
</template>

<script>
import { mapState } from 'vuex';

import Footer from '@/components/common/Footer.vue';
import Notice from '@/components/home-view/Notice.vue';
import Schedule from '@/components/home-view/Schedule.vue';
// import { getPrevMondayString, getNextMondayString, getInTwoWeeksMondayString } from '@/utils/date';

export default {
  name: 'Home',
  components: {
    Footer,
    Notice,
    Schedule,
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
  },
  methods: {
    loadCurrentSchedule() {
      // TO-DO remove when backend will work
      // const nextMondayStr = getNextMondayString();
      // this.$store.dispatch('claim/getSchedule', { from: getPrevMondayString(), to: nextMondayStr });
      this.$store.dispatch('claim/getSchedule', { from: '2021-05-03', to: '2021-05-10' });
    },
    loadNextWeekSchedule() {
      // this.$store.dispatch('claim/getNextWeekSchedule', { from: nextMondayStr, to: getInTwoWeeksMondayString() });
      this.$store.dispatch('claim/getNextWeekSchedule', { from: '2021-05-10', to: '2021-05-17' });
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
