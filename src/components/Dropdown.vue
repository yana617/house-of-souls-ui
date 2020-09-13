<template>
  <div class="dropdown">
    <div @click="toggleOpen" :class="['dropdown__selected', { open }]">
      <span>{{ title }}</span>
      <ArrowBottomSvg />
    </div>
    <div :class="['dropdown__options', { open }]">
      <div
        :class="['dropdown__option', { selected: option.slug === selected }]"
        v-for="option in items"
        :key="option.slug"
      >
        <a @click="handleRouteClick(option.url)">{{ option.label }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowBottomSvg from './ArrowBottomSvg.vue';

export default {
  name: 'Dropdown',
  components: { ArrowBottomSvg },
  props: {
    items: Array,
    selected: String,
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    title() {
      if (!this.items) return null;
      const selected = this.items.find((item) => item.slug === this.selected);
      return selected ? selected.label : 'Выбрать';
    },
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    handleRouteClick(url) {
      this.open = false;
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss">
.dropdown {
  position: relative;

  &__selected {
    padding: 8px 16px;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;

    &.open {
      background-color: rgba(255, 255, 255, 0.3);
    }

    span {
      display: flex;
      margin-right: 8px;
      font-size: 15px;
    }
  }

  &__options {
    min-width: 110px;
    position: absolute;
    display: none;
    width: 100%;
    top: 45px;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 4px;

    &.open {
      display: flex;
    }
  }

  &__option {
    display: flex;
    padding: 8px 16px;
    color: white;
    cursor: pointer;

    a {
      font-size: 15px;
      text-decoration: none;
    }

    &.selected {
      color: #42b983;
    }
  }

  @media (max-width: 360px) {
    &__selected span, &__option a {
      font-size: 13px;
    }
  }
}
</style>
