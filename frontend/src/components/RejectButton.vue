<template>
  <button
    v-if="$store.state.auth.user.isAdmin && changeRecordId"
    class="button button--danger"
    @click="reject"
  >
    {{ $t('entities.reject') }}
  </button>
</template>

<script>
  import axios from 'axios';
  import notifier from 'codex-notifier';

  export default {
    name: 'RejectButton',
    props: {
      changeRecordId: {
        type: String,
        default: null
      },
      entityType: {
        type: String,
        required: true
      }
    },
    methods: {
      async reject() {
        try {
          await axios.put(`/changes/${this.entityType}/${this.changeRecordId}/rejection`);
          this.$emit('success');
          notifier.show({
            message: this.$t('entities.successfulApprove'),
            time: 2000
          });
        } catch (e) {
          notifier.show({
            message: e.message,
            style: 'error',
            time: 2000
          });
        }
      }
    }
  };
</script>

<style scoped>

</style>
