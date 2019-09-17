<template>
  <div class="entities-overview-create">
    <button
      v-if="isUserCanEditThisEntity"
      class="button button--primary"
      @click="saveEntity"
    >
      {{ $t('entities.save') }}
    </button>
    <ApproveButton
      v-if="changeRecord"
      :change-record-id="changeRecord._id"
      :entity-type="model.entityType"
      @success="$router.push({ name: `${model.entityType}-overview` })"
    />
    <RejectButton
      v-if="changeRecord"
      :user-id="changeRecord.user"
      :change-record-id="changeRecord._id"
      :entity-type="model.entityType"
      @success="$router.push({ name: `${model.entityType}-overview` })"
    />
    <div class="entities-overview-create__info-wrapper">
      <component
        :is="infoComponent"
        v-if="entity"
        ref="entityInfo"
        class="entities-overview-create__info"
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
  import ApproveButton from '../../components/ApproveButton';
  import RejectButton from '../../components/RejectButton';

  export default {
    name: 'EntitiesOverviewSpecific',
    components: {
      RejectButton,
      ApproveButton
    },
    props: {
      model: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        loaded: false,
        entity: null,
        changeRecord: null,
        infoComponent: null
      };
    },
    computed: {
      isUserCanEditThisEntity() {
        return this.loaded && (this.changeRecord ? (this.$store.state.auth.user.id === this.changeRecord.user) : true);
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
        this.loaded = true;
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

    .button {
      margin-left: 5px;
    }

    &__info-wrapper {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
    }

    &__info {
      width: 400px;
    }
  }
</style>
