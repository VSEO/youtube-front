<template lang="pug">
  v-form.ui-search-form(ref="form" @submit.prevent)
    v-row
      v-col(cols="10")
        v-text-field(
          dense hide-details label="キーワード" outlined placeholder="キーワードを入力してください"
          v-model="form.keyword"
        )
      v-col(cols="2")
        v-btn(color="red" dark :loading="loading" @click="submit")
          v-icon mdi-magnify
          span 追加する
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  model: { prop: 'form', event: 'change' },
  props: {
    form: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
  },
  setup({ form }, context) {
    function submit(): void {
      // @ts-ignore
      if (context.refs.form.validate()) {
        context.emit('submit', form)
      }
    }

    return { submit }
  }
})
</script>
