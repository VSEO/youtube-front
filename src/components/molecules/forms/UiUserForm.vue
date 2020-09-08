<template lang="pug">
  v-form.ui-user-form(ref="form")
    v-text-field(label="ID" type="text" outlined placeholder="ID" :rules="rules.id" validate-on-blur v-model="form.id" :disabled="!registered")
    v-text-field(label="パスワード" type="text" outlined placeholder="8桁以上の英数字記号" :rules="rules.password" validate-on-blur v-model="form.password")
    v-select(:items="items" label="権限" outlined validate-on-blur v-model="form.role")
    v-btn(block @click="submit" :loading="loading") {{ registered ? '会員を追加する' : '会員を編集する' }}
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { Role } from '@models/user'
import { isBlank, isEnum } from 'src/utils/validator'

export enum FormType {
  REGISTER = 1,
  EDIT = 2
}
export default defineComponent({
  model: { prop: 'form', event: 'change' },
  props: {
    form: { type: Object, default: () => ({ id: '', password: '', role: Role.USER }) },
    loading: { type: Boolean, default: false },
    type: { type: Number, default: FormType.REGISTER }
  },
  setup({ form, type }, context) {
    const registered = computed(() => type === FormType.REGISTER)
    const rules = {
      id: [
        (value: string) => !isBlank(value) || 'IDが入力されていません',
      ],
      password: [
        // Required if form type is REGISTER
        (value: string) => !registered.value || !isBlank(value) || 'パスワードが入力されていません'
      ],
      role: [
        (value: number) => !isBlank(value) || '権限が選択されていません',
        (value: number) => isEnum(value, Role) || '権限が不正です'
      ]
    }
    const items = Role.toArray([])

    function submit(): void {
      // @ts-ignore
      if (context.refs.form.validate()) {
        context.emit('submit', form)
      }
    }
    return { registered, rules, items, submit }
  }
})
</script>
