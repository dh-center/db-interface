<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>№</th>
        <th>{{ $t('entities.actions') }}</th>
        <th
          v-for="(fieldName, index) in model.fields"
          :key="index"
        >
          {{ $t(`${model.entityType}.${fieldName}`) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(entity, index) in entitiesList"
        :key="entity._id"
      >
        <td>
          {{ index +1 }}
        </td>
        <td class="data-table__actions-cell">
          <button
            class="button button--primary"
            @click="$router.push({name:`${model.entityType}-overview-specific`, params: {entityId: entity.id}})"
          >
            {{ $t('entities.view') }}
          </button>
        </td>
        <td
          v-for="(fieldName, _index) in model.fields"
          :key="_index"
        >
          {{ entity[fieldName] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'EntitiesOverviewTable',
    props: {
      model: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        entitiesList: []
      };
    },
    async created() {
      // eslint-disable-next-line new-cap
      this.entitiesList = (await axios.get(`/${this.model.entityType}`)).map(entity => new this.model(entity));
    }
  };
</script>

<style src="../../styles/data-table.css"></style>
