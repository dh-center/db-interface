import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';

Vue.use(VueI18Next);

const ruLang = require('./languages/ru');
const enLang = require('./languages/en');

i18next.init({
  lng: 'en',
  resources: {
    ru: { translation: ruLang },
    en: { translation: enLang }
  }
});

export default new VueI18Next(i18next);
