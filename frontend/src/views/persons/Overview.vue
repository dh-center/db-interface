<template>
  <div class="persons-overview">
    <button @click="$router.push({name: 'persons-create'})">
      Add new person
    </button>
    <DataLanguageSelect />
    <router-link :to="{name: 'persons-changes'}">
      View changes
    </router-link>
    <router-view />
  </div>
</template>

<script>
  import DataLanguageSelect from '../../components/DataLanguageSelect';

  export default {
    name: 'PersonsOverview',
    components: {
      DataLanguageSelect
    }
  };
</script>
