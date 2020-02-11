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
        {{ $t('locations.photos') }}
      </label>
      <gallery
        :id="$id('photoGallery')"
        :images="entity.photoLinks"
        :index="photoIndex"
        @close="photoIndex = null"
      />
      <div class="entity-info__images-list">
        <div
          v-for="(link, index) in entity.photoLinks"
          :key="index"
          class="entity-info__image-container"
        >
          <img
            :src="link"
            @click="photoIndex = index"
          >
          <span
            class="close-icon"
            @click="deleteImage(index)"
          />
        </div>
      </div>
      <vueDropzone
        v-if="editable"
        :id="$id('mainPhotoDropzone')"
        ref="mainPhotoDropzone"
        :options="photosDropzoneOptions"
        @vdropzone-success="onPhotoSuccessUpload"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('mainPhotoLink')">
        {{ $t('locations.mainPhoto') }}
      </label>
      <gallery
        :id="$id('mainPhotoGallery')"
        :images="[entity.mainPhotoLink]"
        :index="mainPhotoIndex"
        @close="mainPhotoIndex = null"
      />
      <div
        v-if="entity.mainPhotoLink"
        class="entity-info__image-container"
      >
        <img
          :src="entity.mainPhotoLink"
          @click="mainPhotoIndex = 0"
        >
        <span
          class="close-icon"
          @click="entity.mainPhotoLink = null"
        />
      </div>
      <button
        v-if="editable"
        @click="entity.mainPhotoLink = null"
      >
        Remove image
      </button>
      <vueDropzone
        v-if="editable"
        :id="$id('mainPhotoDropzone')"
        ref="mainPhotoDropzone"
        :options="mainPhotoDropzoneOptions"
        @vdropzone-success="onMainPhotoSuccessUpload"
      />
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
  import vueDropzone from 'vue2-dropzone';
  import { LightGallery } from 'vue-light-gallery';

  export default {
    name: 'LocationsInfo',
    components: {
      vueDropzone,
      gallery: LightGallery,
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
        addressesList: [],
        mainPhotoIndex: null,
        photoIndex: null,
        mainPhotoDropzoneOptions: {
          url: process.env.VUE_APP_API_ENDPOINT + '/locations/images',
          thumbnailWidth: 150,
          headers: {
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken
          },
          maxFiles: 1,
          paramName: 'image',
          maxFilesize: 10
        },
        photosDropzoneOptions: {
          url: process.env.VUE_APP_API_ENDPOINT + '/locations/images',
          thumbnailWidth: 150,
          headers: {
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken
          },
          paramName: 'image',
          maxFilesize: 10
        }
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        await axios.get('/locationTypes').then(locationTypes => (this.locationTypesList = locationTypes.map(locationType => new LocationTypeModel(locationType))));
        await axios.get('/addresses').then(addresses => (this.addressesList = addresses.map(address => new AddressModel(address))));
      },
      onMainPhotoSuccessUpload(file, response) {
        this.entity.mainPhotoLink = response.payload.url;
      },
      onPhotoSuccessUpload(file, response) {
        this.entity.photoLinks.push(response.payload.url);
      },

      deleteImage(index) {
        this.entity.photoLinks.splice(index, 1);
      }
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
