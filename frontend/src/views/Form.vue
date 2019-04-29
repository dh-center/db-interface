<template>
  <div class="form">
    <h1>Форма</h1>
    <form @submit.prevent="saveRelation">
      <div class="form__field">
        <label>Персона: </label>
        <autocomplete
          ref="personAutocomplete"
          placeholder="Search Person"
          :source="personLink"
          results-property="data"
          results-value="_id"
          :results-display="formattedDisplayPerson"
          @selected="personSelect"
        >
        </autocomplete>
      </div>
      <div class="form__field">
        <label>Место: </label>
        <autocomplete
          ref="locationAutocomplete"
          placeholder="Search Locations"
          :source="locationLink"
          results-property="data"
          results-value="_id"
          :results-display="formattedDisplayLocation"
          @selected="locationSelect"
        >
        </autocomplete>
      </div>
      <div class="form__field">
        <label for="relation">Связь: </label>
        <select id="relation" name="relation" v-model="selectedRelation">
          <option v-for="relation in relations" :value="relation.id" :key="relation.id">
            {{relation.name}}
          </option>
        </select>
      </div>
      <div class="form__field">
        <label for="quote">Цитата и ссылка на издание: </label>
        <textarea id="quote" v-model="quote"></textarea>
      </div>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
  import Autocomplete from 'vuejs-auto-complete';
  import axios from 'axios';
  import relations from '../../../backend/models/relationId.json';
  export default {
    name: 'Form',
    data() {
      return {
        relations,
        selectedRelation: null,
        quote: null,
        selectedPerson: null,
        selectedLocation: null
      };
    },
    components: {
      Autocomplete
    },
    computed: {
      locationLink(input) {
        return axios.defaults.baseURL + '/locations?name=' + input;
      },
      personLink(input) {
        return axios.defaults.baseURL + '/persons?name=' + input;
      }
    },
    methods: {
      formattedDisplayPerson(result) {
        const birthDate = new Date(result.birthDate);
        const deathDate = new Date(result.deathDate);

        return result.name +
          '<br><span class="autocomplete__description">' + birthDate.getFullYear() + ' - ' + deathDate.getFullYear() +
          '<br>' + result.profession + '</span>';
      },
      formattedDisplayLocation(result) {
        const constructionDate = new Date(result.constructionDate);
        const demolitionDate = new Date(result.demolitionDate);

        return result.name +
          '<br><span class="autocomplete__description">' + constructionDate.getFullYear() + ' - ' + demolitionDate.getFullYear() +
          '<br>' + result.buildingType + '</span>';
      },
      saveRelation() {
        axios.post('/relations', {
          relationId: this.selectedRelation,
          quote: this.quote,
          personId: this.selectedPerson,
          locationId: this.selectedLocation
        });
      },
      personSelect(input) {
        this.selectedPerson = input.value;
        this.$refs.personAutocomplete.selectedDisplay = input.selectedObject.name;
      },
      locationSelect(input) {
        this.selectedLocation = input.value;
        this.$refs.locationAutocomplete.selectedDisplay = input.selectedObject.name;
      }
    }
  };

</script>

<style>
  .form{
    width: 600px;
    margin-left: calc(50vw - 313px);
  }
  .form__field {
    margin-bottom: 10px;
  }
  .form__field select {
    width: 25%;
  }
  .form__field textarea{
    width: 100%;
    height: 200px;
  }
  .autocomplete__description{
    color: dimgray;
    font-size: 80%;
    font-style: italic;
  }
</style>
