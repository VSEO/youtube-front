<template lang="pug">
  v-container.fill-height(fluid)
    v-row
      v-col(cols="12")
        v-row(align="center" justify="center")
          ui-login-card
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UiLoginCard from '@organisms/cards/UiLoginCard.vue'

export default defineComponent({
  components: { UiLoginCard },
  middleware: 'unauthenticated'
})
</script>
