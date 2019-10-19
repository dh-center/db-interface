<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('name')"
      >{{ $t('routes.name') }}</label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('description')"
      >{{ $t('routes.description') }}</label>
      <textarea
        :id="$id('description')"
        v-model="entity.description"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
    <div class="entity-info__section">
      <label>{{ $t('routes.locationIds') }}</label>
      <table>
        <tbody>
          <tr
            v-for="(address, index) in entity.locationIds"
            :key="index"
            class="locations-info__addresses-list-item"
          >
            <td>
              <CustomSelect
                v-model="entity.locationIds[index]"
                :disabled="!editable"
                :options="locationList"
                :label="(index + 1).toString()"
              />
            </td>
            <td v-if="editable">
              <button
                :disabled="index === 0"
                @click="moveItem(entity.locationIds, index, index - 1)"
              >
                ↑
              </button>
              <button
                :disabled="index === (entity.locationIds.length - 1)"
                @click="moveItem(entity.locationIds, index, index + 1)"
              >
                ↓
              </button>
            </td>
            <td v-if="editable">
              <button
                v-if="editable"
                @click="entity.deleteLocation(address)"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        v-if="editable"
        @click="entity.insertNewLocation()"
      >
        +
      </button>
    </div>
    <div class="entity-info__section">
      <label :for="$id('photoLink')">
        {{ $t('routes.photoLink') }}
      </label>
      <input
        :id="$id('photoLink')"
        v-model="entity.photoLink"
        type="text"
        :disabled="!editable"
      >
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import LocationModel from '../../models/location';
  import CustomSelect from '../../components/CustomSelect';

  export default {
    name: 'RoutesInfo',
    components: {
      CustomSelect
    },
    props: {
      entity: {
        type: Object,
        required: true
      },
      editable: Boolean
    },
    data() {
      return {
        locationList: []
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        await axios.get('/locations').then(locations => (this.locationList = locations.map(location => new LocationModel(location))));
      },
      moveItem(array, from, to) {
        array = array.splice(to, 0, array.splice(from, 1)[0]);
      }
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
