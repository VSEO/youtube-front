<template lang="pug">
  v-app
    ui-default-header
    v-content.blue-grey.lighten-5
      nuxt
    ui-default-footer
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UiDefaultHeader from '@organisms/sections/UiDefaultHeader.vue'
import UiDefaultFooter from '@organisms/sections/UiDefaultFooter.vue'

export default defineComponent({
  components: { UiDefaultHeader, UiDefaultFooter }
})

</script>
