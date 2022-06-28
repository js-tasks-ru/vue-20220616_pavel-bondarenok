import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';

import MeetupDescription from '../02-MeetupDescription/MeetupDescription';
import MeetupCover from '../03-MeetupCover/MeetupCover';
import MeetupInfo from '../04-MeetupInfo/MeetupInfo';
import MeetupAgenda from '../05-MeetupAgenda/MeetupAgenda';
import MeetupView from '../06-MeetupView/MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      isLoading: false,
      selectedMeetup: null,
      apiErrorMessage: null,
    };
  },
  watch: {
    meetupId: async function (newValue, oldValue, callback) {
      await this.fetchMeetup();
    },
  },
  mounted() {
    this.fetchMeetup();
  },
  methods: {
    async fetchMeetup() {
      this.isLoading = true;
      try {
        this.selectedMeetup = await fetchMeetupById(this.meetupId);
        this.apiErrorMessage = null;
      } catch (ex) {
        this.selectedMeetup = null;
        this.apiErrorMessage = ex.message;
      }
      this.isLoading = false;
    },
  },
  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <meetup-view :meetup="selectedMeetup" v-if="selectedMeetup !== null && isLoading === false"/>
      <ui-container v-if="isLoading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
      <ui-container v-if="apiErrorMessage !== null && isLoading === false">
        <ui-alert>{{ apiErrorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});
