<template>
  <a-layout>
    <a-layout-content
      class="home__layout-content"
      :class="{ 'home__layout-content__padding': hasPermissions('CREATE_CLAIM') }"
    >
      <div class="home">
        <Notice
          v-for="noticeId in noticesToShow"
          :key="noticeId"
          :noticeId="noticeId"
          v-bind="notices.data[noticeId]"
        />
        <button @click="showAllNotices = !showAllNotices" class="home__notices__load-all-btn">
          {{ loadNoticesBtnTitle }}
        </button>
        <Schedule v-bind="currentSchedule" @refreshSchedule="loadCurrentSchedule" />
        <Schedule v-bind="nextWeekSchedule" @refreshSchedule="loadNextWeekSchedule" />
      </div>
    </a-layout-content>
    <HistoryActions v-if="hasPermissions('CREATE_CLAIM')" />
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
import { getToken } from '@/utils/sessionStorage';
import { getWeekDatesRange } from '@/utils/date';

const DEFAULT_NOTICES_TO_SHOW_COUNT = 2;

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
    user: (state) => state.auth.user,
    currentSchedule: (state) => state.claims.currentSchedule,
    nextWeekSchedule: (state) => state.claims.nextWeekSchedule,
    permissions: (state) => state.permissions.my,

    noticesToShow() {
      if (!this.showAllNotices) {
        return this.notices.list.slice(0, DEFAULT_NOTICES_TO_SHOW_COUNT);
      }
      return this.notices.list;
    },
    loadNoticesBtnTitle() {
      return this.showAllNotices ? 'Свернуть' : 'Показать все записи';
    },
  }),
  data() {
    return {
      showAllNotices: false,
    };
  },
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
    hasPermissions(permission) {
      return this.permissions.includes(permission);
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.loadCurrentSchedule();
        this.loadNextWeekSchedule();
      }
    },
  },
};
</script>

<style scoped lang="scss">
$headerHeight: 50px;
$footerHeight: 70px;
$footerHeightMobile: 90px;
$mediumBlue: #3682f3;

.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - #{$headerHeight + $footerHeight});
  padding-bottom: 16px;

  &__layout-content {
    background-color: white;

    &__padding {
      padding-right: 80px;
    }
  }

  &__notices {
    &__load-all-btn {
      margin: 8px 8px 8px auto;
      border: none;
      background-color: white;
      color: $mediumBlue;
      text-decoration: underline;
      cursor: pointer;
      font-size: 15px;
      letter-spacing: 0.1px;
      &:hover {
        color: blue;
      }
    }
  }

  @media (max-width: 500px) {
    min-height: calc(100vh - #{$headerHeight + $footerHeightMobile});
  }

  @media (max-width: 450px) {
    &__layout-content {
      &__padding {
        padding-right: 0;
      }
    }
  }
}
</style>
