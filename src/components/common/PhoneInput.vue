<template>
  <input @input="$emit('onchange', $event.target.value)" :id="id" :placeholder="placeholder" />
</template>

<script>
import Inputmask from 'inputmask';

export default {
  name: 'PhoneInput',
  props: {
    id: String,
    placeholder: String,
  },
  data() {
    return {
      phone: null,
    };
  },
  mounted() {
    const selector = document.getElementById(this.id);
    const im = new Inputmask('+375 (99) 999-9999');
    im.mask(selector);
  },
};
</script>

<style lang="scss">
</style>
