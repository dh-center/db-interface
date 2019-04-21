<template>
  <div class="form">
    <h1>Форма</h1>
    <form>
      <div class="form__field">
        <label for="person">Персона: </label>
        <autocomplete
          placeholder="Search Person"
          :source="personLink"
          results-property="data"
          results-display="name"
          id="person"
        >
        </autocomplete>
      </div>
      <div class="form__field">
        <label for="location">Место: </label>
        <autocomplete
          placeholder="Search Locations"
          :source="locationLink"
          results-property="data"
          results-display="name"
          id="location"
        >
        </autocomplete>
      </div>
      <div class="form__field">
        <label for="relation">Связь: </label>
        <select id="relation">
        </select>
      </div>
      <div class="form__field">
        <label for="quote">Цитата и ссылка на издание: </label>
        <textarea id="quote"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
  import Autocomplete from 'vuejs-auto-complete';
  import axios from 'axios';

  export default {
    name: 'Form',
    components: {
      Autocomplete
    },
    computed: {
      locationLink: function (input) {
        return axios.defaults.baseURL + '/locations?name=' + input;
      },
      personLink: function (input) {
        return axios.defaults.baseURL + '/persons?name=' + input;
      }
    }
  };

</script>

<style>
  .form{
    width: 600px;
    margin-left: calc(50vw - 313px);
  }
</style>
