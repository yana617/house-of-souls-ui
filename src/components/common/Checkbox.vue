<template>
  <div class="checkbox">
    <div id="select" class="checkbox__selects">
      <span @click="$emit('input', true)" class="checkbox__select" :class="{ selected: value }">+</span>
      <span @click="$emit('input', false)" class="checkbox__select" :class="{ selected: !value }">-</span>
    </div>
    <label for="select">{{ label }}</label>
    <Tooltip v-if="description" :helpText="description" />
  </div>
</template>

<script>
import Tooltip from './CustomTooltip.vue';

export default {
  name: 'Checkbox',
  components: { Tooltip },
  props: {
    value: Boolean,
    label: String,
    description: String,
  },
};
</script>

<style lang="scss">
$green: #42b983;
$lightGrey: #ccc;

.checkbox {
  width: 300px;
  background-color: transparent;
  border-radius: 4px;
  padding: 4px 0px;
  margin: 4px 0px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;

  label {
    margin-left: 8px;
  }

  &__selects {
    display: flex;
    border-radius: 4px;
    cursor: pointer;
  }

  &__select {
    display: flex;
    padding: 2px 8px 4px 8px;
    border: 1px solid $lightGrey;

    &:first-child {
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &.selected {
      background-color: $green;
      color: white;
      border-color: $green;
    }
  }
}
</style>
