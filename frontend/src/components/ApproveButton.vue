<template>
  <button
    v-if="$store.state.auth.user.isAdmin && changeRecordId"
    class="button button--approve"
    @click="approve"
  >
    {{ $t('entities.approve') }}
  </button>
</template>

<script>
  import axios from 'axios';
  import notifier from 'codex-notifier';

  export default {
    name: 'ApproveButton',
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
      async approve() {
        try {
          await axios.put(`/changes/${this.entityType}/${this.changeRecordId}/approval`);
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
