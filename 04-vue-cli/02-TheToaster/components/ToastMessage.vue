<template>
  <div class="toast" :class="statusClass">
    <ui-icon class="toast__icon" :icon="toast.icon" />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import UiIcon from './UiIcon.vue';
import type { Toast } from './Structures';
import { ToastType } from './Structures';

export default defineComponent({
  name: 'ToastMessage',
  components: {
    UiIcon,
  },
  props: {
    toast: {
      type: Object as PropType<Toast>,
      required: true,
    },
  },
  computed: {
    statusClass() {
      return {
        toast_success: this.toast.type === ToastType.SUCCESS,
        toast_error: this.toast.type === ToastType.ERROR,
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
