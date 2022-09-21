<template>
  <div class="dropdown">
    <div :class="['dropdown__selected', { open }]" @click="toggleOpen">
      <span class="dropdown__selected__text" :class="{ 'long-text': isLongText }">{{ title }}</span>
      <ArrowBottomSvg />
    </div>
    <div :class="['dropdown__options', { open }]">
      <div v-for="option in items" :key="option.slug">
        <div v-if="!option.permissions || hasPermissions(option.permissions)" class="dropdown__option">
          <a :class="{ selected: option.slug === selected }" @click="handleRouteClick(option.url)">
            {{ option.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  computed: mapState({
    title() {
      if (!this.items) return null;
      const selected = this.items.find((item) => item.slug === this.selected);
      return selected ? selected.label : 'Выбрать';
    },
    isLongText() {
      return this.title.length >= 10;
    },
    permissions: (state) => state.permissions.my,
  }),
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    handleRouteClick(url) {
      this.open = false;
      this.$router.push(url);
    },
    hasPermissions(permissionsToCheck) {
      return permissionsToCheck.every((p) => this.permissions.includes(p));
    },
  },
};
</script>

<style lang="scss">
$green: #42b983;

.dropdown {
  position: relative;

  &__selected {
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    max-width: 170px;
    height: 36px;
    padding: 0 12px;

    &.open {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &__text {
      margin-right: 12px;
      font-size: 15px;

      &.long-text {
        margin-right: 8px;
        padding: 0px;
        line-height: 1;
        font-size: 14px;
      }
    }
  }

  &__options {
    min-width: 110px;
    position: absolute;
    display: none;
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
    cursor: pointer;

    a {
      font-size: 15px;
      text-decoration: none;
      color: white;
      white-space: nowrap;

      &.selected {
        color: $green;
      }
    }
  }

  @media (max-width: 360px) {
    &__selected span,
    &__option a {
      font-size: 13px;
    }
  }
}
</style>
