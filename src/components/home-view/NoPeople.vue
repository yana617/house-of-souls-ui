<template>
  <div class="no-people">
    <inline-svg :src="attentionIcon" fill="orange" />
    <span>Никого нет</span>
  </div>
</template>

<script>
import attentionIcon from '@/assets/attention.svg';

export default {
  name: 'NoPeople',
  data() {
    return {
      attentionIcon,
    };
  },
};
</script>

<style scoped lang="scss">
.no-people {
  display: flex;
  width: 160px;
  align-items: center;
  justify-content: center;
  color: orange;
  padding-top: 4px;

  svg {
    fill: orange;
  }

  img {
    width: 16px;
    height: 16px;

    svg {
      fill: orange;
    }
  }
}
</style>
