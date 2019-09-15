<template>
  <tr>
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
      model: {
        type: Function,
        required: true
      }
    },
    computed: {
      entity() {
        return new this.model(this.changedEntity);
      }
    }
  };
</script>
