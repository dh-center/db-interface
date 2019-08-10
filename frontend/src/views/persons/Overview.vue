<template>
  <div>
    <button @click="$router.push({name: 'persons-create'})">
      Add new person
    </button>
    <table border="1">
      <tr>
        <td>Имя</td>
        <td>Фамилия</td>
        <td>Отчество</td>
        <td>Псевдоним</td>
        <td>Профессия</td>
        <td>Описание</td>
      </tr>
      <tr
        v-for="person in personsList"
        :key="person._id"
      >
        <td>{{ person.firstName }}</td>
        <td>{{ person.lastName }}</td>
        <td>{{ person.patronymic }}</td>
        <td>{{ person.pseudonym }}</td>
        <td>{{ person.profession }}</td>
        <td>{{ person.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { FETCH_ALL } from '../../store/modules/persons/actionTypes';

  export default {
    name: 'PersonsOverview',
    computed: mapState({
      personsList: state => state.persons.list
    }),
    created() {
      this.$store.dispatch(FETCH_ALL);
    }
  };
</script>
