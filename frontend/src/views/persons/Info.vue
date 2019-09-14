<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('firstName')"
      >{{ $t('persons.firstName') }}</label>
      <input
        :id="$id('firstName')"
        v-model="entity.firstName"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('lastName')"
      >{{ $t('persons.lastName') }}</label>
      <input
        :id="$id('lastName')"
        v-model="entity.lastName"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('patronymic')"
      >{{ $t('persons.patronymic') }}</label>
      <input
        :id="$id('patronymic')"
        v-model="entity.patronymic"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('birthDate')"
      >{{ $t('persons.birthDate') }}</label>
      <input
        :id="$id('birthDate')"
        v-model="entity.birthDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('deathDate')"
      >{{ $t('persons.deathDate') }}</label>
      <input
        :id="$id('deathDate')"
        v-model="entity.deathDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('description')"
      >{{ $t('persons.description') }}</label>
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
    name: 'PersonsInfo',
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
