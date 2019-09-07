<template>
  <div class="persons-overview">
    <router-link
      class="link"
      :to="{name: 'persons-create'}"
    >
      Add new person
    </router-link>
    <router-link
      class="link"
      :to="{name: 'persons-changes'}"
    >
      View changes
    </router-link>
    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'PersonsOverview'
  };
</script>
