<template>
  <tr :class="{'changes-table-row--deleted': deleted}">
    <td>{{ rowIndex }}</td>
    <td>
      <button @click="$emit('onViewButtonClicked')">
        {{ $t('entities.view') }}
      </button>
      <button
        v-if="$store.state.auth.user.isAdmin"
        @click="$emit('onApproveButtonClicked')"
      >
        {{ $t('entities.approve') }}
      </button>
    </td>
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

  export default {
    name: 'ChangesTableRow',
    props: {
      changedEntity: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number,
        required: true
      },
      model: {
        type: Function,
        required: true
      },
      deleted: Boolean
    },
    computed: {
      entity() {
        return new this.model(this.changedEntity);
      }
    }
  };
</script>

<style>
  .changes-table-row--deleted {
    background-color: rgba(255, 32, 0, 0.63) !important;
  }
</style>
