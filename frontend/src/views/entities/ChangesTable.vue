<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Actions</th>
        <th
          v-for="(fieldName, index) in model.fields"
          :key="index"
        >
          {{ $t(`${model.entityType}.${fieldName}`) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <ChangesTableRow
        v-for="changeRecord in changesRecordList"
        :key="changeRecord._id"
        :deleted="changeRecord.deleted"
        :changed-entity="changeRecord.changedEntity"
        :model="model"
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
    props: {
      model: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        changesRecordList: []
      };
    },
    async created() {
      this.changesRecordList = await axios.get(`/changes/${this.model.entityType}`);
    },
    methods: {
      async approve(changeRecord) {
        await axios.put(`/changes/${this.model.entityType}/${changeRecord._id}/approval`);
        this.$delete(this.changesRecordList, this.changesRecordList.indexOf(changeRecord));
      },

      openView(changeRecord) {
        if (changeRecord.entity) {
          this.$router.push({ name: `${this.model.entityType}-overview-specific`, params: { entityId: changeRecord.entity._id } });
        } else {
          this.$router.push({ name: `${this.model.entityType}-create`, params: { changeRecordId: changeRecord._id } });
        }
      }
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
