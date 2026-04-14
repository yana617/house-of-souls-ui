<template>
  <a-layout>
    <BirthdayConfetti />
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
          :animal-name="animalsShort[notices.data[noticeId]?.animal_id]?.name"
          :animal-photo="animalsShort[notices.data[noticeId]?.animal_id]?.photo"
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

<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import HistoryActions from '@/components/home-view/HistoryActions.vue';
import CommonFooter from '@/components/common/CommonFooter.vue';
import HomeNotice from '@/components/home-view/HomeNotice.vue';
import Schedule from '@/components/home-view/Schedule.vue';
import { getWeekDatesRange } from '@/utils/date';
import BirthdayConfetti from '@/components/home-view/BirthdayConfetti.vue';

const DEFAULT_NOTICES_TO_SHOW_COUNT = 2;

const store = useStore();

const showAllNotices = ref(false);

const notices = computed(() => store.state.notices);
const user = computed(() => store.state.auth.user);
const currentSchedule = computed(() => store.state.claims.currentSchedule);
const nextWeekSchedule = computed(() => store.state.claims.nextWeekSchedule);
const permissions = computed(() => store.state.permissions.my);
const animalsShort = computed(() => {
  const animals = store.state.animals.shortList || [];
  return animals.reduce((acc, animal) => ({ ...acc, [animal.id]: animal }), {});
});

const noticesToShow = computed(() => {
  if (!showAllNotices.value) {
    return notices.value.list.slice(0, DEFAULT_NOTICES_TO_SHOW_COUNT);
  }
  return notices.value.list;
});
const showLoadAllNoticesBtn = computed(
  () => notices.value.list.length > DEFAULT_NOTICES_TO_SHOW_COUNT,
);
const loadNoticesBtnTitle = computed(() =>
  showAllNotices.value ? 'Свернуть' : 'Показать все записи',
);

const loadCurrentSchedule = async () => {
  await store.dispatch('claims/getSchedule', getWeekDatesRange());
};

const loadNextWeekSchedule = async () => {
  await store.dispatch('claims/getNextWeekSchedule', getWeekDatesRange(+1));
};

const hasPermissions = (permission) => {
  return permissions.value.includes(permission);
};

watch(user, (newUser) => {
  if (newUser) {
    loadCurrentSchedule();
    loadNextWeekSchedule();
  }
});

onMounted(async () => {
  store.dispatch('app/setLoading', true);

  store.dispatch('notices/getNotices');

  await loadCurrentSchedule();
  await loadNextWeekSchedule();

  store.dispatch('app/setLoading', false);

  store.dispatch('additionalFields/getAdditionalFields');
  store.dispatch('animals/getAnimalsShort');
});
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
      margin: 8px auto 8px 8px;
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
