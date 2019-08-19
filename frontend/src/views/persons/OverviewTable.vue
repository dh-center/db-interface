<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ $t('persons.' + name) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="person in personsList"
        :key="person._id"
      >
        <td>
          <button @click="$router.push({name: 'persons-edit', params: {personId: person._id}})">
            View
          </button>
        </td>
        <td
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ person[name] && person[name][dataLanguage] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
  import PersonModel from '../../models/person';
  import axios from 'axios';

  export default {
    name: 'PersonsOverviewTable',
    data() {
      return {
        schema: PersonModel.schema.fields,
        personsList: []
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    async created() {
      this.personsList = await axios.get('/persons');
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
