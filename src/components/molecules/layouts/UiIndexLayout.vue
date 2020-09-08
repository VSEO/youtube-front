<template lang="pug">
  v-container.ui-index-layout
    v-row
      v-col
        h2 {{ title }}
        p.mt-1.mb-0 {{ description }}
    v-row(v-if="$slots.action || $slots.search")
      v-col.align-self-center.text-left(v-if="$slots.action")
        slot(name="action")
      template(v-if="$slots.search")
        v-spacer
        v-col.align-self-center.text-right(cols="auto")
          slot(name="search")
    v-row(v-if="$slots.content")
      v-col
        slot(name="content")
    slot(name="default")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true }
  }
})
</script>

