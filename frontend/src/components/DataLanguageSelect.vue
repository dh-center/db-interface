<template>
  <div>
    <label for="radioButtonRu">Russian</label><input
      id="radioButtonRu"
      v-model="dataLanguage"
      type="radio"
      name="dataLang"
      value="ru"
    >
    <label for="radioButtonEn">English</label><input
      id="radioButtonEn"
      v-model="dataLanguage"
      type="radio"
      name="dataLang"
      value="en"
    >
  </div>
</template>

<script>
  import { CHANGE_DATA_LANG } from '../store/modules/app/actionTypes';

  export default {
    name: 'DataLanguageSelect',
    computed: {
      dataLanguage: {
        get() {
          return this.$store.state.app.dataLanguage;
        },
        set(value) {
          this.$store.dispatch(CHANGE_DATA_LANG, value);
        }
      }
    }
  };
</script>
