<template>
  <div v-if="historyActions" class="history-actions" :class="{ collapsed }">
    <div class="history-actions__sub-container" id="history-actions">
      <div
        v-for="ha in historyActions"
        :key="ha._id"
        class="history-actions__item"
        :class="{ good: isGood(ha.action_type), bad: isBad(ha.action_type) }"
      >
        <span class="history-actions__created-at">{{ parseDateAndTime(ha.createdAt) }}</span>
        <span v-if="!collapsed">
          <span v-if="ha.user_from" class="history-actions__user_from">
            <!-- <b>{{ ha.user_from }}</b> -->
            <b>&nbsp;&nbsp;Яна Сидорова</b>
          </span>
          <span v-if="ha.action_type === 'NEW_USER'"> зарегистрировалась на сайте</span>
          <span v-if="ha.action_type === 'CREATE_CLAIM'"> записалась в график на </span>
          <span v-if="ha.action_type === 'DELETE_CLAIM'"> удалила запись в графике на </span>
          <span v-if="ha.claim_date && ha.claim_type">
            <b> {{ dayOfWeek(ha.claim_date) }} {{ typeOfTime[ha.claim_type].toLowerCase() }}</b>
          </span>
        </span>
      </div>
    </div>
    <div class="history-actions__colapse-icon" @click="collapsed = !collapsed">
      <ArrowLeftOutlined v-if="collapsed" style="font-size: 36px; cursor: pointer" />
      <ArrowRightOutlined v-if="!collapsed" style="font-size: 36px; cursor: pointer" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';

import { typeOfTime, parseDateAndTime } from '@/utils/date';

export default {
  name: 'HistoryAction',
  components: { ArrowLeftOutlined, ArrowRightOutlined },
  data() {
    return {
      collapsed: true,
      parseDateAndTime,
      typeOfTime,
    };
  },
  computed: mapState({
    historyActions: (state) => state.historyActions.list,
  }),
  mounted() {
    this.$socket.on('newAction', (action) => {
      this.$store.dispatch('historyActions/addHistoryAction', action);
    });
  },
  methods: {
    dayOfWeek(date) {
      const options = {
        weekday: 'long',
      };
      return new Date(date).toLocaleDateString('ru-RU', options);
    },
    isGood: (type) => ['CREATE_CLAIM'].includes(type),
    isBad: (type) => ['DELETE_CLAIM'].includes(type),
  },
};
</script>

<style scoped lang="scss">
.history-actions {
  max-height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  background-color: white;
  border-left: 1px solid #ccc;
  position: fixed;
  right: 0;
  width: 300px;
  transition: all 0.2s ease-out;
  padding-bottom: 50px;
  background-color: white;

  &.collapsed {
    width: 80px;
  }

  &__sub-container {
    display: flex;
    flex-direction: column;
    max-height: 85vh;
    overflow-y: auto;
  }

  &__colapse-icon {
    position: absolute;
    right: 16px;
    bottom: 8px;
  }

  &__item {
    padding: 4px 8px;
    border-bottom: 1px solid rgb(221, 221, 221);
    text-align: left;
    font-size: 13px;

    &.good {
      background-color: rgba(218, 247, 166, 0.5);
    }

    &.bad {
      background-color: rgba(255, 106, 106, 0.3);
    }
  }

  &__created-at {
    font-size: 12px;
  }
}
</style>
