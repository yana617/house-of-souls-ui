<template>
  <div class="notice">
    <h4 class="notice__title">{{ title }}</h4>
    <div class="notice__line" />
    <h5 class="notice__description">{{ description }}</h5>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props: {
    noticeId: String,
    title: String,
    description: String,
    internalOnly: Boolean,
  },
  created() {
    this.$store.dispatch('notices/getNoticeById', { _id: this.noticeId });
  },
};
</script>

<style lang="scss">
$green: #42b983;

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
    background-color: $green;
    margin-left: -2px;
    margin-bottom: 4px;
    margin-top: 2px;
  }

  &__title {
    font-size: 16px;
  }

  &__description {
    font-weight: normal;
    font-size: 14px;
  }
}
</style>
