<template>
  <select
    :value="dataLanguage"
    @input="changeDataLanguage"
  >
    <option value="ru">
      Russian
    </option>
    <option value="en">
      English
    </option>
  </select>
</template>

<script>
  import { mapState } from 'vuex';
  import { CHANGE_DATA_LANG } from '../store/modules/app/actionTypes';

  export default {
    name: 'DataLanguageSelect',
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    methods: {
      changeDataLanguage(e) {
        this.$store.dispatch(CHANGE_DATA_LANG, e.target.value);
      }
    }
  };
</script>
