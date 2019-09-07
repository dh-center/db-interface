<template>
  <div class="locations-overview-specific">
    <div class="locations-overview-specific__container">
      <component
        :is="infoComponent"
        v-if="originalLocation"
        ref="originalLocationInfo"
        :entity="originalLocation"
      />
      <component
        :is="infoComponent"
        v-if="changedLocation"
        ref="changedLocationInfo"
        :entity="changedLocation"
        editable
      />
    </div>
    <button @click="saveLocation">
      Save
    </button>
  </div>
</template>

<script>
  /* eslint-disable new-cap */

  import axios from 'axios';
  import jsonpatch from 'fast-json-patch';
  import cloneDeep from 'lodash.clonedeep';

  export default {
    name: 'EntitiesOverviewSpecific',
    props: {
      model: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        originalLocation: null, // location data before modification
        lastChangesRecord: null,
        changedLocation: null,
        infoComponent: null
      };
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.infoComponent = (await import(`../${this.model.entityType}/Info`)).default;

        const locationData = await axios.get(`/${this.model.entityType}/${this.$route.params.entityId}`, {
          params: {
            withLastChanges: true
          }
        });

        // If location was modified
        if (locationData.lastChangesRecord) {
          this.lastChangesRecord = locationData.lastChangesRecord;
          delete locationData.lastChangesRecord;

          this.changedLocation = new this.model(jsonpatch.applyPatch(cloneDeep(locationData), this.lastChangesRecord.changeList).newDocument);
        } else {
          // If location was not modified yet
          this.changedLocation = new this.model(locationData);
        }

        this.originalLocation = new this.model(locationData);
      },

      async saveLocation() {
        if (this.lastChangesRecord) {
          // Update existing changes record
          await axios.patch(`/changes/${this.model.entityType}/${this.lastChangesRecord._id}`, this.changedLocation.data);
        } else {
          // Create new changes record
          this.lastChangesRecord = await axios.post(`/changes/${this.model.entityType}/${this.lastChangesRecord._id}`, this.changedLocation.data);
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
