<template>
  <div class="notices-control">
    <span class="notices-control__title">Информационные блоки</span>
    <Notice v-for="noticeId in notices.list" :key="noticeId" v-bind="notices.data[noticeId]" :noticeId="noticeId" />
    <Button class="notices-control__add-btn" title="добавить" @click="openModal" />
    <NewNoticeModal v-if="isModalOpen" />
  </div>
  <img class="notices-control__img" src="@/assets/cat_infos.jpeg" />
</template>

<script>
import { mapState } from 'vuex';

import { MODAL } from '@/utils/constants';
import Notice from '@/components/notices-control-view/Notice.vue';
import Button from '@/components/common/Button.vue';
import NewNoticeModal from '@/components/notices-control-view/NewNoticeModal.vue';

export default {
  name: 'NoticesControl',
  components: { Notice, Button, NewNoticeModal },
  computed: mapState({
    notices: (state) => state.notices,
    modal: (state) => state.app.modal,
    isModalOpen() {
      return this.modal === MODAL.NOTICE;
    },
  }),
  created() {
    this.$store.dispatch('notices/getNotices');
  },
  methods: {
    openModal() {
      this.$store.dispatch('app/setModal', MODAL.NOTICE);
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;
$darkGreen: #3ba675;

.notices-control {
  width: 100%;
  margin-right: 430px;
  padding: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;

  &__title {
    display: flex;
    align-self: center;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  &__add-btn {
    color: $green;
    background-color: white;
    border-color: $green;
    padding: 8px 16px;
    font-size: 16px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__img {
    max-height: calc(100vh - 50px);
    position: fixed;
    width: 430px;
    top: 50px;
    right: 0;
  }

  @media (max-width: 1100px) {
    margin-right: 0;

    &__img {
      display: none;
    }
  }

  @media (max-width: 400px) {
    padding: 8px;
  }
}
</style>
