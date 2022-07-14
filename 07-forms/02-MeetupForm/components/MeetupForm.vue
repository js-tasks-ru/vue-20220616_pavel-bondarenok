<template>
  <form class="meetup-form" @submit="$emit('submit', cloneDeepFunc(localMeetup))">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <ui-form-group label="Название">
          <ui-input v-model="localMeetup.title" name="title" />
        </ui-form-group>
        <ui-form-group label="Дата">
          <ui-input-date v-model="localMeetup.date" type="date" name="date" />
        </ui-form-group>
        <ui-form-group label="Место">
          <ui-input v-model="localMeetup.place" name="place" />
        </ui-form-group>
        <ui-form-group label="Описание">
          <ui-input v-model="localMeetup.description" multiline rows="3" name="description" />
        </ui-form-group>
        <ui-form-group label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader
            name="image"
            :preview="localMeetup.image"
            @select="localMeetup.imageToUpload = $event"
            @remove="localMeetup.imageToUpload = null"
          />
        </ui-form-group>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>

      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        class="meetup-form__agenda-item"
        :agenda-item="agendaItem"
        @remove="removeAgendaItem(index)"
        @update:agenda-item="(changes) => updateAgendaItem(index, changes)"
      />

      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="$emit('cancel')">Отмена</ui-button>
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { klona } from 'klona';

import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from './UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from './UiInputDate.vue';
import { createAgendaItem } from '../meetupService';

interface AgendaItem {
  id: number;
  startsAt: string;
  endsAt: string;
  type: string;
  title: string;
  description: string;
  speaker: string;
  language: string;
}

interface Meetup {
  id: number;
  title: string;
  date: string;
  place: string;
  description: string;
  image: string;
  agenda: AgendaItem[];
}

interface DataSet {
  localMeetup: Meetup;
  cloneDeepFunc: <t extends Meetup>(input: t) => t;
}

export default defineComponent({
  name: 'MeetupForm',

  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },
  props: {
    meetup: {
      type: Object as PropType<Meetup>,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },
  emits: ['cancel', 'submit'],
  data(): DataSet {
    return {
      localMeetup: klona(this.meetup),
      cloneDeepFunc: klona,
    };
  },
  methods: {
    addAgendaItem(): void {
      const item = createAgendaItem();
      if (this.localMeetup.agenda.length > 0) {
        item.startsAt = this.localMeetup.agenda[this.localMeetup.agenda.length - 1].endsAt;
      }
      this.localMeetup.agenda.push(item);
    },
    removeAgendaItem(index: number): void {
      this.localMeetup.agenda.splice(index, 1);
    },
    updateAgendaItem(index: number, changes: AgendaItem): void {
      this.localMeetup.agenda.splice(index, 1, changes);
    },
  },
});
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
