<template>
  <div class="persons-create">
    <button @click="createPerson">
      Save
    </button>
    <h2
      ref="personNameInput"
      contenteditable
      data-placeholder="full person name"
      class="persons-create__name"
      @input="onNameInput"
    />
    <div class="persons-create__info-container">
      <div class="persons-create__lifetime">
        <h3 class="persons-create__info-header">
          годы жизни
        </h3>
        1840-05-07–1893-11-06
      </div>
      <div class="persons-create__profession">
        <h3 class="persons-create__info-header">
          деятельность
        </h3>
        <span
          contenteditable
          data-placeholder="person's professions"
          data-multilingual-property="personData.profession"
          @input="personData.profession[dataLanguage] = $event.target.innerText"
        />
      </div>
    </div>
    <div
      contenteditable
      data-placeholder="person description"
      data-multilingual-property="personData.description"
      class="persons-create__description"
      @input="personData.description[dataLanguage] = $event.target.innerText"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from 'axios';

  export default {
    name: 'PersonsCreate',
    data() {
      return {
        name: {},
        personData: null
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    watch: {
      dataLanguage() {
        this.switchDataLanguage();
      }
    },
    async mounted() {
      await this.fetchData();
      this.switchDataLanguage();
    },
    methods: {
      onNameInput(event) {
        const [firstName, lastName, ...patronymic] = event.target.innerText.split(' ');

        this.personData.firstName[this.dataLanguage] = firstName;
        this.personData.lastName[this.dataLanguage] = lastName;
        this.personData.patronymic[this.dataLanguage] = patronymic.join(' ');
      },

      switchDataLanguage() {
        const firstName = this.personData.firstName[this.dataLanguage];
        const lastName = this.personData.lastName[this.dataLanguage];
        const patronymic = this.personData.patronymic[this.dataLanguage];

        this.$refs.personNameInput.innerText = `${firstName} ${lastName} ${patronymic}`;

        const multilingualElements = this.$el.querySelectorAll('[data-multilingual-property');

        multilingualElements.forEach(element => {
          const multilingualProperty = element.getAttribute('data-multilingual-property');

          let dataCache = this;

          multilingualProperty.split('.').forEach(field => {
            dataCache = dataCache[field];
          });
          if (dataCache) {
            element.innerText = dataCache[this.dataLanguage];
          }
        });
      },

      async fetchData() {
        const personId = this.$route.params.personId;

        let personData = {};

        if (personId) {
          personData = await axios.get(`/persons/${personId}`);
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

  [contenteditable=true]:empty:before{
    content: attr(data-placeholder);
    display: block; /* For Firefox */
  }
</style>
