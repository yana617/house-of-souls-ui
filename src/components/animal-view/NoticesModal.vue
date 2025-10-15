<template>
  <a-modal
    :visible="visible"
    :footer="null"
    width="320px"
    @cancel="$emit('onclose')"
  >
    <div v-for="noticeId in noticeIds" :key="noticeId" class="notices-modal__notice">
      <div class="notices-modal__line" />
      <div>
        <p class="notices-modal__notice__title">
          {{ noticesById[noticeId]?.title }}
        </p>
        <p class="notices-modal__notice__description">
          {{ noticesById[noticeId]?.description }}
        </p>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { watch, computed } from 'vue';
import { useStore } from 'vuex';

const { visible } = defineProps({
  visible: Boolean,
});

const store = useStore();

const noticeIds = computed(() => store.state.notices.list);
const noticesById = computed(() => store.state.notices.data);

watch(noticeIds, (newList) => {
  newList.forEach((noticeId) => {
    if (!noticesById[noticeId]) {
      store.dispatch('notices/getNoticeById', { _id: noticeId });
    }
  })
}, { immediate: true });

</script>

<style scoped lang="scss">
$green: #42b983;

.notices-modal {
  &__notice {
    display: flex;
    margin-top: 16px;

    &__title {
      font-weight: 700;
      margin-top: 8px;
    }

    &__description {
      margin-bottom: 12px;
    }
  }

  &__line {
    width: 3px;
    min-width: 3px;
    border-radius: 4px;
    background-color: $green;
    margin-right: 8px;
  }
}
</style>
