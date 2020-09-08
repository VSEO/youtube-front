<template lang="pug">
  v-app
    ui-admin-header
    v-content.blue-grey.lighten-5
      nuxt
    ui-default-footer
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UiAdminHeader from '@organisms/sections/UiAdminHeader.vue'
import UiDefaultFooter from '@organisms/sections/UiDefaultFooter.vue'

export default defineComponent({
  components: { UiAdminHeader, UiDefaultFooter }
})

</script>
