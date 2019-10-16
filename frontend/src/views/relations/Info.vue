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
      <CustomSelect
        v-model="entity.relationId"
        :disabled="!editable"
        :options="relationTypesList"
        :label="$t('form.relation')"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('quote')">{{ $t('form.quotes') }}: </label>
      <textarea
        :id="$id('quote')"
        v-model="entity.quote"
        class="entity-info__description"
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
        relationTypesList: [],
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
        axios.get('/locations').then(locations => (this.locationsList = locations.map(location => new LocationModel(location))));
        axios.get('/relationTypes').then(relationTypes => (this.relationTypesList = relationTypes.map(relationType => new RelationTypeModel(relationType))));
      }
    }
  };

</script>
<style src="../../styles/entity-info.css"></style>
