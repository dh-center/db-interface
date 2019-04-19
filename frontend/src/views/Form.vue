<template>
  <div class="form">
    <h1>Форма</h1>
    <form>
      <div class="form__field">
        <label for="person">Персона: </label>
        <autocomplete
          placeholder="Search Person"
          source="http://127.0.0.1:3000/persons?name="
          results-property="data"
          results-display="name"
        >
        </autocomplete>
      </div>
      <div class="form__field">
        <label for="location">Место: </label>
        <autocomplete
          placeholder="Search Locations"
          source="http://127.0.0.1:3000/locations?name="
          results-property="data"
          results-display="name"
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

  export default {
    name: 'Catalog',
    data() {
      return {
      };
    },
    components: {
      Autocomplete
    },
    methods: {
    }
  };

</script>

<style>
  .form{
    width: 600px;
    margin-left: calc(50vw - 313px);
  }
</style>
