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
            <b>&nbsp;&nbsp;{{ ha.user_from.name }} {{ ha.user_from.surname }}</b>
          </span>
          <span v-if="ha.action_type === 'NEW_USER'">&nbsp;зарегистрировалась на сайте</span>
          <span v-if="ha.action_type === 'CREATE_CLAIM'">&nbsp;записалась в график на </span>
          <span v-if="ha.action_type === 'DELETE_CLAIM'">&nbsp;удалила запись в графике на </span>
          <span v-if="ha.action_type === 'ADMIN_CREATE_GUEST_CLAIM'">
            записала в график <b>{{ ha.guest_to.name }} {{ ha.guest_to.surname }}</b> на
          </span>
          <span v-if="ha.action_type === 'ADMIN_DELETE_GUEST_CLAIM'">
            удалила запись в графике c <b>{{ ha.guest_to.name }} {{ ha.guest_to.surname }}</b> в
          </span>
          <span v-if="ha.action_type === 'EDIT_ROLE'">
            поменяла роль
            <b>{{ ha.user_to.name }} {{ ha.user_to.surname }}</b>
            на <i>{{ roleTranslate(ha.new_role) }}</i
            >&nbsp;
          </span>
          <span v-if="ha.claim_date && ha.claim_type">
            <b>{{ dateInfo(ha.claim_date, ha.claim_type) }}</b>
          </span>
        </span>
      </div>
      <Button
        v-if="!collapsed && total > historyActions.length"
        :loading="loading"
        @click="loadMore()"
        class="history-actions__load-more-btn"
        title="Загрузить ещё"
      />
    </div>
    <div class="history-actions__colapse-icon" @click="collapsed = !collapsed">
      <Arrow :toLeft="collapsed" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { typeOfTime, parseDateAndTime } from '@/utils/date';
import Arrow from './Arrow.vue';
import Button from '../common/Button.vue';

const limit = parseInt(process.env.VUE_APP_LIMIT, 10);

export default {
  name: 'HistoryAction',
  components: { Arrow, Button },
  data() {
    return {
      collapsed: true,
      parseDateAndTime,
      typeOfTime,
      skip: limit,
      loading: false,
    };
  },
  computed: mapState({
    historyActions: (state) => state.historyActions.list || [],
    allRoles: (state) => state.roles.list || [],
    total: (state) => state.historyActions.total,
  }),
  created() {
    this.$store.dispatch('roles/getRoles');
  },
  mounted() {
    this.$socket.on('newAction', (action) => {
      this.$store.dispatch('historyActions/addHistoryAction', action);
      this.skip += 1;
    });
  },
  methods: {
    dayOfWeek(date) {
      const options = {
        weekday: 'long',
      };
      return new Date(date).toLocaleDateString('ru-RU', options);
    },
    isGood: (type) => ['CREATE_CLAIM', 'ADMIN_CREATE_GUEST_CLAIM'].includes(type),
    isBad: (type) => ['DELETE_CLAIM', 'ADMIN_DELETE_GUEST_CLAIM'].includes(type),
    roleTranslate(roleName) {
      return this.allRoles.find((role) => role.name === roleName)?.translate;
    },
    dateInfo(date, type) {
      const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        month: 'numeric',
        day: 'numeric',
      });
      return `${this.dayOfWeek(date)} ${formattedDate} (${typeOfTime[type].toLowerCase()})`;
    },
    loadMore() {
      this.loading = true;
      this.$store
        .dispatch('historyActions/loadMoreHistoryActions', {
          skip: this.skip,
        })
        .then(() => {
          this.skip += limit;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;

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
    max-height: calc(100vh - 50px);
    overflow-y: auto;
  }

  &__colapse-icon {
    position: absolute;
    right: 8px;
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

  &__load-more-btn {
    color: $green;
    border-color: $green;
    margin: 8px 16px;
    &:hover {
      background-color: $green;
      color: white;
    }
  }

  @media (max-width: 450px) {
    &.collapsed {
      width: 0px;
    }
  }
}
</style>
