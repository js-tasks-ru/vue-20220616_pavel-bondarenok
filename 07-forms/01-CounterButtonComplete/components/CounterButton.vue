<template>
  <button @click="$emit('update:count', ++clicks)">{{ clicks }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface DataSet {
  clicks: number;
}

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  data(): DataSet {
    return {
      clicks: this.count,
    };
  },
  watch: {
    count(newValue: number, oldValue: number) {
      this.clicks = this.count;
    },
  },
});
</script>
