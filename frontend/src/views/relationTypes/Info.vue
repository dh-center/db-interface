<template>
  <div class="entity-info relation-types-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('name')"
      >{{ $t('relationTypes.name') }}</label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label>{{ $t('relationTypes.synonyms') }}</label>
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
                :disabled="!editable"
              >
            </td>
            <td v-if="editable">
              <button
                v-if="editable"
                class="relation-types-info__synonym-delete-button"
                @click="entity.deleteSynonym(synonym)"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        v-if="editable"
        @click="entity.insertNewSynonym()"
      >
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
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
