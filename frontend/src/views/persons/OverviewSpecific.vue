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
        lastChanges: null,
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
        if (personData.lastChanges) {
          this.changedPerson = new PersonModel(jsonpatch.applyPatch(JSON.parse(JSON.stringify(personData)), personData.lastChanges.changes).newDocument, this.dataLanguage);
        } else {
          // if person was not modified yet
          this.changedPerson = new PersonModel(personData, this.dataLanguage);
        }

        this.originalPerson = new PersonModel(personData, this.dataLanguage);
      },

      async savePerson() {
        if (this.lastChanges) {
          // update existing changes record
          await axios.patch(`/changes/persons/${this.lastChanges._id}`, this.changedPerson.data);
        } else {
          // create new changes record
          this.lastChanges = await axios.post(`/changes/persons/${this.originalPerson.data._id}`, this.changedPerson.data);
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
