<template>
  <div
    class="input-group input-group_icon"
    :class="{ 'input-group_icon-left': isLeftSlotExist(), 'input-group_icon-right': isRightSlotExist() }"
  >
    <div v-if="isLeftSlotExist()" class="input-group__icon">
      <slot name="left-icon"></slot>
    </div>
    <component
      :is="inputTag"
      v-bind="htmlAttributes"
      ref="input"
      class="form-control"
      :value="modelValue"
      @input="emitValueOnInput"
      @change="emitValueOnChange"
    ></component>

    <div v-if="isRightSlotExist()" class="input-group__icon">
      <slot name="right-icon"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface DynamicClasses {
  [key: string]: boolean;
}

interface HtmlAttributes {
  [key: string]: unknown;
  class: DynamicClasses;
}

interface ModelModifiers {
  lazy?: boolean;
}

export default defineComponent({
  name: 'UiInput',
  inheritAttrs: false,
  props: {
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
    modelValue: String,
    modelModifiers: {
      default: (): ModelModifiers => ({}),
    },
  },
  emits: ['update:modelValue'],
  computed: {
    inputTag(): string {
      return this.multiline ? 'textarea' : 'input';
    },
    htmlAttributes(): HtmlAttributes {
      return {
        ...this.$attrs,
        class: {
          'form-control_sm': this.small,
          'form-control_rounded': this.rounded,
        },
      };
    },
  },
  methods: {
    focus: function (): void {
      (this.$refs['input'] as HTMLInputElement).focus();
    },
    isLeftSlotExist(): boolean {
      return !!this.$slots['left-icon'];
    },
    isRightSlotExist(): boolean {
      return !!this.$slots['right-icon'];
    },
    emitValueOnInput(event: Event): void {
      if (this.modelModifiers.lazy === undefined) {
        this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
      }
    },
    emitValueOnChange(event: Event): void {
      if (this.modelModifiers.lazy) {
        this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
      }
    },
  },
});
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
