import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  data() {
    return {
      num1: 0,
      num2: 0,
      operator: null,
    };
  },

  computed: {
    result() {
      switch (this.operator) {
        case 'sum':
          return this.num1 + this.num2;
        case 'subtract':
          return this.num1 - this.num2;
        case 'multiply':
          return this.num1 * this.num2;
        case 'divide':
          return this.num1 / this.num2;
        default:
          return 0;
      }
    },
  },
});
app.mount('#app');
