<template>
  <div class="entity-info">
    <div class="entity-info__section">
      {{ entity.personId }}
      <CustomSelect
        v-model="entity.personId"
        :options="personsList"
        :label="$t('form.person')"
      />
    </div>
    <div class="entity-info__section">
      <CustomSelect
        v-model="entity.locationId"
        :options="locationsList"
        :label="$t('form.location')"
      />
    </div>
    <div class="entity-info__section">
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
    <div class="entity-info__section">
      <label :for="$id('quote')">{{ $t('form.quotes') }}: </label>
      <textarea
        :id="$id('quote')"
        v-model="entity.quote"
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
        this.personsList = (await axios.get('/persons')).map(person => new PersonModel(person));
        this.locationsList = (await axios.get('/locations')).map(location => new LocationModel(location));
        this.relationTypes = (await axios.get('/relationTypes')).map(relationType => new RelationTypeModel(relationType));
      }
    }
  };

</script>
<style src="../../styles/entity-info.css"></style>
