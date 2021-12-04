import { ref, computed } from 'vue';

export const collapsed = ref(false);

export const toogleSidebar = () => (collapsed.value = !collapsed.value);

export const SIDEBAR_WIDTH = 40;
export const SIDEBAR_WIDTH_COLLAPSED = 10;
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH} `,
);
