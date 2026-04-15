<template>
  <div class="dropdown">
    <div :class="['dropdown__selected', { open }]" @click="toggleOpen">
      <span class="dropdown__selected__text" :class="{ 'long-text': isLongText }">
        {{ title }}
      </span>
      <ArrowBottomSvg />
    </div>

    <div :class="['dropdown__options', { open }]">
      <div
        v-for="option in filteredItems"
        :key="option.slug"
        class="dropdown__option"
        :class="{ selected: option.slug === selected, 'with-divider': !!option.withDivider }"
        @click="handleRouteClick(option.url)"
      >
        <a>
          {{ option.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ArrowBottomSvg from './ArrowBottomSvg.vue';
import { MOBILE_MENU_ITEMS } from '@/router/constants';

const props = defineProps({
  items: Array,
  selected: String,
});

const router = useRouter();
const store = useStore();

const open = ref(false);

const permissions = computed(() => store.state.permissions.my);

const hasPermissions = (required) => {
  return required.every((p) => permissions.value.includes(p));
};

const filteredItems = computed(() => {
  return MOBILE_MENU_ITEMS.filter((item) => {
    if (!item.permissions) return true;
    return hasPermissions(item.permissions);
  });
});

const title = computed(() => {
  const selected = MOBILE_MENU_ITEMS.find((item) => item.slug === props.selected);
  return selected ? selected.label : 'Выбрать';
});

const isLongText = computed(() => title.value.length >= 10);

const toggleOpen = () => {
  open.value = !open.value;
};

const handleRouteClick = (url) => {
  open.value = false;
  router.push(url);
};
</script>


<style lang="scss">
$green: #42b983;
$divider: #28313c;

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
    background-color: #3e4753;
    border-radius: 12px;
    padding: 8px 0;

    &.open {
      display: flex;
    }
  }

  &__option {
    display: flex;
    padding: 8px 16px;
    cursor: pointer;
    color: white;

    &.selected {
      color: $green;
      background-color: rgba(200, 200, 200, 0.1);
    }

    &.with-divider {
      border-bottom: 1px solid $divider;
      padding-bottom: 12px;
    }

    a {
      font-size: 15px;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
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
