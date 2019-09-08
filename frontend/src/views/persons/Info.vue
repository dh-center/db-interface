<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('firstName')"
      >First name</label>
      <input
        :id="$id('firstName')"
        v-model="entity.firstName"
        type="text"
        :disabled="!editable"
        placeholder="person first name"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('lastName')"
      >Last name</label>
      <input
        :id="$id('lastName')"
        v-model="entity.lastName"
        type="text"
        :disabled="!editable"
        placeholder="person last name"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('patronymic')"
      >Patronymic</label>
      <input
        :id="$id('patronymic')"
        v-model="entity.patronymic"
        type="text"
        :disabled="!editable"
        placeholder="person patronymic"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('birthDate')"
      >Birth date</label>
      <input
        :id="$id('birthDate')"
        v-model="entity.birthDate"
        type="text"
        :disabled="!editable"
        placeholder="person birth date"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('deathDate')"
      >Birth date</label>
      <input
        :id="$id('deathDate')"
        v-model="entity.deathDate"
        type="text"
        :disabled="!editable"
        placeholder="person death date"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('description')"
      >Description</label>
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
