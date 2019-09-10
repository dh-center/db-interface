<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <CustomSelect
        v-model="entity.personId"
        :disabled="!editable"
        :options="personsList"
        :label="$t('form.person')"
      />
    </div>
    <div class="entity-info__section">
      <CustomSelect
        v-model="entity.locationId"
        :disabled="!editable"
        :options="locationsList"
        :label="$t('form.location')"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('relationType')">{{ $t('form.relation') }}: </label>
      <select
        :id="$id('relationType')"
        v-model="entity.relationId"
        :disabled="!editable"
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
    <div class="entity-info__section">
      <label :for="$id('quote')">{{ $t('form.quotes') }}: </label>
      <textarea
        :id="$id('quote')"

        v-model="entity.quote"
        :disabled="!editable"
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
        personsList: [],
        locationsList: []
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        axios.get('/persons').then(persons => (this.personsList = persons.map(person => new PersonModel(person))));
        axios.get('/locations').then(persons => (this.locationsList = persons.map(person => new LocationModel(person))));
        axios.get('/relationTypes').then(persons => (this.relationTypes = persons.map(person => new RelationTypeModel(person))));
      }
    }
  };

</script>
<style src="../../styles/entity-info.css"></style>
