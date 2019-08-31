<template>
  <div class="locations-overview">
    <button @click="$router.push({name: ''})">
      Add new location
    </button>
    <DataLanguageSelect />
    <router-link :to="{name: ''}">
      View changes
    </router-link>
    <router-view />
  </div>
</template>

<script>
  import DataLanguageSelect from '../../components/DataLanguageSelect';

  export default {
    name: 'LocationsOverview',
    components: {
      DataLanguageSelect
    }
  };
</script>
