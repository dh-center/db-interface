<template>
  <div class="catalog">
    <h1>Каталог текстов</h1>
    <router-link
      :to="{name: 'markup', params: {textId: text._id}}"
      class="catalog__text-item"
      v-for="(text, index) in texts" :key="index"
    >
      {{text.title}}
    </router-link>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Catalog',
    data() {
      return {
        texts: []
      };
    },
    created() {
      this.getTexts();
    },
    methods: {
      async getTexts() {
        try {
          const response = await axios.get('/texts');

          if (response.status === 200 && response.data.data) this.texts = response.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
</script>

<style>
  .catalog {

    &__text-item {
      display: block;
      margin-bottom: 5px;
    }
  }
</style>
