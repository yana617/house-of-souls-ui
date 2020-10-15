<template>
  <div class="home">
    <Info v-for="info in infos" :key="info.title" v-bind="info" />
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex';

import Info from '../components/Info.vue';

export default {
  name: 'Home',
  components: {
    Info,
  },
  computed: mapState({
    infos: (state) => state.info.actualInfo,
  }),
  created() {
    this.$store.dispatch('info/getInfo');
  },
};
</script>
