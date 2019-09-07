<template>
  <div class="locations-overview-create">
    <LocationInfo
      v-if="location"
      ref="locationInfo"
      editable
      :location="location"
    />
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

  export default {
    name: 'LocationsOverviewSpecific',
    components: {
      LocationInfo
    },
    data() {
      return {
        location: null
      };
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        const { changeRecordId } = this.$route.params;

        const locationData = {};

        if (changeRecordId) {
          const changeRecord = await axios.get(`/changes/locations/${changeRecordId}`);

          this.location = new LocationModel(jsonpatch.applyPatch({}, changeRecord.changeList).newDocument);
        } else {
          this.location = new LocationModel(locationData);
        }
      },
      async saveLocation() {
        if (this.$route.params.changeRecordId) {
          await axios.patch(`/changes/locations/${this.$route.params.changeRecordId}`, this.location.data);
        } else {
          const changesRecord = await axios.post('/changes/locations', this.location.data);

          this.$router.push({
            name: 'locations-create',
            params: {
              changeRecordId: changesRecord._id
            }
          });
        }
      }
    }
  };
</script>
