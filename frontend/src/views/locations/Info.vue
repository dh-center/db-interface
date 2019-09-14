<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label :for="$id('name')">
        {{ $t('locations.name') }}
      </label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('constructionDate')">
        {{ $t('locations.constructionDate') }}
      </label>
      <input
        :id="$id('constructionDate')"
        v-model="entity.constructionDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('demolitionDate')">
        {{ $t('locations.demolitionDate') }}
      </label>
      <input
        :id="$id('demolitionDate')"
        v-model="entity.demolitionDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <CustomSelect
        v-model="entity.locationTypeId"
        :disabled="!editable"
        :options="locationTypesList"
        :label="$t('locations.buildingType')"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('description')">
        {{ $t('locations.description') }}
      </label>
      <textarea
        :id="$id('description')"
        v-model="entity.description"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import CustomSelect from '../../components/CustomSelect';
  import LocationTypeModel from '../../models/locationTypes';

  export default {
    name: 'LocationsInfo',
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
        locationTypesList: []
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        axios.get('/locationTypes').then(locationTypes => (this.locationTypesList = locationTypes.map(locationType => new LocationTypeModel(locationType))));
      }
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
