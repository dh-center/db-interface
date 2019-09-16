<template>
  <div class="entities-overview-specific">
    <button @click="isEditMode = true">
      {{ $t('entities.edit') }}
    </button>
    <button
      v-if="isUserCanEditThisEntity"
      @click="saveEntity"
    >
      {{ $t('entities.save') }}
    </button>
    <button
      v-if="isUserCanEditThisEntity && !deleted"
      @click="deleteEntity"
    >
      {{ $t('entities.markForDeletion') }}
    </button>
    <button
      v-if="isUserCanEditThisEntity && deleted"
      @click="cancelDeletion"
    >
      {{ $t('entities.cancelDeletion') }}
    </button>
    <button
      v-if="$store.state.auth.user.isAdmin && lastChangesRecord"
      @click="approve"
    >
      {{ $t('entities.approve') }}
    </button>
    <div class="entities-overview-specific__container">
      <div>
        <h2 v-if="isChangedEntityShowed">
          {{ $t('entities.beforeChanges') }}
        </h2>
        <component
          :is="infoComponent"
          v-if="originalEntity"
          class="entities-overview-specific__original-entity"
          :entity="originalEntity"
        />
      </div>
      <div
        v-if="isChangedEntityShowed"
        class="entities-overview-specific__delimiter"
      />
      <div v-if="isChangedEntityShowed">
        <h2>{{ $t('entities.afterChanges') }}</h2>
        <div
          v-if="deleted"
          class="entities-overview-specific__deleted-message"
        >
          {{ $t('entities.deletedMessage') }}
        </div>
        <component
          :is="infoComponent"
          v-if="changedEntity"
          class="entities-overview-specific__changed-entity"
          :entity="changedEntity"
          :editable="isUserCanEditThisEntity"
        />
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable new-cap */

  import axios from 'axios';
  import jsonpatch from 'fast-json-patch';
  import cloneDeep from 'lodash.clonedeep';
  import notifier from 'codex-notifier';

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
        infoComponent: null,
        deleted: false,
        isEditMode: false
      };
    },
    computed: {
      isChangedEntityShowed() {
        return this.lastChangesRecord || this.isEditMode;
      },

      isUserCanEditThisEntity() {
        return this.lastChangesRecord ? this.$store.state.auth.user.id === this.lastChangesRecord.user : true;
      }
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      deleteEntity() {
        this.deleted = true;
        this.saveEntity();
      },

      cancelDeletion() {
        this.deleted = false;
        this.saveEntity();
      },

      async approve() {
        try {
          await axios.put(`/changes/${this.model.entityType}/${this.lastChangesRecord._id}/approval`);
          this.$router.push({ name: `${this.model.entityType}-overview` });
        } catch (e) {
          notifier.show({
            message: e.message,
            style: 'error',
            time: 2000
          });
        }
      },

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
          this.deleted = this.lastChangesRecord.deleted;

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
          try {
            await axios.patch(`/changes/${this.model.entityType}/${this.lastChangesRecord._id}`, {
              changedEntity: this.changedEntity.data,
              deleted: this.deleted
            });
          } catch (e) {
            notifier.show({
              message: e.message,
              style: 'error',
              time: 2000
            });

            return;
          }
        } else {
          // Create new changes record
          this.lastChangesRecord = await axios.post(`/changes/${this.model.entityType}/${this.originalEntity.id}`, {
            changedEntity: this.changedEntity.data,
            deleted: this.deleted
          });
        }

        notifier.show({
          message: this.$t('notifications.savedSuccessfully'),
          time: 2000
        });
      }
    }
  };
</script>

<style>
  .entities-overview-specific {
    &__container {
      display: flex;
      justify-content: space-around;
    }

    &__original-entity,
    &__changed-entity {
      min-width: 400px;
    }

    &__delimiter {
      margin: 10px;
      border-left: 1px solid black;
    }

    &__deleted-message {
      border: 1px solid black;
      padding: 5px;
      margin: 5px;
      background-color: rgba(255, 32, 0, 0.63);
    }
  }
</style>
