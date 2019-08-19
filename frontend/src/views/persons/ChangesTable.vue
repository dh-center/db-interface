<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th
          v-for="(field, name) in schema"
          :key="name"
        >
          {{ $t('persons.' + name) }}
        </th>
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
        @onViewButtonClicked="openView(changeRecord)"
      />
    </tbody>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
  import PersonModel from '../../models/person';
  import axios from 'axios';

  import ChangesTableRow from '../../components/ChangesTableRow';

  export default {
    name: 'ChangesTable',
    components: {
      ChangesTableRow
    },
    data() {
      return {
        schema: PersonModel.schema.fields,
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
      },

      openView(changeRecord) {
        if (changeRecord.entity) {
          this.$router.push({ name: 'persons-overview-specific', params: { personId: changeRecord.entity._id } });
        } else {
          this.$router.push(({ name: 'persons-create', params: { changeRecordId: changeRecord._id } }));
        }
      }
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
