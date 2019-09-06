<template>
  <div class="persons-overview-specific">
    <button @click="savePerson">
      Save
    </button>
    <div class="persons-overview-specific__container">
      <PersonInfo
        v-if="originalPerson"
        ref="originalPersonInfo"
        :person="originalPerson"
      />
      <PersonInfo
        v-if="changedPerson"
        ref="changedPersonInfo"
        :person="changedPerson"
        editable
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import PersonInfo from './Info';
  import PersonModel from '../../models/person';
  import jsonpatch from 'fast-json-patch';
  import cloneDeep from 'lodash.clonedeep';

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
          this.changedPerson = new PersonModel(jsonpatch.applyPatch(cloneDeep(personData), personData.lastChangesRecord.changeList).newDocument);
        } else {
          // if person was not modified yet
          this.changedPerson = new PersonModel(personData);
        }

        this.originalPerson = new PersonModel(personData);
      },

      async savePerson() {
        if (this.lastChangesRecord) {
          // update existing changes record
          await axios.patch(`/changes/persons/${this.lastChangesRecord._id}`, this.changedPerson.data);
        } else {
          // create new changes record
          this.lastChangesRecord = await axios.post(`/changes/persons/${this.originalPerson.id}`, this.changedPerson.data);
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
