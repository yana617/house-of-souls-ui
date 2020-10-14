<template>
  <span class="tooltip">
    <div class="tooltip__wrapper">?</div>
    <span class="tooltip__text">{{ helpText }}</span>
  </span>
</template>

<script>
export default {
  name: 'CustomTooltip',
  props: {
    helpText: String,
  },
};
</script>

<style lang="scss">
.tooltip {
  position: relative;
  cursor: pointer;
  color: #00b4ab;
  margin-left: 16px;

  &__wrapper {
    width: 20px;
    height: 20px;
    padding: 2px 4px;
    border-radius: 10px;
    background-color: #ecfff6;
    color: black;
  }

  &__text {
    font-family: 'Open Sans', sans-serif;
    font-size: 1em;
    line-height: 1.5em;
    visibility: hidden;
    max-width: 250px;
    width: 250px;
    background-color: #3eac7a;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -125px;
    opacity: 0;
    transition: 0.3s;
    transform: translate3d(0px, 20px, 0px);

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #00b4ab transparent transparent transparent;
    }
  }

  &:hover &__text {
    visibility: visible;
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
}
</style>
