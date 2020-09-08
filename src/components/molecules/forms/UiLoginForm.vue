<template lang="pug">
  v-form.ui-login-form(ref="form")
    v-text-field(
      label="ID"
      type="text"
      outlined
      placeholder="IDを入力してください"
      :rules="rules.id"
      v-model="form.id"
      @keyup.enter="submit"
    )
    v-text-field(
      label="パスワード"
      type="password"
      outlined
      placeholder="パスワードを入力してください"
      :rules="rules.password"
      v-model="form.password"
      @keyup.enter="submit"
    )
    p(v-if="error")
      v-icon.mr-1(color="red") mdi-alert-circle
      span.red--text IDまたはパスワードが間違っています
    v-btn(block large :loading="loading" @click="submit") ログイン
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { isBlank } from '@utils/validator'

export default defineComponent({
  model: { prop: 'form', event: 'change' },
  props: {
    form: { type: Object, default: { id: '', password: '' } },
    loading: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  },
  setup({ form }, context) {
    const rules = {
      id: [
        (value: string) => !isBlank(value) || 'IDが入力されていません',
      ],
      password: [
        (value: string) => !isBlank(value) || 'パスワードが入力されていません'
      ]
    }

    function submit(): void {
      // @ts-ignore
      if (context.refs.form.validate()) context.emit('submit', form)
    }
    return { rules, submit }
  }
})
</script>
