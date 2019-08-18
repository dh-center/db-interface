<template>
  <div class="persons-create">
    <button @click="savePerson">
      Save
    </button>
    <PersonInfo
      v-if="person"
      ref="personInfo"
      :person="person"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from 'axios';
  import PersonInfo from './Info';
  import PersonModel from '../../models/person';

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
        const personId = this.$route.params.personId;

        let personData = {};

        if (personId) {
          personData = await axios.get(`/persons/${personId}`);
        }
        this.person = new PersonModel(personData, this.dataLanguage);
      },

      async savePerson() {
        if (this.$route.params.personId) {
          await axios.put(`/persons/${this.$route.params.personId}`, this.person.data);
        } else {
          await axios.post('/persons', this.person.data);
        }

        this.$router.push({ name: 'persons-overview' });
      }
    }
  };
</script>

<style>
  .persons-create {
    max-width: 450px;
    display: flex;
    flex-direction: column;
    margin: auto;

    &__name {
      font-family: 'Oranienbaum', serif;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 10px;
      color: #2d2d2d;
    }

    &__info-container {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(0, 0, 0, .2);
    }

    &__info-header {
      font-family: 'Roboto', sans-serif;
      font-size: 8px;
      line-height: 9px;
      display: block;
      margin-bottom: 8px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: #000;
    }

    &__lifetime,
    &__profession {
      flex-basis: 50%;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      padding-left: 20px;
      margin-bottom: 0;
      color: #000;
    }

    &__lifetime {
      padding-left: 0;
      border-right: 1px solid rgba(0, 0, 0, .2);
    }

    &__description {
      margin-top: 20px;
    }
  }

  [contenteditable=true]:empty::before {
    content: attr(data-placeholder);
    opacity: 0.5;
    display: inline;
  }
</style>
