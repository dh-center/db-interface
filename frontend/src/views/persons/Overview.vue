<template>
  <div>
    <button @click="$router.push({name: 'persons-create'})">
      Add new person
    </button>
    <select
      v-model="dataLanguage"
      name="lang"
    >
      <option value="ru">
        Russian
      </option>
      <option value="en">
        English
      </option>
    </select>
    <table border="1">
      <tr>
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
      >
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

  export default {
    name: 'PersonsOverview',
    data() {
      return {
        schema,
        dataLanguage: 'ru'
      };
    },
    computed: mapState({
      personsList: state => state.persons.list
    }),
    created() {
      this.$store.dispatch(FETCH_ALL_PERSONS);
    }
  };
</script>
