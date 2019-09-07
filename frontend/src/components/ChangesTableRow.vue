<template>
  <tr>
    <td>
      <button @click="$emit('onViewButtonClicked')">
        View
      </button>
      <button @click="$emit('onApproveButtonClicked')">
        Approve
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

  import jsonpatch from 'fast-json-patch';

  export default {
    name: 'ChangesTableRow',
    props: {
      changeList: {
        type: Array,
        required: true
      },
      entityData: {
        type: Object,
        required: true
      },
      model: {
        type: Function,
        required: true
      }
    },
    computed: {
      entity() {
        return new this.model(jsonpatch.applyPatch(this.entityData, this.changeList).newDocument);
      }
    }
  };
</script>
