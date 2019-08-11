<template>
  <div>
    <p>Persons create</p>
    <DataLanguageSelect />
    <form @submit.prevent="createPerson">
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
          value="Create"
        >
      </div>
    </form>
  </div>
</template>

<script>
  import { CREATE_NEW_PERSON } from '../../store/modules/persons/actionTypes';
  import schema from './schema';
  import DataLanguageSelect from '../../components/DataLanguageSelect';
  import { mapState } from 'vuex';

  export default {
    name: 'PersonsCreate',
    components: {
      DataLanguageSelect
    },
    data() {
      const personData = {};

      for (const field in schema) {
        personData[field] = {
          en: '',
          ru: ''
        };
      }
      return {
        schema,
        personData
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    methods: {
      async createPerson() {
        await this.$store.dispatch(CREATE_NEW_PERSON, this.personData);

        this.$router.push({ name: 'persons-overview' });
      }
    }
  };
</script>
