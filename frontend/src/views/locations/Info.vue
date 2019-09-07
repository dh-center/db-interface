<template>
  <div class="location-info">
    <div class="location-info__section">
      <label :for="$id('name')">
        {{ $t('locations.name') }}
      </label>
      <input
        :id="$id('name')"
        v-model="location.name"
        type="text"
        :disabled="!editable"
        :placeholder="$t('locations.name')"
      >
    </div>
    <div class="location-info__section">
      <label :for="$id('constructionDate')">
        {{ $t('locations.constructionDate') }}
      </label>
      <input
        :id="$id('constructionDate')"
        v-model="location.constructionDate"
        type="text"
        :disabled="!editable"
        :placeholder="$t('locations.constructionDate')"
      >
    </div>
    <div class="location-info__section">
      <label :for="$id('demolitionDate')">
        {{ $t('locations.demolitionDate') }}
      </label>
      <input
        :id="$id('demolitionDate')"
        v-model="location.demolitionDate"
        type="text"
        :disabled="!editable"
        :placeholder="$t('locations.demolitionDate')"
      >
    </div>
    <div class="location-info__section">
      <label :for="$id('buildingType')">
        {{ $t('locations.buildingType') }}
      </label>
      <input
        :id="$id('buildingType')"
        v-model="location.buildingType"
        type="text"
        :disabled="!editable"
        :placeholder="$t('locations.buildingType')"
      >
    </div>
    <div class="location-info__section">
      <label :for="$id('description')">
        {{ $t('locations.description') }}
      </label>
      <textarea
        :id="$id('description')"
        v-model="location.description"
        class="location-info__description"
        :disabled="!editable"
        :placeholder="$t('locations.description')"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LocationsInfo',
    props: {
      location: {
        type: Object,
        required: true
      },
      editable: Boolean
    }
  };
</script>

<style>
  .location-info {
    display: flex;
    flex-direction: column;
    width: 400px;

    &__section {
      width: 100%;
      display: flex;
      flex-direction: column;

      margin: auto auto 10px;
    }

    &__description {
      height: 400px;
    }
  }
</style>
