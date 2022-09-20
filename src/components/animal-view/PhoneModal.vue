<template>
  <div>
    <a-modal :visible="visible" :footer="null" width="320px" @cancel="this.$emit('onclose')">
      <p v-if="curator.name" class="phone-modal__name">{{ curator.name }}</p>
      <a v-if="curator.phone" class="phone-modal__phone" :href="`tel:+${curator.phone}`">+{{ prettifyPhone() }}</a>
      <p v-if="!isOnTemporaryHold" class="phone-modal__name margin-top">{{ spareCurator.name }}</p>
      <div v-if="!isOnTemporaryHold">
        <p v-for="sparePhone in spareCurator.phones" :key="sparePhone">
          <a class="phone-modal__phone" :href="`tel:${sparePhone}`">
            {{ sparePhone }}
          </a>
        </p>
      </div>
      <div class="phone-modal__line" />
      <p class="phone-modal__description">Пожалуйста, скажите волонтеру, что звоните по объявлению с сайта домика</p>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { curators } from '@/utils/constants';

export default {
  props: {
    visible: Boolean,
    spareCurator: Object,
    place: String,
  },
  data() {
    return { curators };
  },
  computed: mapState({
    curator: (state) => state.users.curator,
    isOnTemporaryHold() {
      return this.place === 'on_temporary_hold';
    },
  }),
  methods: {
    prettifyPhone() {
      const { phone } = this.curator;
      return `${phone.substr(0, 3)} (${phone.substring(3, 5)})
      ${phone.substring(5, 8)}-${phone.substring(8, 10)}-${phone.substring(10)}`;
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;

.phone-modal {
  &__name {
    font-size: 16px;
    margin-bottom: 8px;

    &.margin-top {
      margin-top: 16px;
    }
  }

  &__phone {
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  &__line {
    width: 100%;
    height: 1px;
    background-color: #ededed;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  &__description {
    color: $grey1;
    font-size: 13px;
  }
}
</style>
