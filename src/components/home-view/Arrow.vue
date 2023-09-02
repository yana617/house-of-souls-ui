<template>
  <div class="arrow" :class="{ 'to-left': toLeft }">
    <div />
  </div>
</template>

<script>
export default {
  props: {
    toLeft: Boolean,
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.arrow {
  cursor: pointer;
  position: relative;
  width: 54px;
  height: 26px;
  margin: 4px 6px;
  padding: 10px 8px 0px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.4s ease-out;
  background-color: white;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);

  &.to-left {
    transform: rotate(180deg);
  }

  &:hover {
    background-color: $green;
    border-color: $green;

    div,
    div::after,
    div::before {
      background-color: white;
    }
  }

  div {
    position: relative;
    width: 40px;
    height: 3px;
    background-color: $green;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    left: 0;
    display: block;
  }

  div::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 3px;
    top: -3.5px;
    right: -2px;
    background-color: $green;
    transform: rotate(45deg);
  }

  div::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 3px;
    top: 3.5px;
    right: -2px;
    background-color: $green;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    transform: rotate(-45deg);
  }

  &:hover {
    animation: arrow 1s linear infinite;
  }
}
@keyframes arrow {
  0% {
    left: 0;
  }
  50% {
    left: 10px;
  }
  100% {
    left: 0;
  }
}
</style>
