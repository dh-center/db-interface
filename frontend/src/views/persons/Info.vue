<template>
  <div class="person-info">
    <div class="person-info__section">
      <label
        class="person-info__label"
        :for="$id('firstName')"
      >First name</label>
      <input
        :id="$id('firstName')"
        v-model="person.firstName"
        type="text"
        :disabled="!editable"
        placeholder="person first name"
      >
    </div>
    <div class="person-info__section">
      <label
        class="person-info__label"
        :for="$id('lastName')"
      >Last name</label>
      <input
        :id="$id('lastName')"
        v-model="person.lastName"
        type="text"
        :disabled="!editable"
        placeholder="person last name"
      >
    </div>
    <div class="person-info__section">
      <label
        class="person-info__label"
        :for="$id('patronymic')"
      >Patronymic</label>
      <input
        :id="$id('patronymic')"
        v-model="person.patronymic"
        type="text"
        :disabled="!editable"
        placeholder="person patronymic"
      >
    </div>
    <div class="person-info__section">
      <label
        class="person-info__label"
        :for="$id('birthDate')"
      >Birth date</label>
      <input
        :id="$id('birthDate')"
        v-model="person.birthDate"
        type="text"
        :disabled="!editable"
        placeholder="person birth date"
      >
    </div>
    <div class="person-info__section">
      <label
        class="person-info__label"
        :for="$id('deathDate')"
      >Birth date</label>
      <input
        :id="$id('deathDate')"
        v-model="person.deathDate"
        type="text"
        :disabled="!editable"
        placeholder="person death date"
      >
    </div>
    <div class="person-info__section">
      <label
        class="person-info__label"
        :for="$id('description')"
      >Description</label>
      <textarea
        :id="$id('description')"
        v-model="person.description"
        class="person-info__description"
        :disabled="!editable"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PersonsInfo',
    props: {
      person: {
        type: Object,
        required: true
      },
      editable: Boolean
    }
  };
</script>

<style>
  .person-info {
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
