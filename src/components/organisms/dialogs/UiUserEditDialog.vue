<template lang="pug">
  ui-dialog.ui-user-edit-dialog(:dialog="dialog" title="会員の編集" @change="close")
    .pb-4
      p.caption ※ 自分自身を編集した場合、再度ログインする必要があります
    .pb-4(v-if="error")
      v-alert(type="error") 会員の編集に失敗しました
    ui-user-form(v-model="form" :loading="loading" :type="type" @submit="submit")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from '@vue/composition-api'
import { commonStore, usersStore } from '@store/index.ts'
import UiDialog from '@molecules/dialogs/UiDialog.vue'
import UiUserForm from '@molecules/forms/UiUserForm.vue'
import { Role } from '@models/user'

export default defineComponent({
  components: { UiDialog, UiUserForm },
  model: { prop: 'dialog', event: 'change' },
  props: {
    dialog: { type: Boolean, default: false },
    user: { type: Object, required: true }
  },
  setup({ user }, context) {
    const error = ref(false)
    const loading = ref(false)
    const type = 2 // FormType.EDIT
    const form = reactive({ name: '', email: '', password: '', role: Role.USER })
    const authUser = computed(() => commonStore.authUser)

    function submit(): void {
      error.value = false
      loading.value = true
      usersStore.update(Object.assign({ id: user.id }, form))
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

    watch(
      () => user,
      u => Object.assign(form, { id: u.id, password: u.password, role: u.role }),
      { deep: true, immediate: false }
    )

    return { error, loading, type, form, submit, close }
  }
})
</script>
