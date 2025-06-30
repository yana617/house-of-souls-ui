<template>
  <div class="status-hashtag">
    <span># {{ statusTranslate }}</span>
  </div>
</template>

<script>
import translates from '@/utils/translates/index';

export default {
  name: 'StatusHashtag',
  props: {
    status: String,
  },
  computed: {
    statusTranslate() {
      return translates[this.status] || this.status;
    },
  },
};
</script>

<style scoped lang="scss">
$grey2: #f4f6f9;
$green: #42b983;

.status-hashtag {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: $grey2;
  border-radius: 44px;
  color: $green;
  margin-top: 16px;
  font-size: 14px;
  height: 50px;
  width: max-content;
}
</style>
