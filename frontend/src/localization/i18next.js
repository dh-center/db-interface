import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

Vue.use(VueI18Next);

const ruLang = require('./languages/ru');
const enLang = require('./languages/en');

i18next.use(LanguageDetector);

i18next.init({
  lng: 'ru',
  resources: {
    ru: { translation: ruLang },
    en: { translation: enLang }
  }
});

export default new VueI18Next(i18next);
