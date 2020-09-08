<template lang="pug">
  v-app-bar.ui-default-header(app flat color="indigo")
    v-toolbar-title.white--text Youtubeトレンド検索キーワード (仮)
    v-spacer

    template(v-if="authUser")
      v-btn(dark text to="/admin/users" v-if="authUser.isAdmin()") 管理画面
      v-btn(dark text @click="logout") ログアウト
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
