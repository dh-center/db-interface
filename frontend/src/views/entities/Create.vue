<template>
  <div class="entities-overview-create">
    <button
      v-if="isUserCanEditThisEntity"
      @click="saveEntity"
    >
      {{ $t('entities.save') }}
    </button>
    <button
      v-if="$store.state.auth.user.isAdmin && $route.params.changeRecordId"
      @click="approve"
    >
      {{ $t('entities.approve') }}
    </button>
    <div class="entities-overview-create__info">
      <component
        :is="infoComponent"
        v-if="entity"
        ref="entityInfo"
        :editable="isUserCanEditThisEntity"
        :entity="entity"
      />
    </div>
  </div>
</template>

<script>
  /* eslint-disable new-cap */

  import axios from 'axios';
  import jsonpatch from 'fast-json-patch';
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
        entity: null,
        changeRecord: null,
        infoComponent: null
      };
    },
    computed: {
      isUserCanEditThisEntity() {
        return this.changeRecord ? (this.$store.state.auth.user.id === this.changeRecord.user) : true;
      }
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.infoComponent = (await import(`../${this.model.entityType}/Info`)).default;

        const { changeRecordId } = this.$route.params;

        if (changeRecordId) {
          this.changeRecord = await axios.get(`/changes/${this.model.entityType}/${changeRecordId}`);

          this.entity = new this.model(jsonpatch.applyPatch({}, this.changeRecord.changeList).newDocument);
        } else {
          this.entity = new this.model();
        }
      },

      async approve() {
        const { changeRecordId } = this.$route.params;

        try {
          await axios.put(`/changes/${this.model.entityType}/${changeRecordId}/approval`);
          this.$router.push({ name: `${this.model.entityType}-overview` });
        } catch (e) {
          notifier.show({
            message: e.message,
            style: 'error',
            time: 2000
          });
        }
      },

      async saveEntity() {
        if (this.$route.params.changeRecordId) {
          try {
            await axios.patch(`/changes/${this.model.entityType}/${this.$route.params.changeRecordId}`, { changedEntity: this.entity.data });
          } catch (e) {
            notifier.show({
              message: e.message,
              style: 'error',
              time: 2000
            });

            return;
          }
        } else {
          this.changesRecord = await axios.post(`/changes/${this.model.entityType}`, { changedEntity: this.entity.data });

          this.$router.push({
            name: `${this.model.entityType}-create`,
            params: {
              changeRecordId: this.changesRecord._id
            }
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
  .entities-overview-create {
    &__info {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
