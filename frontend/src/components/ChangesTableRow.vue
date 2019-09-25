<template>
  <tr :class="{'changes-table-row--deleted': changeRecord.deleted}">
    <td>{{ rowIndex }}</td>
    <td class="data-table__actions-cell">
      <button
        class="button button--primary"
        @click="openView"
      >
        {{ $t('entities.view') }}
      </button>
      <ApproveButton
        :change-record-id="changeRecord && changeRecord._id"
        :entity-type="model.entityType"
        @success="$emit('successfulApprove')"
      />
      <RejectButton
        v-if="changeRecord"
        :change-record-id="changeRecord._id"
        :entity-type="model.entityType"
        :user-id="changeRecord.user._id"
        @success="$emit('successfulApprove')"
      />
    </td>
    <td>{{ changeRecord.user.username }}</td>
    <td
      v-for="(fieldName, index) in model.fields"
      :key="index"
    >
      {{ entity[fieldName] }}
    </td>
  </tr>
</template>

<script>
  /* eslint-disable new-cap */

  import ApproveButton from './ApproveButton';
  import RejectButton from './RejectButton';
  export default {
    name: 'ChangesTableRow',
    components: {
      RejectButton,
      ApproveButton
    },
    props: {
      rowIndex: {
        type: Number,
        required: true
      },
      model: {
        type: Function,
        required: true
      },
      changeRecord: {
        type: Object,
        required: true
      }
    },
    computed: {
      entity() {
        return new this.model(this.changeRecord.changedEntity);
      }
    },
    methods: {
      openView() {
        if (!this.changeRecord.isCreated) {
          this.$router.push({ name: `${this.model.entityType}-overview-specific`, params: { entityId: this.changeRecord.entity._id } });
        } else {
          this.$router.push({ name: `${this.model.entityType}-create`, params: { changeRecordId: this.changeRecord._id } });
        }
      }
    }
  };
</script>

<style>
  .changes-table-row {
    &--deleted {
      background-color: rgba(255, 32, 0, 0.63) !important;
    }
  }
</style>
