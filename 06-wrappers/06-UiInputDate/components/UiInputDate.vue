<template>
  <ui-input v-model="inputValue" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </ui-input>
</template>

<script lang="ts">
import UiInput from './UiInput.vue';
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'UiInputDate',

  components: { UiInput },
  props: {
    modelValue: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: 'date',
      validator: (value: string): boolean => ['date', 'time', 'datetime-local'].includes(value),
    },
  },
  emits: ['update:modelValue'],
  computed: {
    inputValue: {
      get(): string {
        if (!Number.isInteger(this.modelValue))
          return '';
        const offset = 1000 * 60 * new Date().getTimezoneOffset();
        const dateTime = dayjs(new Date(this.modelValue + offset));
        switch (this.type) {
          case 'date':
            return dateTime.format('YYYY-MM-DD');
          case 'time':
            if (this.$attrs['step'] && (this.$attrs['step'] as number) % 60 !== 0)
              return dateTime.format('HH:mm:ss');
            return dateTime.format('HH:mm');
          default:
            return dateTime.format('YYYY-MM-DDTHH:mm');
        }
      },
      set(value: string): void {
        const ms = this.$el.querySelector('input').valueAsNumber;
        this.$emit('update:modelValue', ms);
      },
    },
  },
});
</script>
