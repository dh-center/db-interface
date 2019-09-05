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
    <td>
      {{ person.firstName }}
    </td>
    <td>
      {{ person.lastName }}
    </td>
    <td>
      {{ person.patronymic }}
    </td>
    <td>
      {{ person.description }}
    </td>
  </tr>
</template>

<script>
  import jsonpatch from 'fast-json-patch';
  import PersonModel from '../models/person';

  export default {
    name: 'ChangesTableRow',
    props: {
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
      person() {
        return new PersonModel(jsonpatch.applyPatch(this.entity, this.changeList).newDocument);
      }
    }
  };
</script>
