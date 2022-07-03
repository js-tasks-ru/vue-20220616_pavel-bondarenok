<template>
  <div class="toasts">
    <div
      v-for="toast in toasts"
      class="toast"
      :class="dynamicClasses(toast)"
    >
      <ui-icon class="toast__icon" :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import { defineComponent, PropType } from 'vue';

enum ToastType {
  SUCCESS,
  ERROR,
}

interface Toast {
  message: string;
  type: ToastType;
  icon: string;
}

interface DataSet {
  toasts: Array<Toast>;
  toastDelay: number;
}

export default defineComponent({
  name: 'TheToaster',
  components: { UiIcon },
  data(): DataSet {
    return {
      toasts: [],
      toastDelay: 5000,
    };
  },
  methods: {
    dynamicClasses(toast: Toast) {
      return {
        toast_success: toast.type === ToastType.SUCCESS,
        toast_error: toast.type === ToastType.ERROR,
      };
    },
    addToast(toast: Toast): void {
      this.toasts.push(toast);
      this.removeToast(toast);
    },
    removeToast(toast: Toast): number {
      const timeoutId = setTimeout(() => {
        const index: number = this.toasts.findIndex((item) => item.type === toast.type && item.message === toast.message);
        this.toasts.splice(index, 1);
      }, this.toastDelay);
      return timeoutId;
    },
    success(message: string): void {
      const toast: Toast = {
        message,
        type: ToastType.SUCCESS,
        icon: 'check-circle',
      };
      this.addToast(toast);
    },
    error(message: string): void {
      const toast: Toast = {
        message,
        type: ToastType.ERROR,
        icon: 'alert-circle',
      };
      this.addToast(toast);
    },
  },
});
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

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
