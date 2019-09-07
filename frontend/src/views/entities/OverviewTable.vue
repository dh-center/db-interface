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
      <tr
        v-for="entity in entitiesList"
        :key="entity._id"
      >
        <td>
          <button @click="$router.push({name:`${model.entityType}-overview-specific`, params: {entityId: entity.id}})">
            View
          </button>
        </td>
        <td>
          {{ entity.name }}
        </td>
        <td>
          {{ entity.address }}
        </td>
        <td>
          {{ entity.constructionDate }}
        </td>
        <td>
          {{ entity.demolitionDate }}
        </td>
        <td>
          {{ entity.buildingType }}
        </td>
        <td>
          {{ entity.description }}
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
