<template>
  <div class="form">
    <h1>{{ $t('form.header') }}</h1>
    <form @submit.prevent="saveRelation">
      <div class="form__field">
        <CustomSelect
          v-if="personsList"
          v-model="selectedPerson"
          :options="personsList"
          :label="$t('form.person')"
        />
      </div>
      <div class="form__field">
        <CustomSelect
          v-if="locationsList"
          :options="locationsList"
          :value="selectedLocation"
          :label="$t('form.location')"
        />
      </div>
      <div class="form__field">
        <label for="relationType">{{ $t('form.relation') }}: </label>
        <select
          id="relationType"
          v-model="selectedRelation"
          name="relationType"
        >
          <option
            v-for="relationType in relationTypes"
            :key="relationType.id"
            :value="relationType.id"
          >
            {{ relationType.name }}
          </option>
        </select>
      </div>
      <div class="form__field">
        <label for="quote">{{ $t('form.quotes') }}: </label>
        <textarea
          id="quote"
          v-model="quote"
        />
      </div>
      <button type="submit">
        {{ $t('form.save') }}
      </button>
    </form>
    <button
      class="form_link"
      @click="logout"
    >
      {{ $t('auth.headers.logout') }}
    </button>
  </div>
</template>

<script>
  import Autocomplete from 'vuejs-auto-complete';
  import CustomSelect from '../components/CustomSelect';
  import axios from 'axios';
  import { RESET_STORE } from '../store/actions';
  import RelationTypeModel from '../models/relationType';
  import PersonModel from '../models/person';
  import LocationModel from '../models/location';

  export default {
    name: 'Form',
    components: {
      CustomSelect
    },
    data() {
      return {
        relationTypes: [],
        personsList: null,
        locationsList: null,
        selectedRelation: null,
        quote: null,
        selectedPerson: null,
        selectedLocation: null
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.personsList = (await axios.get('/persons')).map(person => new PersonModel(person));
        this.locationsList = (await axios.get('/locations')).map(location => new LocationModel(location));
        this.relationTypes = (await axios.get('/relationTypes')).map(relationType => new RelationTypeModel(relationType));
      },
      logout() {
        this.$store.dispatch(RESET_STORE);
      },
      saveRelation() {
        axios.post('/relations', {
          relationId: this.selectedRelation.id,
          quote: this.quote,
          personId: this.selectedPerson.id,
          locationId: this.selectedLocation.id
        });
      }
    }
  };

</script>

<style>
  .form {
    width: 600px;
    margin-left: calc(50vw - 313px);
  }

  .form__field {
    margin-bottom: 10px;
  }

  .form__field select {
    width: 25%;
  }

  .form__field textarea {
    width: 100%;
    height: 200px;
  }

  .autocomplete__description {
    color: dimgray;
    font-size: 80%;
    font-style: italic;
  }

  .form_link {
    display: inline-block;
    margin-top: 5px;
  }
</style>
