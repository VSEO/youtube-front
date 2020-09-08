<template lang="pug">
  v-card.ui-login-in-card(width="400" flat)
    v-card-title ログイン
    v-divider.my-4
    v-card-text
      ui-login-form(v-model="form" :loading="loading" :error="error" @submit="login")
    v-divider.mt-4
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { commonStore } from '@store/index'
import UiLoginForm from '@molecules/forms/UiLoginForm.vue'

export default defineComponent({
  components: { UiLoginForm },
  setup(_, context) {
    const form = reactive({ id: '', password: '' })
    const loading = ref(false)
    const error = ref(false)

    async function login() {
      error.value = false
      loading.value  = true
      await commonStore.login(form)
        // @ts-ignore
        .then(() => context.root.context.redirect(301, '/'))
        .catch(() => error.value = true)
        .finally(() => loading.value = false)
    }

    return { form, loading, error, login }
  }
})
</script>
