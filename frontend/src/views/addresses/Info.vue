<template>
  <div class="entity-info">
    <div class="entity-info__section">
      <label :for="$id('street')">
        {{ $t('addresses.street') }}
      </label>
      <input
        :id="$id('street')"
        v-model="entity.street"
        type="text"
        :disabled="!editable"
        :placeholder="$t('addresses.street')"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('homeNumber')">
        {{ $t('addresses.homeNumber') }}
      </label>
      <input
        :id="$id('homeNumber')"
        v-model="entity.homeNumber"
        type="text"
        :disabled="!editable"
        :placeholder="$t('addresses.homeNumber')"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('housing')">
        {{ $t('addresses.housing') }}
      </label>
      <input
        :id="$id('housing')"
        v-model="entity.housing"
        type="text"
        :disabled="!editable"
        :placeholder="$t('addresses.housing')"
      >
    </div>
    <div class="entity-info__section">
      <label :for="$id('build')">
        {{ $t('addresses.build') }}
      </label>
      <input
        :id="$id('build')"
        v-model="entity.build"
        type="text"
        :disabled="!editable"
        :placeholder="$t('addresses.build')"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddressesInfo',
    props: {
      entity: {
        type: Object,
        required: true
      },
      editable: Boolean
    }
  };
</script>

<style src="../../styles/entity-info.css"></style>
