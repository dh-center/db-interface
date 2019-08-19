<template>
  <div class="persons-overview-specific">
    <button @click="onEditButtonClick">
      Edit
    </button>
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
        v-if="edit || changeRecord.changes.length"
        :person="changedPerson"
        :editable="edit"
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
        originalPerson: null,
        edit: false,
        changeRecord: { changes: [] },
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
        const personId = this.$route.params.personId;

        let personData = {};

        if (personId) {
          personData = await axios.get(`/persons/${personId}`, {
            params: {
              withChanges: true
            }
          });
        }

        if (personData.changes) {
          this.changeRecord = personData.changes;
          this.changedPerson = new PersonModel(jsonpatch.applyPatch(JSON.parse(JSON.stringify(personData)), this.changeRecord.changes).newDocument, this.dataLanguage);
        }

        this.originalPerson = new PersonModel(personData, this.dataLanguage);
      },

      onEditButtonClick() {
        this.changedPerson = new PersonModel(jsonpatch.applyPatch(JSON.parse(JSON.stringify(this.originalPerson.data)), this.changeRecord.changes).newDocument, this.dataLanguage);
        this.edit = true;
      },

      async savePerson() {
        this.edit = false;
        if (this.$route.params.personId) {
          // update existing originalPerson
          await axios.put(`/persons/${this.$route.params.personId}`, this.changedPerson.data);
        } else {
          // create new originalPerson
          await axios.post('/persons', this.changedPerson.data);
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
