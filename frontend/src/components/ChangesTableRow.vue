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
      v-for="(field, name) in schema"
      :key="name"
    >
      {{ resultingEntity[name] && resultingEntity[name][dataLanguage] }}
    </td>
  </tr>
</template>

<script>
  import jsonpatch from 'fast-json-patch';
  import { mapState } from 'vuex';

  export default {
    name: 'ChangesTableRow',
    props: {
      schema: {
        type: Object,
        required: true
      },
      changeList: {
        type: Array,
        required: true
      },
      entity: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState({
        dataLanguage: state => state.app.dataLanguage
      }),
      resultingEntity() {
        return jsonpatch.applyPatch(this.entity, this.changeList).newDocument;
      }
    }
  };
</script>
