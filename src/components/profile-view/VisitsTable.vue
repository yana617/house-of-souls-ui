<template>
  <div class="visit">
    <a-table
      :columns="claimsColumns"
      :data-source="claims"
      :row-key="(record) => record._id"
      :pagination="paginationOpt"
      :defaultExpandAllRows="true"
      class="visit__table"
    >
      <template #date="{ text: date }">
        <span class="visit__date"><b>{{ parseDate(date) }}</b>&nbsp;({{ weekDayOfDate(date) }})</span>
      </template>
      <template #additionalPeople="{ record }">
        <span>{{ record.additional_people ? `+${record.additional_people}` : '-' }}</span>
      </template>
      <template #typeOfTime="{ record }">
        <span>{{ typeOfTime[record.type] }}</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { parseDate, typeOfTime, weekDayOfDate } from '@/utils/date';

import { claimsColumns } from '@/utils/constants';

export default {
  name: 'VisitsTable',
  props: {
    claims: Array,
  },
  data() {
    return {
      typeOfTime,
      parseDate,
      weekDayOfDate,
      claimsColumns,
      paginationOpt: {
        defaultPageSize: 10,
      },
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.visit {
  display: flex;
  margin: 8px 0;
  padding: 8px 20%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  min-height: 100%;

  &__table {
    width: 100%;
  }

  &__date {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 370px) {
    &__date {
      display: grid;
      white-space: normal;
    }
  }
}
</style>
