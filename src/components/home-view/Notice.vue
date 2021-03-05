<template>
  <div v-if="show" class="notice">
    <h4 class="notice__title">{{ title }}</h4>
    <div class="notice__line" />
    <h5 class="notice__description">{{ description }}</h5>
  </div>
</template>

<script>
export default {
  name: 'Notice',
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
.notice {
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
    background-color: #42b983;
    margin-left: -2px;
    margin-bottom: 4px;
    margin-top: 2px;
  }

  &__description {
    font-weight: normal;
  }
}
</style>
