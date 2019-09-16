<template>
  <div class="interface-language-select">
    <h2>Interface language</h2>
    <div>
      <label :for="$id('radioButtonRu')">ru</label>
      <input
        :id="$id('radioButtonRu')"
        v-model="interfaceLanguage"
        type="radio"
        name="interfaceLang"
        value="ru"
      >
    </div>
    <div>
      <label :for="$id('radioButtonEn')">en</label>
      <input
        :id="$id('radioButtonEn')"
        v-model="interfaceLanguage"
        type="radio"
        name="interfaceLang"
        value="en"
      >
    </div>
  </div>
</template>

<script>
  import { CHANGE_INTERFACE_LANG } from '../store/modules/app/actionTypes';

  export default {
    name: 'InterfaceLanguageSelect',
    computed: {
      interfaceLanguage: {
        get() {
          return this.$store.state.app.interfaceLanguage;
        },
        set(value) {
          this.$store.dispatch(CHANGE_INTERFACE_LANG, value);
        }
      }
    }
  };
</script>

<style>
</style>
