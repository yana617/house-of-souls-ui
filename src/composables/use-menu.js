import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export function useMenu(rawMenuItems) {
  const store = useStore();
  const route = useRoute();

  const permissions = computed(() => store.state.permissions.my);

  const hasPermissions = (p) => permissions.value.includes(p);

  const desktopMenuItems = computed(() =>
    rawMenuItems
      .filter((item) => {
        if (item.permission && !hasPermissions(item.permission)) return false;
        if (item.invert && hasPermissions(item.invert)) return false;
        return true;
      })
      .map((item) => ({
        ...item,
        isActive: item.match
          ? item.match(route.path)
          : route.path === item.to,
      }))
  );

  return {
    desktopMenuItems,
  };
}
