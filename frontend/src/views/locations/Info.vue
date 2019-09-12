<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label :for="$id('name')">
        {{ $t('locations.name') }}
      </label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('constructionDate')">
        {{ $t('locations.constructionDate') }}
      </label>
      <input
        :id="$id('constructionDate')"
        v-model="entity.constructionDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('demolitionDate')">
        {{ $t('locations.demolitionDate') }}
      </label>
      <input
        :id="$id('demolitionDate')"
        v-model="entity.demolitionDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('buildingType')">
        {{ $t('locations.buildingType') }}
      </label>
      <input
        :id="$id('buildingType')"
        v-model="entity.buildingType"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('description')">
        {{ $t('locations.description') }}
      </label>
      <textarea
        :id="$id('description')"
        v-model="entity.description"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LocationsInfo',
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
