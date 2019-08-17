<template>
  <table class="data-table">
    <thead>
      <tr>
        <td>Actions</td>
        <td
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ $t('persons.' + name) }}
        </td>
      </tr>
    </thead>
    <tbody>
      <ChangesTableRow
        v-for="changeRecord in changesList"
        :key="changeRecord._id"
        :schema="schema"
        :entity="changeRecord.entity || {}"
        :changes="changeRecord.changes"
        @onApproveButtonClicked="approve(changeRecord)"
      />
    </tbody>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
  import schema from './schema';
  import axios from 'axios';

  import ChangesTableRow from '../../components/ChangesTableRow';
  export default {
    name: 'ChangesTable',
    components: {
      ChangesTableRow
    },
    data() {
      return {
        schema: schema.fields,
        changesList: {}
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    async created() {
      this.changesList = await axios.get('/persons/changes');
    },
    methods: {
      async approve(changeRecord) {
        await axios.put(`/persons/changes/${changeRecord._id}/approval`);
        this.$delete(this.changesList, this.changesList.indexOf(changeRecord));
      }
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
