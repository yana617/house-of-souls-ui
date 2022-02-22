<template>
  <div class="claims-rating" v-if="rating">
    <ClaimsRatingTable header="За всё время" :users="rating.allTime" />
    <a-divider type="vertical" class="claims-rating__divider" />
    <ClaimsRatingTable header="За последний год" :users="rating.year" />
    <a-divider type="vertical" class="claims-rating__divider" />
    <ClaimsRatingTable header="За последний месяц" :users="rating.month" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ClaimsRatingTable from './ClaimsRatingTable.vue';
import { claimsColumns } from '@/utils/constants';

export default {
  name: 'ClaimsRating',
  components: { ClaimsRatingTable },
  created() {
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('claims/getRating').finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
  },
  computed: mapState({
    rating: (state) => state.claims.rating,
  }),
  data() {
    return {
      claimsColumns,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
$lightestGrey: #eff1f3;

.claims-rating {
  display: flex;
  justify-content: center;
  background-color: $lightestGrey;
  padding: 32px 0;

  &__divider {
    border: none;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;

    &__divider {
      display: none;
    }
  }
}
</style>
