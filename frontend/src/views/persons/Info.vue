<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('lastName')"
      >{{ $t('persons.lastName') }}</label>
      <input
        :id="$id('lastName')"
        v-model="entity.lastName"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('firstName')"
      >{{ $t('persons.firstName') }}</label>
      <input
        :id="$id('firstName')"
        v-model="entity.firstName"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('patronymic')"
      >{{ $t('persons.patronymic') }}</label>
      <input
        :id="$id('patronymic')"
        v-model="entity.patronymic"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('pseudonym')"
      >{{ $t('persons.pseudonym') }}</label>
      <input
        :id="$id('pseudonym')"
        v-model="entity.pseudonym"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('birthDate')"
      >{{ $t('persons.birthDate') }}</label>
      <input
        :id="$id('birthDate')"
        v-model="entity.birthDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('deathDate')"
      >{{ $t('persons.deathDate') }}</label>
      <input
        :id="$id('deathDate')"
        v-model="entity.deathDate"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('profession')"
      >{{ $t('persons.profession') }}</label>
      <input
        :id="$id('profession')"
        v-model="entity.profession"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label
        class="entity-info__label"
        :for="$id('description')"
      >{{ $t('persons.description') }}</label>
      <textarea
        :id="$id('description')"
        v-model="entity.description"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('source')">
        {{ $t('persons.source') }}
      </label>
      <input
        :id="$id('source')"
        v-model="entity.source"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('wikiLink')">
        {{ $t('persons.wikiLink') }}
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
        {{ $t('persons.photoLinks') }}
      </label>
      <textarea
        :id="$id('photoLinks')"
        v-model="entity.photoLinks"
        class="entity-info__description"
        :disabled="!editable"
      />
    </div>
    <div class="entity-info__section">
      <label :for="$id('mainPhoto')">
        {{ $t('persons.mainPhoto') }}
      </label>
      <gallery
        :id="$id('mainPhotoGallery')"
        :images="[entity.mainPhotoLink]"
        :index="mainPhotoIndex"
        @close="mainPhotoIndex = null"
      />
      <img
        class="entity-info__main-photo"
        :src="entity.mainPhotoLink"
        @click="mainPhotoIndex = 0"
      >
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
  </div>
</template>

<script>
  import vueDropzone from 'vue2-dropzone';
  import { LightGallery } from 'vue-light-gallery';

  export default {
    name: 'PersonsInfo',
    components: {
      vueDropzone,
      gallery: LightGallery
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
        mainPhotoIndex: null,
        mainPhotoDropzoneOptions: {
          url: process.env.VUE_APP_API_ENDPOINT + '/persons/images',
          thumbnailWidth: 150,
          headers: {
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken
          },
          maxFiles: 1,
          paramName: 'image',
          maxFilesize: 10
        },
        photosDropzoneOptions: {
          url: process.env.VUE_APP_API_ENDPOINT + '/persons/images',
          thumbnailWidth: 150,
          headers: {
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken
          },
          paramName: 'image',
          maxFilesize: 10
        }
      };
    },
    methods: {
      onMainPhotoSuccessUpload(file, response) {
        this.entity.mainPhotoLink = response.payload.url;
      }
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
