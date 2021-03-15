<template>
  <div class="notices-control">
    <span class="notices-control__title">Информационные блоки</span>
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
$green: #42b983;
$darkGreen: #3ba675;

.notices-control {
  width: 100%;
  padding: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;

  &__title {
    display: flex;
    align-self: center;
    font-size: 18px;
    margin-bottom: 8px;
  }

  &__add-btn {
    color: white;
    background-color: $green;
    border-color: $green;
    padding: 8px 16px;
    font-size: 16px;

    &:hover {
      background-color: $darkGreen;
      color: white;
    }
  }
}
</style>
