<template>
  <div class="persons-overview">
    <button @click="$router.push({name: 'persons-create'})">
      Add new person
    </button>
    <DataLanguageSelect />
    <router-link :to="{name: 'persons-changes'}">
      View changes
    </router-link>
    <router-view />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import DataLanguageSelect from '../../components/DataLanguageSelect';
  import axios from 'axios';

  export default {
    name: 'PersonsOverview',
    components: {
      DataLanguageSelect
    },
    data() {
      return {
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
