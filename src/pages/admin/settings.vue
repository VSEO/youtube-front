<template lang="pug">
  ui-index-layout(title="設定" description="アプリケーションの設定")
    ui-setting(:setting="setting")
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import UiIndexLayout from '@molecules/layouts/UiIndexLayout.vue'
import UiSetting from '@organisms/sections/UiSetting.vue'
import { settingsStore } from '@utils/store-accessor'

export default defineComponent({
  layout: 'admin',
  middleware: 'authenticated-admin',
  components: { UiIndexLayout, UiSetting },
  async validate(_): Promise<boolean> {
    return await settingsStore.load()
      .then(() => true)
      .catch(() => false)
  },
  setup() {
    const setting = settingsStore.setting
    return { setting }
  }
})
</script>
