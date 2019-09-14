<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('name')"
      >{{ $t('locationTypes.name') }}</label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LocationTypesInfo',
    props: {
      entity: {
        type: Object,
        required: true
      },
      editable: Boolean
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
