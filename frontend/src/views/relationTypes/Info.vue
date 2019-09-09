<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('name')"
      >Name</label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
        placeholder="relation type name"
      >
    </div>
    <div class="entity-info__section">
      <button @click="entity.insertNewSynonym()">
        +
      </button>
      <input
        v-model="currentSynonym.name"
        type="text"
      >
      <select
        v-model="currentSynonym"
      >
        <option
          v-for="synonym in entity.synonyms"
          :value="synonym"
        >
          {{ synonym.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RelationTypesInfo',
    props: {
      entity: {
        type: Object,
        required: true
      },
      editable: Boolean
    },
    data() {
      return {
        currentSynonym: (this.entity.synonyms && this.entity.synonyms[0]) || null
      };
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
