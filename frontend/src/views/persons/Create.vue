<template>
  <div>
    <p>Edit person</p>
    <DataLanguageSelect />
    <form
      v-if="personData"
      @submit.prevent="createPerson"
    >
      <div
        v-for="(field, name) in schema"
        :key="name"
      >
        <input
          v-model="personData[name][dataLanguage]"
          type="text"
          :placeholder="$t('persons.'+name)"
        >
      </div>
      <div>
        <input
          type="submit"
          value="Save"
        >
      </div>
    </form>
  </div>
</template>

<script>
  import schema from './schema';
  import DataLanguageSelect from '../../components/DataLanguageSelect';
  import { mapState } from 'vuex';
  import axios from 'axios';

  export default {
    name: 'PersonsCreate',
    components: {
      DataLanguageSelect
    },
    data() {
      return {
        schema,
        personData: null
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    async created() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        const personId = this.$route.params.personId;

        let personData = {};

        if (personId) {
          personData = await axios.get(`/persons/${personId}`);
        }
        for (const field in schema) {
          if (personData[field]) continue;
          personData[field] = {
            en: '',
            ru: ''
          };
        }
        this.personData = personData;
      },

      async createPerson() {
        if (this.$route.params.personId) {
          await axios.put(`/persons/${this.$route.params.personId}`, this.personData);
        } else {
          await axios.post('/persons', this.personData);
        }

        this.$router.push({ name: 'persons-overview' });
      }
    }
  };
</script>
