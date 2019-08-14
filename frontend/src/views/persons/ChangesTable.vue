<template>
  <table class="persons-overview__table">
    <tr>
      <td>Actions</td>
      <td
        v-for="(field, name) in schema"
        :key="name"
      >
        {{ $t('persons.' + name) }}
      </td>
    </tr>
    <ChangesTableRow
      v-for="changeRecord in changesList"
      :key="changeRecord._id"
      :schema="schema"
      :entity="changeRecord.entity || {}"
      :changes="changeRecord.changes"
      @onApproveButtonClicked="approve(changeRecord)"
    />
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
        schema,
        changesList: {}
      };
    },
    computed: mapState({
      dataLanguage: state => state.app.dataLanguage
    }),
    async created() {
      this.changesList = await axios.get('/persons/changes');
      console.log(this.changesList);
    },
    methods: {
      approve(changeRecord) {
        axios.put(`/persons/changes/${changeRecord._id}/approval`);
      }
    }
  };
</script>
