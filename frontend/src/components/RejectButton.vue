<template>
  <button
    v-if="isUserCanEditThisEntity"
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
        required: true
      },
      userId: {
        type: String,
        required: true
      },
      entityType: {
        type: String,
        required: true
      }
    },
    computed: {
      isUserCanEditThisEntity() {
        return this.$store.state.auth.user.isAdmin || (this.$store.state.auth.user.id === this.userId);
      }
    },
    methods: {
      async reject() {
        try {
          await axios.put(`/changes/${this.entityType}/${this.changeRecordId}/rejection`);
          this.$emit('success');
          notifier.show({
            message: this.$t('entities.successfulReject'),
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
