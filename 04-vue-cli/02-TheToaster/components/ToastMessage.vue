<template>
  <div class="toast" :class="dynamicClasses(toast)">
    <ui-icon class="toast__icon" :icon="toast.icon" />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import UiIcon from './UiIcon.vue';
import { ToastType, Toast } from './Structures';

export default defineComponent({
  name: 'ToastMessage',
  components: {
    UiIcon,
  },
  props: {
    toast: Object as PropType<Toast>,
  },
  methods: {
    dynamicClasses(toast: Toast) {
      return {
        toast_success: toast.type === ToastType.SUCCESS,
        toast_error: toast.type === ToastType.ERROR,
      };
    },
  },
});
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
