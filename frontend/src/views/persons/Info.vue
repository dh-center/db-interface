<template>
  <div class="person-info">
    <input
      v-model="person.firstName"
      type="text"
      :disabled="!editable"
      placeholder="person first name"
    >
    <input
      v-model="person.lastName"
      type="text"
      :disabled="!editable"
      placeholder="person last name"
    >
    <input
      v-model="person.patronymic"
      type="text"
      :disabled="!editable"
      placeholder="person patronymic"
    >
    <textarea
      v-model="person.description"
      rows="20"
      :disabled="!editable"
      cols="50"
    />
  </div>
</template>

<script>
  export default {
    name: 'PersonInfo',
    props: {
      person: {
        type: Object,
        required: true
      },
      editable: Boolean
    }
  };
</script>

<style>
  .person-info {
    max-width: 450px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    margin: auto;

    &__name {
      font-family: 'Oranienbaum', serif;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 10px;
      color: #2d2d2d;
    }

    &__mini {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(0, 0, 0, .2);
    }

    &__mini-header {
      font-family: 'Roboto', sans-serif;
      font-size: 8px;
      line-height: 9px;
      display: block;
      margin-bottom: 8px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: #000;
    }

    &__lifetime,
    &__profession {
      flex-basis: 50%;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      padding-left: 20px;
      margin-bottom: 0;
      color: #000;
    }

    &__lifetime {
      padding-left: 0;
      border-right: 1px solid rgba(0, 0, 0, .2);
    }

    &__description {
      margin-top: 20px;
    }
  }

  [contenteditable]:empty::before {
    content: attr(data-placeholder);
    opacity: 0.5;
    display: inline;
  }
</style>
