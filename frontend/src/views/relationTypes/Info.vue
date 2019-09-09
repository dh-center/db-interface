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
      <input
        :id="$id('synonymName')"
        v-model="currentSynonym.name"
        type="text"
      >
      <div
        v-for="(synonym, index) in entity.synonyms"
        :key="index"
        :class="{'relation-types-info__synonyms-list-item--current': synonym === currentSynonym}"
        class="relation-types-info__synonyms-list-item"
        @click.self="currentSynonym = synonym"
      >
        <div>{{ index }}. {{ synonym.name }}</div><button class="relation-types-info__synonym-delete-button">
          -
        </button>
      </div>
      <button @click="entity.insertNewSynonym()">
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
    data() {
      return {
        currentSynonym: (this.entity.synonyms && this.entity.synonyms[0]) || null
      };
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>

<style>
  .relation-types-info {
    &__synonyms-list-item {
      display: flex;
      cursor: pointer;

      &:hover, &--current {
        background-color: gray;
      }
    }

    &__synonym-delete-button {
      margin-left: auto;
    }
  }
</style>
