<template lang="pug">
  ui-dialog.ui-user-register-dialog(:dialog="dialog" title="会員の追加" @change="close")
    .pb-4(v-if="error")
      v-alert(type="error") 会員の追加に失敗しました
    ui-user-form(v-model="form" :loading="loading" @submit="submit")
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { usersStore } from '@store/index.ts'
import { Role } from '@models/user'
import UiDialog from '@molecules/dialogs/UiDialog.vue'
import UiUserForm from '@molecules/forms/UiUserForm.vue'

export default defineComponent({
  components: { UiDialog, UiUserForm },
  model: { prop: 'dialog', event: 'change' },
  props: {
    dialog: { type: Boolean, default: false }
  },
  setup(_, context) {
    const error = ref(false)
    const loading = ref(false)
    const form = reactive({ id: '', password: '', role: Role.USER })

    function submit(): void {
      error.value = false
      loading.value = true
      usersStore.register(form)
        .then(() => usersStore.search().then(() => close()))
        .catch(() => error.value = true)
        .finally(() => loading.value = false)
    }
    function close(): void {
      Object.assign(form, { id: '', password: '', role: Role.USER })
      context.emit('change', false)
    }

    return { error, loading, form, submit, close }
  }
})
</script>
