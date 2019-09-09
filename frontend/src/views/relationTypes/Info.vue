<template>
  <div class="entity-info relation-types-info">
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
      <label :for="$id('synonymName')">Synonym name</label>
      <table>
        <tbody>
          <tr
            v-for="(synonym, index) in entity.synonyms"
            :key="index"
            class="relation-types-info__synonyms-list-item"
          >
            <td>{{ index + 1 }}.</td>
            <td>
              <input
                v-model="synonym.name"
                type="text"
              >
            </td>
            <td>
              <button
                class="relation-types-info__synonym-delete-button"
                @click="entity.deleteSynonym(synonym)"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="insertNewSynonym">
        +
      </button>
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
    methods: {
      insertNewSynonym() {
        this.entity.insertNewSynonym();
        // this.$refs.synonymName.focus();
      }
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
