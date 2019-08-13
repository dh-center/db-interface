<template>
  <table class="persons-overview__table">
    <tr>
      <td>Actions</td>
      <td
        v-for="(field, name) in schema"
        :key="name"
      >
        {{ $t('persons.' + name) }}
      </td>
    </tr>
    <tr
      v-for="person in personsList"
      :key="person._id"
    >
      <td>
        <button @click="$router.push({name: 'persons-edit', params: {personId: person._id}})">
          Edit
        </button>
      </td>
      <td
        v-for="(field, name) in schema"
        :key="name"
      >
        {{ person[name] && person[name][dataLanguage] }}
      </td>
    </tr>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
  import schema from './schema';
  import axios from 'axios';

  export default {
    name: 'PersonsOverviewTable',
    data() {
      return {
        schema,
        personsList: {}
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

<style scoped>

</style>
