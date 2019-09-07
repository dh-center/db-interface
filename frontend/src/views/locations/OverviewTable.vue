<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th>
          {{ $t('locations.name') }}
        </th>
        <th>
          {{ $t('locations.address') }}
        </th>
        <th>
          {{ $t('locations.constructionDate') }}
        </th>
        <th>
          {{ $t('locations.demolitionDate') }}
        </th>
        <th>
          {{ $t('locations.buildingType') }}
        </th>
        <th>
          {{ $t('locations.description') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="location in locationsList"
        :key="location._id"
      >
        <td>
          <button @click="$router.push({name:'locations-overview-specific', params: {locationId: location.id}})">
            View
          </button>
        </td>
        <td>
          {{ location.name }}
        </td>
        <td>
          {{ location.address }}
        </td>
        <td>
          {{ location.constructionDate }}
        </td>
        <td>
          {{ location.demolitionDate }}
        </td>
        <td>
          {{ location.buildingType }}
        </td>
        <td>
          {{ location.description }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import LocationModel from '../../models/location';
  import axios from 'axios';

  export default {
    name: 'LocationsOverviewTable',
    data() {
      return {
        locationsList: []
      };
    },
    async created() {
      this.locationsList = (await axios.get('/locations')).map(location => new LocationModel(location));
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
