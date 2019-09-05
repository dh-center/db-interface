<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th>
          {{ $t('persons.firstName') }}
        </th>
        <th>
          {{ $t('persons.lastName') }}
        </th>
        <th>
          {{ $t('persons.patronymic') }}
        </th>
        <th>
          {{ $t('persons.description') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <ChangesTableRow
        v-for="changeRecord in changesRecordList"
        :key="changeRecord._id"
        :entity="changeRecord.entity || {}"
        :change-list="changeRecord.changeList"
        @onApproveButtonClicked="approve(changeRecord)"
        @onViewButtonClicked="openView(changeRecord)"
      />
    </tbody>
  </table>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from 'axios';

  import ChangesTableRow from '../../components/ChangesTableRow';

  export default {
    name: 'ChangesTable',
    components: {
      ChangesTableRow
    },
    data() {
      return {
        changesRecordList: []
      };
    },
    async created() {
      this.changesRecordList = await axios.get('/changes/persons');
    },
    methods: {
      async approve(changeRecord) {
        await axios.put(`/changes/persons/${changeRecord._id}/approval`);
        this.$delete(this.changesRecordList, this.changesRecordList.indexOf(changeRecord));
      },

      openView(changeRecord) {
        if (changeRecord.entity) {
          this.$router.push({ name: 'persons-overview-specific', params: { personId: changeRecord.entity._id } });
        } else {
          this.$router.push({ name: 'persons-create', params: { changeRecordId: changeRecord._id } });
        }
      }
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
