<template>
  <a-table
    :columns="claimsRatingColumns"
    :data-source="users"
    :row-key="(record) => record.id"
    :pagination="{
      defaultPageSize: 10,
      'onUpdate:current': (page) => (currentPage = page),
    }"
    :default-expand-all-rows="true"
    class="claims-rating-table"
    size="small"
    :row-class-name="(record, index) => getRowClass(record, index)"
  >
    <template #title>
      {{ header }}
    </template>
    <template #place="{ index }">
      <b>{{ getIndex(index) }} <StarFilled v-if="getIndex(index) <= 3" class="claims-rating-table__star" /></b>
    </template>
    <template #fullName="{ record }">
      <span class="claims-rating-table__name-row">{{ record.fullName }}</span>
    </template>
  </a-table>
</template>

<script>
import { mapState } from 'vuex';
import { StarFilled } from '@ant-design/icons-vue';

import { parseDate, typeOfTime, weekDayOfDate } from '@/utils/date';
import { claimsRatingColumns } from '@/utils/constants';

const USERS_PER_PAGE = 10;

export default {
  name: 'VisitsTable',
  components: { StarFilled },
  props: {
    users: Array,
    header: String,
  },
  data() {
    return {
      typeOfTime,
      parseDate,
      weekDayOfDate,
      claimsRatingColumns,
      currentPage: 1,
    };
  },
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  mounted() {
    if (!this.user) {
      this.$store.dispatch('users/getUser');
    }
  },
  methods: {
    getIndex(index) {
      return (this.currentPage - 1) * USERS_PER_PAGE + index + 1;
    },
    getRowClass(record, index) {
      const classes = [];
      if (this.getIndex(index) <= 3) {
        classes.push('claims-rating-table__winner');
      }
      if (record.id === this.user?.id) {
        classes.push('claims-rating-table__me');
      }
      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss">
$green: #42b983;
$gold: #ffd700;
$pinkBlue: #f0dbff;
$blackBlue: rgba(19, 56, 99, 0.1);
$whiteGreen: #f1f8f5;

$borderRadius: 16px;

.claims-rating-table {
  max-width: 370px;
  background-color: white;
  border-radius: $borderRadius;
  padding-top: 28px;
  box-shadow: 1px 1px 10px $blackBlue;

  &__winner {
    background-color: $whiteGreen;
    border: none !important;
    font-weight: bold;
  }

  &__star {
    color: $gold;
  }

  &__me {
    background-color: $pinkBlue;
  }

  &__name-row {
    display: flex;
    min-width: 170px;
  }

  @media (max-width: 1200px) {
    max-width: 500px;
    margin-bottom: 16px;
    
    &__name-row {
      min-width: 300px;
    }
  }

  @media (max-width: 520px) {
    max-width: 370px;
    &__name-row {
      min-width: 170px;
    }
  }

  @media (max-width: 370px) {
    &__name-row {
      min-width: 150px;
    }
  }

  @media (max-width: 359px) {
    &__name-row {
      min-width: 130px;
      max-width: 130px;
    }
  }

  @media (max-width: 335px) {
    &__name-row {
      min-width: 120px;
      max-width: 120px;
    }
  }
}

.ant-table-title {
  font-weight: bold;
  padding-bottom: 16px;
  top: -12px;
}
</style>
