import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const app = createApp({
  data() {
    return {
      meetup: {
        id: 0,
        title: '',
      },
    };
  },
  watch: {
    'meetup.id': async function (newVal, oldVal, callback) {
      const meetup = await fetchMeetupById(newVal);
      this.meetup.title = meetup.title;
    },
  },
});
app.mount('#app');

// Требуется создать Vue приложение
