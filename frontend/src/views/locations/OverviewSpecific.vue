<template>
  <div class="locations-overview-specific">
    <div class="locations-overview-specific__container">
      <LocationInfo
        v-if="originalLocation"
        ref="originalLocationInfo"
        :location="originalLocation"
      />
      <LocationInfo
        v-if="changedLocation"
        ref="changedLocationInfo"
        :location="changedLocation"
        editable
      />
    </div>
    <button @click="saveLocation">
      Save
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  import LocationInfo from './Info';
  import LocationModel from '../../models/location';
  import jsonpatch from 'fast-json-patch';
  import cloneDeep from 'lodash.clonedeep';

  export default {
    name: 'LocationsOverviewSpecific',
    components: {
      LocationInfo
    },
    data() {
      return {
        originalLocation: null, // location data before modification
        lastChangesRecord: null,
        changedLocation: null
      };
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        const locationData = await axios.get(`/locations/${this.$route.params.locationId}`, {
          params: {
            withLastChanges: true
          }
        });

        // If location was modified
        if (locationData.lastChangesRecord) {
          this.lastChangesRecord = locationData.lastChangesRecord;
          delete locationData.lastChangesRecord;

          this.changedLocation = new LocationModel(jsonpatch.applyPatch(cloneDeep(locationData), this.lastChangesRecord.changeList).newDocument);
        } else {
          // If location was not modified yet
          this.changedLocation = new LocationModel(locationData);
        }

        this.originalLocation = new LocationModel(locationData);
      },

      async saveLocation() {
        if (this.lastChangesRecord) {
          // Update existing changes record
          await axios.patch(`/changes/locations/${this.lastChangesRecord._id}`, this.changedLocation.data);
        } else {
          // Create new changes record
          this.lastChangesRecord = await axios.post(`/changes/locations/${this.lastChangesRecord._id}`, this.changedLocation.data);
        }
      }
    }
  };
</script>

<style>
  .locations-overview-specific {
    &__container {
      display: flex;
    }
  }
</style>
