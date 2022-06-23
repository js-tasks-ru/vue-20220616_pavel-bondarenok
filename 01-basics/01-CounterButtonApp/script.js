import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  data() {
    return {
      clicks: 0,
    };
  },
});
app.mount('#app');
