<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ $t('locations.'+name) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="location in locationsList"
        :key="location._id"
      >
        <td>
          <button @click="$router.push({name:'', params: {locationId: location._id}})">
            Edit
          </button>
        </td>
        <td
          v-for="(field,name) in schema"
          :key="name"
        >
          {{ location[name] && location[name][dataLanguage] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
  import LocationModel from '../../models/location';
  import axios from 'axios';

  export default {
    name: 'LocationsOverviewTable',
    data() {
      return {
        schema: LocationModel.schema.fields,
        locationsList: []
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    async created() {
      this.locationsList = await axios.get('/locations');
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
