<template>
  <div>
    <button @click="$router.push({name: 'persons-create'})">
      Add new person
    </button>
    <table border="1">
      <tr
        v-for="person in personsList"
        :key="person._id"
      >
        <td>{{ person.firstName }}</td>
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
