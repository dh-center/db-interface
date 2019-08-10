<template>
  <div>
    Persons create
    <form @submit.prevent="createPerson">
      <input
        v-model="firstName"
        type="text"
        placeholder="Имя"
      >
      <input
        v-model="lastName"
        type="text"
        placeholder="Фамилия"
      >
      <input
        v-model="patronymic"
        type="text"
        placeholder="Отчество"
      >
      <input
        type="submit"
        value="Create person"
      >
    </form>
  </div>
</template>

<script>
  import { CREATE_NEW_PERSON } from '../../store/modules/persons/actionTypes';

  export default {
    name: 'PersonsCreate',
    data() {
      return {
        firstName: '',
        lastName: '',
        patronymic: ''
      };
    },
    methods: {
      async createPerson() {
        await this.$store.dispatch(CREATE_NEW_PERSON, {
          firstName: this.firstName,
          lastName: this.lastName,
          patronymic: this.patronymic
        });

        this.$router.push({ name: 'persons-overview' });
      }
    }
  };
</script>
