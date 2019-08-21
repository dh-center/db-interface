import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

Vue.use(VueI18Next);

i18next.use(LanguageDetector);

i18next.init({
  resources: ['ru', 'en'],
  detection: { order: [ 'navigator' ] },
  fallbackLng: 'en'
});

if (i18next.language === 'ru') {
  i18next.addResourceBundle('ru', 'translation', require('./languages/ru'));
} else if (i18next.language.includes('en')) {
  i18next.addResourceBundle('en', 'translation', require('./languages/en'));
}

export default new VueI18Next(i18next);
