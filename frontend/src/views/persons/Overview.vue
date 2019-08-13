<template>
  <div class="persons-overview">
    <button @click="$router.push({name: 'persons-create'})">
      Add new person
    </button>
    <DataLanguageSelect />
    <table class="persons-overview__table">
      <tr>
        <td>Approve</td>
        <td
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ $t('persons.' + name) }}
        </td>
      </tr>
      <tr
        v-for="person in personsList"
        :key="person._id"
        :class="{'persons-overview__table-row--not-approved': !person.sqlId}"
      >
        <td>
          <button
            :disabled="person.sqlId"
            @click="approvePersonCreate(person._id)"
          >
            Approve
          </button>
        </td>
        <td
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ person[name] && person[name][dataLanguage] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { FETCH_ALL_PERSONS } from '../../store/modules/persons/actionTypes';
  import schema from './schema';
  import DataLanguageSelect from '../../components/DataLanguageSelect';
  import axios from 'axios';

  export default {
    name: 'PersonsOverview',
    components: {
      DataLanguageSelect
    },
    data() {
      return {
        schema
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage,
      personsList: state => state.persons.list
    }),
    created() {
      this.$store.dispatch(FETCH_ALL_PERSONS);
    },
    methods: {
      async approvePersonCreate(personId) {
        await axios.put(`/persons/${personId}/approval`);
      }
    }
  };
</script>

<style>
  .persons-overview {
    &__table {
      border: 1px solid black;
    }

    &__table-row {
      &--not-approved {
        background-color: rgba(0, 255, 20, 0.57);
      }
    }
  }
</style>
