<template lang="pug">
  ui-dialog.ui-user-delete-dialog(:dialog="dialog" title="会員の削除" @change="close")
    .pb-4(v-if="error")
      v-alert(type="error") 会員の削除に失敗しました
    p 会員を本当に削除しますか？
    v-btn(block color="red" dark @click="submit" :loading="loading") 会員を削除する
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { commonStore, usersStore } from '@store/index.ts'
import UiDialog from '@molecules/dialogs/UiDialog.vue'

export default defineComponent({
  components: { UiDialog },
  model: { prop: 'dialog', event: 'change' },
  props: {
    dialog: { type: Boolean, default: false },
    user: { type: Object, required: true }
  },
  setup({ user }, context) {
    const error = ref(false)
    const loading = ref(false)
    const authUser = computed(() => commonStore.authUser)

    function submit(): void {
      loading.value = true
      usersStore.delete({ id: user.id })
        .then(() => {
          if (user.id === authUser!!.value!!.id) {
            // If edit own properties, sign out
            // @ts-ignore
            commonStore.logout().then(() => context.root.context.redirect(301, '/login'))
          } else {
            usersStore.search().then(() => close())
          }
        })
        .catch(() => error.value = true)
        .finally(() => loading.value = false)
    }
    function close(): void {
      context.emit('change', false)
    }

    return { error, loading, submit, close }
  }
})
</script>
