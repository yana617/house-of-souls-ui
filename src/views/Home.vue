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
import { getToken } from '@/utils/sessionStorage';
import { getWeekDatesRange } from '@/utils/date';

export default {
  name: 'Home',
  components: {
    Footer,
    Notice,
    Schedule,
  },
  computed: mapState({
    notices: (state) => state.notices,
    currentSchedule: (state) => state.claims.currentSchedule,
    nextWeekSchedule: (state) => state.claims.nextWeekSchedule,
  }),
  async created() {
    if (!!getToken() && !this.user) {
      this.$store.dispatch('users/getUser');
    }
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('notices/getNotices');

    await this.loadCurrentSchedule();
    await this.loadNextWeekSchedule();

    this.$store.dispatch('app/setLoading', false);

    this.$store.dispatch('additionalFields/getAdditionalFields');
  },
  methods: {
    async loadCurrentSchedule() {
      await this.$store.dispatch('claims/getSchedule', getWeekDatesRange());
    },
    async loadNextWeekSchedule() {
      await this.$store.dispatch('claims/getNextWeekSchedule', getWeekDatesRange(+1));
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
