<template>
  <div class="entities-overview-specific">
    <div class="entities-overview-specific__container">
      <component
        :is="infoComponent"
        v-if="originalEntity"
        ref="originalEntityInfo"
        :entity="originalEntity"
      />
      <component
        :is="infoComponent"
        v-if="changedEntity"
        ref="changedEntityInfo"
        :entity="changedEntity"
        editable
      />
    </div>
    <button @click="saveEntity">
      {{ $t('entities.save') }}
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
        originalEntity: null, // entity data before modification
        lastChangesRecord: null,
        changedEntity: null,
        infoComponent: null
      };
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.infoComponent = (await import(`../${this.model.entityType}/Info`)).default;

        const entityData = await axios.get(`/${this.model.entityType}/${this.$route.params.entityId}`, {
          params: {
            withLastChanges: true
          }
        });

        // If entity was modified
        if (entityData.lastChangesRecord) {
          this.lastChangesRecord = entityData.lastChangesRecord;
          delete entityData.lastChangesRecord;

          this.changedEntity = new this.model(jsonpatch.applyPatch(cloneDeep(entityData), this.lastChangesRecord.changeList).newDocument);
        } else {
          // If entity was not modified yet
          this.changedEntity = new this.model(entityData);
        }

        this.originalEntity = new this.model(entityData);
      },

      async saveEntity() {
        if (this.lastChangesRecord) {
          // Update existing changes record
          await axios.patch(`/changes/${this.model.entityType}/${this.lastChangesRecord._id}`, this.changedEntity.data);
        } else {
          // Create new changes record
          this.lastChangesRecord = await axios.post(`/changes/${this.model.entityType}/${this.originalEntity.id}`, this.changedEntity.data);
        }
      }
    }
  };
</script>

<style>
  .entities-overview-specific {
    &__container {
      display: flex;
    }
  }
</style>
