<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th>
          {{ $t('persons.firstName') }}
        </th>
        <th>
          {{ $t('persons.lastName') }}
        </th>
        <th>
          {{ $t('persons.patronymic') }}
        </th>
        <th>
          {{ $t('persons.description') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="person in personsList"
        :key="person._id"
      >
        <td>
          <button @click="$router.push({name: 'persons-overview-specific', params: {personId: person.id}})">
            View
          </button>
        </td>
        <td>
          {{ person.firstName }}
        </td>
        <td>
          {{ person.lastName }}
        </td>
        <td>
          {{ person.patronymic }}
        </td>
        <td>
          {{ person.description }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import PersonModel from '../../models/person';
  import axios from 'axios';

  export default {
    name: 'PersonsOverviewTable',
    data() {
      return {
        personsList: []
      };
    },
    async created() {
      this.personsList = (await axios.get('/persons')).map(person => new PersonModel(person));
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
