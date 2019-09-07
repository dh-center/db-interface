<template>
  <div class="locations-overview">
    <router-link
      class="link"
      :to="{name: ''}"
    >
      Add new location
    </router-link>
    <router-link
      class="link"
      :to="{name: ''}"
    >
      View changes
    </router-link>
    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'LocationsOverview'
  };
</script>
