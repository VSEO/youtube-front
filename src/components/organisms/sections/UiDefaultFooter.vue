<template lang="pug">
  v-footer.ui-default-footer(dark)
    v-container
      v-row
        v-col(:cols="12")
          p.caption.mb-0.grey--text.text--lighten-2.text-center
            | © 2020. All Rights Reserved.
        v-col(:cols="12") 
          v-btn(href="./../../YTシークレットサーチ利用規約.pdf" target="_blank")
             | 利用規約
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
