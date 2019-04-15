<template>
    <dialog-window @close="$emit('close', name)">
      <template #header>Добавить сущность</template>
      <template #body>
        <input v-model="name" placeholder="Название сущности" type="text">
      </template>
    </dialog-window>
</template>

<script>
  import DialogWindow from '../components/DialogWindow';

  export default {
    name: 'AddEntityDialog',
    data() {
      return {
        name: ''
      };
    },
    components: {
      DialogWindow
    }
  };
</script>
