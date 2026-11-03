<template>
  <div ref="root" class="nav-dropdown">
    <button
      type="button"
      class="nav-dropdown__trigger"
      :class="{
        'nav-dropdown__trigger--active': isActive,
        'nav-dropdown__trigger--open': open,
      }"
      @click="open = !open"
    >
      {{ label }}
    </button>

    <div v-if="open" class="nav-dropdown__menu">
      <router-link
        v-for="option in options"
        :key="option.to"
        :to="option.to"
        class="nav-dropdown__item"
        @click="open = false"
      >
        {{ option.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  isActive: { type: Boolean, default: false },
});

const route = useRoute();
const root = ref(null);
const open = ref(false);

const onDocumentClick = (event) => {
  if (root.value && !root.value.contains(event.target)) open.value = false;
};

watch(
  () => route.path,
  () => (open.value = false)
);

onMounted(() => document.addEventListener('click', onDocumentClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick));
</script>

<style scoped lang="scss">
$green: #42b983;

.nav-dropdown {
  position: relative;
  text-align: left;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.01em;
    font-family:
      'SF Pro Text', 'Myriad Set Pro', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial',
      sans-serif;
    color: #f5f5f7;

    &::after {
      content: '';
      width: 5px;
      height: 5px;
      margin-top: -3px;
      border-right: 1.5px solid currentColor;
      border-bottom: 1.5px solid currentColor;
      transform: rotate(45deg);
      transition: transform 0.2s;
    }

    &--open::after {
      margin-top: 3px;
      transform: rotate(225deg);
    }

    &--active {
      color: $green;
    }
  }

  &__menu {
    position: absolute;
    top: calc(100% + 10px);
    left: -8px;
    z-index: 6;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    padding: 4px;
    background-color: #2c2c2e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }

  &__item {
    padding: 8px 12px;
    font-size: 14px;
    white-space: nowrap;
    color: #f5f5f7;
    text-align: left;
    text-decoration: none;
    border-radius: 6px;
    transition: background-color 0.15s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    &.router-link-exact-active {
      color: $green;
    }
  }
}
</style>
