import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

Vue.use(VueI18Next);

const ruLang = require('./languages/ru');

const enLang = require('./languages/en');

i18next.use(LanguageDetector);

i18next.init({
  resources: {
    ru: { translation: ruLang },
    en: { translation: enLang }
  },
  detection: { order: [ 'navigator' ] },
  fallbackLng: 'en'
});

export default new VueI18Next(i18next);
