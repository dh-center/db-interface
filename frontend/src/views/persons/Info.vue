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
      <label :for="$id('mainPhotoLink')">
        {{ $t('persons.mainPhotoLink') }}
      </label>
      <input
        :id="$id('mainPhotoLink')"
        v-model="entity.mainPhotoLink"
        type="text"
        :disabled="!editable"
      >
    </div>
    <div>
      <vueDropzone
        :id="$id('dropzone')"
        :options="dropzoneOptions"
      />
    </div>
  </div>
</template>

<script>
  import vueDropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';

  export default {
    name: 'PersonsInfo',
    components: {
      vueDropzone
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
        dropzoneOptions: {
          url: process.env.VUE_APP_API_ENDPOINT + '/persons/images',
          thumbnailWidth: 150,
          maxFilesize: 10
        }
      };
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
