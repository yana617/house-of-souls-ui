<template>
  <div class="checkbox">
    <div class="checkbox__selects">
      <span
        @click="this.$emit('onchange', this.name, true)"
        :class="['checkbox__select first', { selected }]"
      >+</span>
      <span
        @click="this.$emit('onchange', this.name, false)"
        :class="['checkbox__select second', { selected: !selected }]"
      >-</span>
    </div>
    <label>{{label}}</label>
    <Tooltip v-if="description" :helpText="description" />
  </div>
</template>

<script>
import Tooltip from './CustomTooltip.vue';

export default {
  name: 'Checkbox',
  components: { Tooltip },
  props: {
    label: String,
    name: String,
    selected: Boolean,
    description: String,
  },
};
</script>

<style lang="scss">
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
    border: 1px solid #ccc;

    &.first {
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &.second {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &.selected {
      background-color: #42b983;
      color: white;
      border-color: #42b983;
    }
  }
}
</style>
