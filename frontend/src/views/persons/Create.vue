<template>
  <div class="persons-overview-create">
    <button @click="savePerson">
      Save
    </button>
    <PersonInfo
      v-if="person"
      ref="personInfo"
      editable
      :person="person"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from 'axios';
  import PersonInfo from './Info';
  import PersonModel from '../../models/person';
  import jsonpatch from 'fast-json-patch';

  export default {
    name: 'PersonsOverviewSpecific',
    components: {
      PersonInfo
    },
    data() {
      return {
        person: null
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    watch: {
      dataLanguage(newLang) {
        this.person.language = newLang;
        this.$refs.personInfo.setData();
      }
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        const { changeRecordId } = this.$route.params;

        const personData = {};

        if (changeRecordId) {
          const changeRecord = await axios.get(`/persons/changes/${changeRecordId}`);

          this.person = new PersonModel(jsonpatch.applyPatch({}, changeRecord.changes).newDocument, this.dataLanguage);
        } else {
          this.person = new PersonModel(personData, this.dataLanguage);
        }
      },
      async savePerson() {
        if (this.$route.params.changeRecordId) {
          await axios.put(`/persons/changes/${this.$route.params.changeRecordId}`, this.person.data);
        } else {
          const changesRecord = await axios.post('/persons', this.person.data);

          this.$router.push({
            name: 'persons-create',
            params: {
              changeRecordId: changesRecord._id
            }
          });
        }
      }
    }
  };
</script>
