<template>
  <div class="data-language-select">
    <div>
      <label for="radioButtonRu">ru</label>
      <input
        id="radioButtonRu"
        v-model="dataLanguage"
        type="radio"
        name="dataLang"
        value="ru"
      >
    </div>
    <div>
      <label for="radioButtonEn">en</label>
      <input
        id="radioButtonEn"
        v-model="dataLanguage"
        type="radio"
        name="dataLang"
        value="en"
      >
    </div>
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

<style>
  .data-language-select {
    display: flex;
    text-align: right;
    flex-direction: column;
  }
</style>
