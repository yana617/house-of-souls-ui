<template>
  <div v-if="show" class="info">
    <h4 class="info__title">{{ title }}</h4>
    <div class="info__line" />
    <h5 class="info__description">{{ description }}</h5>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: String,
    description: String,
    authorized: Boolean,
  },
  computed: {
    show() {
      if (typeof this.authorized !== 'boolean') {
        return true;
      }
      return (this.authorized && this.user) || (!this.authorized && !this.user);
    },
    user() {
      return this.$store.state.users?.user;
    },
  },
};
</script>

<style lang="scss">
$green: #42b983;

.info {
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 8px 16px;
  h4,
  h5 {
    margin: 0;
  }

  &__line {
    width: 100px;
    height: 3px;
    border-radius: 4px;
    background-color: $green;
    margin-left: -2px;
    margin-bottom: 4px;
    margin-top: 2px;
  }

  &__description {
    font-weight: normal;
  }
}
</style>
