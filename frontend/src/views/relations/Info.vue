<template>
  <div class="form">
    <div class="form__field">
      <CustomSelect
        v-if="personsList"
        v-model="entity.personId"
        :options="personsList"
        :label="$t('form.person')"
      />
    </div>
    <div class="form__field">
      <CustomSelect
        v-if="locationsList"
        :options="locationsList"
        v-model="entity.locationId"
        :label="$t('form.location')"
      />
    </div>
    <div class="form__field">
      <label :for="$id('relationType')">{{ $t('form.relation') }}: </label>
      <select
        :id="$id('relationType')"
        v-model="entity.relationId"
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
  </div>
</template>

<script>
  import CustomSelect from '../../components/CustomSelect';
  import axios from 'axios';
  import RelationTypeModel from '../../models/relationType';
  import PersonModel from '../../models/person';
  import LocationModel from '../../models/location';

  export default {
    name: 'RelationsInfo',
    components: {
      CustomSelect
    },
    props: {
      entity: {
        type: Object,
        required: true
      },
      editable: Boolean
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
