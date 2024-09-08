<template>
  <a-layout>
    <a-layout-content
      class="home__layout-content"
      :class="{ 'home__layout-content__padding': hasPermissions('CREATE_CLAIM') }"
    >
      <div class="home">
        <HomeNotice
          v-for="noticeId in noticesToShow"
          :key="noticeId"
          :notice-id="noticeId"
          v-bind="notices.data[noticeId]"
        />
        <button
          v-if="showLoadAllNoticesBtn"
          type="button"
          class="home__notices__load-all-btn"
          @click="showAllNotices = !showAllNotices"
        >
          {{ loadNoticesBtnTitle }}
        </button>
        <Schedule v-bind="currentSchedule" @refresh-schedule="loadCurrentSchedule" />
        <Schedule v-bind="nextWeekSchedule" @refresh-schedule="loadNextWeekSchedule" />
      </div>
    </a-layout-content>
    <HistoryActions v-if="hasPermissions('CREATE_CLAIM')" />
  </a-layout>
  <a-layout-footer>
    <CommonFooter />
  </a-layout-footer>
</template>

<script>
import { mapState } from 'vuex';

import HistoryActions from '@/components/home-view/HistoryActions.vue';
import CommonFooter from '@/components/common/CommonFooter.vue';
import HomeNotice from '@/components/home-view/HomeNotice.vue';
import Schedule from '@/components/home-view/Schedule.vue';
import { getToken } from '@/utils/sessionStorage';
import { getWeekDatesRange } from '@/utils/date';

const DEFAULT_NOTICES_TO_SHOW_COUNT = 2;

export default {
  name: 'Home',
  components: {
    CommonFooter,
    HomeNotice,
    Schedule,
    HistoryActions,
  },
  data() {
    return {
      showAllNotices: false,
    };
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
    showLoadAllNoticesBtn() {
      return this.notices.list.length > DEFAULT_NOTICES_TO_SHOW_COUNT;
    },
    loadNoticesBtnTitle() {
      return this.showAllNotices ? 'Свернуть' : 'Показать все записи';
    },
  }),
  watch: {
    user() {
      if (this.user) {
        this.loadCurrentSchedule();
        this.loadNextWeekSchedule();
      }
    },
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
