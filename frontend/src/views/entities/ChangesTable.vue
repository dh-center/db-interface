<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th>
          {{ $t('locations.name') }}
        </th>
        <th>
          {{ $t('locations.address') }}
        </th>
        <th>
          {{ $t('locations.constructionDate') }}
        </th>
        <th>
          {{ $t('locations.demolitionDate') }}
        </th>
        <th>
          {{ $t('locations.buildingType') }}
        </th>
        <th>
          {{ $t('locations.description') }}
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
      this.changesRecordList = await axios.get('/changes/locations');
    },
    methods: {
      async approve(changeRecord) {
        await axios.put(`/changes/locations/${changeRecord._id}/approval`);
        this.$delete(this.changesRecordList, this.changesRecordList.indexOf(changeRecord));
      },

      openView(changeRecord) {
        if (changeRecord.entity) {
          this.$router.push({ name: 'locations-overview-specific', params: { locationId: changeRecord.entity._id } });
        } else {
          this.$router.push({ name: 'locations-create', params: { changeRecordId: changeRecord._id } });
        }
      }
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
