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
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        const { changeRecordId } = this.$route.params;

        const personData = {};

        if (changeRecordId) {
          const changeRecord = await axios.get(`/changes/persons/${changeRecordId}`);

          this.person = new PersonModel(jsonpatch.applyPatch({}, changeRecord.changeList).newDocument);
        } else {
          this.person = new PersonModel(personData);
        }
      },
      async savePerson() {
        if (this.$route.params.changeRecordId) {
          await axios.patch(`/changes/persons/${this.$route.params.changeRecordId}`, this.person.data);
        } else {
          const changesRecord = await axios.post('/changes/persons', this.person.data);

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
