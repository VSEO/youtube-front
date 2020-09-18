<template lang="pug">
  v-app-bar.ui-admin-header(app flat color="indigo")
    v-toolbar-title.white--text YTシークレットサーチ
    v-spacer
    v-btn(dark exact text to="/") ユーザ画面
    v-btn(dark text @click="logout") ログアウト

    template(v-slot:extension)
      v-tabs(align-with-title dark)
        v-tab(nuxt to="/admin/users") 会員管理
        v-tab(nuxt to="/admin/settings") 設定
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { commonStore } from '@store/index'

export default defineComponent({
  setup(_, context) {
    const authUser = computed(() => commonStore.authUser)
    async function logout() {
      await commonStore.logout()
        .then(() => context.root.context.redirect(301, '/login'))
    }
    return { authUser, logout }
  }
})
</script>
