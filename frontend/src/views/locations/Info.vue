<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label :for="$id('name')">
        {{ $t('locations.name') }}
      </label>
      <input
        :id="$id('name')"
        v-model="entity.name"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('constructionDate')">
        {{ $t('locations.constructionDate') }}
      </label>
      <input
        :id="$id('constructionDate')"
        v-model="entity.constructionDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('demolitionDate')">
        {{ $t('locations.demolitionDate') }}
      </label>
      <input
        :id="$id('demolitionDate')"
        v-model="entity.demolitionDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label>{{ $t('locations.locationTypesId') }}</label>
      <table>
        <tbody>
          <tr
            v-for="(locationType, index) in entity.locationTypesId"
            :key="index"
            class="locations-info__addresses-list-item"
          >
            <td>
              <CustomSelect
                v-model="entity.locationTypesId[index]"
                :disabled="!editable"
                :options="locationTypesList"
                :label="(index + 1).toString()"
              />
            </td>
            <td v-if="editable">
              <button
                v-if="editable"
                @click="entity.deleteLocationType(locationType)"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        v-if="editable"
        @click="entity.insertNewLocationType()"
      >
        +
      </button>
    </div>
    <div class="entity-info__section">
      <label>{{ $t('locations.addressesId') }}</label>
      <table>
        <tbody>
          <tr
            v-for="(address, index) in entity.addressesId"
            :key="index"
            class="locations-info__addresses-list-item"
          >
            <td>
              <CustomSelect
                v-model="entity.addressesId[index]"
                :disabled="!editable"
                :options="addressesList"
                :label="(index + 1).toString()"
              />
            </td>
            <td v-if="editable">
              <button
                v-if="editable"
                class="locations-info__address-delete-button"
                @click="entity.deleteAddress(address)"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        v-if="editable"
        @click="entity.insertNewAddress()"
      >
        +
      </button>
    </div>
    <div class="entity-info__section">
      <label :for="$id('description')">
        {{ $t('locations.description') }}
      </label>
      <textarea
        :id="$id('description')"
        v-model="entity.description"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('wikiLink')">
        {{ $t('locations.wikiLink') }}
      </label>
      <input
        :id="$id('wikiLink')"
        v-model="entity.wikiLink"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('photoLinks')">
        {{ $t('locations.photoLinks') }}
      </label>
      <textarea
        :id="$id('photoLinks')"
        v-model="entity.photoLinks"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('mainPhotoLink')">
        {{ $t('locations.mainPhotoLink') }}
      </label>
      <input
        :id="$id('mainPhotoLink')"
        v-model="entity.mainPhotoLink"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('coordinateX')">
        {{ $t('locations.coordinateX') }}
      </label>
      <input
        :id="$id('coordinateX')"
        v-model="entity.coordinateX"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('coordinateY')">
        {{ $t('locations.coordinateY') }}
      </label>
      <input
        :id="$id('coordinateY')"
        v-model="entity.coordinateY"
        type="text"
        :disabled="!editable"
      >
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import CustomSelect from '../../components/CustomSelect';
  import LocationTypeModel from '../../models/locationTypes';
  import AddressModel from '../../models/address';

  export default {
    name: 'LocationsInfo',
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
        locationTypesList: [],
        addressesList: []
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        await axios.get('/locationTypes').then(locationTypes => (this.locationTypesList = locationTypes.map(locationType => new LocationTypeModel(locationType))));
        await axios.get('/addresses').then(addresses => (this.addressesList = addresses.map(address => new AddressModel(address))));
      }
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
