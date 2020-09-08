<template lang="pug">
  ui-index-layout(title="会員管理" description="アプリケーションを利用する、会員と付与する権限の管理")
    template(#action)
      v-btn(@click="onRegister")
        v-icon mdi-plus
        span 会員を追加する
    ui-user-table(@edit="onEdit" @delete="onDelete")

    ui-user-register-dialog(v-model="registerDialog")
    ui-user-edit-dialog(v-model="editDialog" :user="editUser")
    ui-user-delete-dialog(v-model="deleteDialog" :user="deleteUser")
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from '@vue/composition-api'
import UiIndexLayout from '@molecules/layouts/UiIndexLayout.vue'
import UiUserTable from '@organisms/tables/UiUserTable.vue'
import UiUserRegisterDialog from '@organisms/dialogs/UiUserRegisterDialog.vue'
import UiUserEditDialog from '@organisms/dialogs/UiUserEditDialog.vue'
import UiUserDeleteDialog from '@organisms/dialogs/UiUserDeleteDialog.vue'
import { usersStore } from '@store/index'
import { User } from '@models/user'

export default defineComponent({
  layout: 'admin',
  middleware: 'authenticated-admin',
  components: { UiIndexLayout, UiUserTable, UiUserRegisterDialog, UiUserEditDialog, UiUserDeleteDialog },
  setup() {
    onBeforeMount(() => {
      usersStore.setConditions({ page: 1, sort: { key: 'id', desc: true } })
    })

    const registerDialog = ref(false)
    function onRegister(): void {
      registerDialog.value = true
    }

    const editDialog = ref(false)
    const editUser = reactive({ id: -1, password: '', role: undefined })
    function onEdit(user: User): void {
      Object.assign(editUser, { id: user.id, password: user.password, role: user.role })
      editDialog.value = true
    }

    const deleteDialog = ref(false)
    const deleteUser = reactive({ id: -1 })
    function onDelete(user: User): void {
      Object.assign(deleteUser, { id: user.id })
      deleteDialog.value = true
    }
    return { registerDialog, onRegister, editDialog, editUser, onEdit, deleteDialog, deleteUser, onDelete  }
  }
})
</script>
