<template>
  <div class="persons-overview-specific">
    <button @click="savePerson">
      Save
    </button>
    <div class="persons-overview-specific__container">
      <PersonInfo
        v-if="originalPerson"
        ref="personInfo"
        :person="originalPerson"
      />
      <PersonInfo
        v-if="changedPerson"
        :person="changedPerson"
        editable
      />
    </div>
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
        originalPerson: null, // person data before modification
        lastChangesRecord: null,
        changedPerson: null
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    watch: {
      dataLanguage(newLang) {
        this.originalPerson.language = newLang;
        this.$refs.personInfo.setData();
      }
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        const personData = await axios.get(`/persons/${this.$route.params.personId}`, {
          params: {
            withLastChanges: true
          }
        });

        // if person was modified
        if (personData.lastChangesRecord) {
          this.changedPerson = new PersonModel(jsonpatch.applyPatch(personData, personData.lastChangesRecord.changeList).newDocument, this.dataLanguage);
        } else {
          // if person was not modified yet
          this.changedPerson = new PersonModel(personData, this.dataLanguage);
        }

        this.originalPerson = new PersonModel(personData, this.dataLanguage);
      },

      async savePerson() {
        if (this.lastChangesRecord) {
          // update existing changes record
          await axios.patch(`/changes/persons/${this.lastChangesRecord._id}`, this.changedPerson.data);
        } else {
          // create new changes record
          this.lastChangesRecord = await axios.post(`/changes/persons/${this.originalPerson.data._id}`, this.changedPerson.data);
        }
      }
    }
  };
</script>

<style>
  .persons-overview-specific {
    &__container {
      display: flex;
    }
  }
</style>
