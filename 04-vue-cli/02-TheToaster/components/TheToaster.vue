<template>
  <div class="toasts">
    <toast-message v-for="(toast, index) in toasts" :key="index" :toast="toast" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToastMessage from './ToastMessage.vue';
import type { Toast } from './Structures';
import { ToastType } from './Structures';

interface DataSet {
  toasts: Array<Toast>;
  defaultDurationTime: number;
}

export default defineComponent({
  name: 'TheToaster',
  components: { ToastMessage },
  data(): DataSet {
    return {
      toasts: [],
      defaultDurationTime: 5000,
    };
  },
  methods: {
    addToast(toast: Toast): void {
      this.toasts.push(toast);
      this.removeToast(toast);
    },
    removeToast(toast: Toast): number {
      return setTimeout(() => {
        const index: number = this.toasts.indexOf(toast);
        this.toasts.splice(index, 1);
      }, toast.displayedTime);
    },
    success(message: string, duration = 0): void {
      this.addToast({
        message,
        type: ToastType.SUCCESS,
        icon: 'check-circle',
        displayedTime: duration > 0 ? duration : this.defaultDurationTime,
      });
    },
    error(message: string, duration = 0): void {
      this.addToast({
        message,
        type: ToastType.ERROR,
        icon: 'alert-circle',
        displayedTime: duration > 0 ? duration : this.defaultDurationTime,
      });
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
</style>
