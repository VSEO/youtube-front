<template lang="pug">
  v-dialog(:value="dialog" max-width="450" @click:outside="close")
    v-card
      v-card-title
        span {{ title }}
        v-spacer
        v-btn(icon @click="close")
          v-icon mdi-close
      v-divider
      v-card-text.pt-6
        slot(name="default")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  model: {
    prop: 'dialog',
    event: 'change'
  },
  props: {
    dialog: { type: Boolean, default: false },
    title: { type: String, required: true }
  },
  setup(_, context) {
    function close() {
      context.emit('change', false)
    }
    return { close }
  }
})
</script>
