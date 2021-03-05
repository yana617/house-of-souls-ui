<template>
  <div class="notices-control">
    <span id="title">Информационные блоки</span>
    <Notice v-for="notice in notices" :key="notice.title" v-bind="notice" />
    <Button class="notices-control__add-btn" title="добавить новость" @click="openModal" />
    <NewNoticeModal v-if="isModalOpen" />
  </div>
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
    notices: (state) => state.notices.actualNotices,
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
.notices-control {
  width: 100%;
  padding: 16px;
  background-color: rgb(240, 240, 240);

  &__add-btn {
    color: #42b983;
    border-color: #42b983;
    background-color: white;
    padding: 8px 16px;
    font-size: 16px;

    &:hover {
      background-color: #42b983;
      color: white;
    }
  }
}
</style>
