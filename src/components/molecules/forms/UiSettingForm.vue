<template lang="pug">
  v-form(ref="form")
    v-row
      v-col(cols="12")
        v-card
          v-card-title 平均視聴回数
          v-card-subtitle 平均視聴回数を条件で色分けできます。
          v-card-text
            v-list
              v-list-item.red.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.averageViewCountUpper" v-model="form.averageViewCountUpper" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は赤色で色分けします
              v-list-item.amber.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.averageViewCountMedian" v-model="form.averageViewCountMedian" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は黄色で色分けします (※ 赤色で設定した値未満)
              v-list-item.indigo.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.averageViewCountLower" v-model="form.averageViewCountLower" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は青色で色分けします (※ 黄色で設定した値未満)
      v-col(cols="12")
        v-card
          v-card-title 7日間の投稿数
          v-card-subtitle 7日間の投稿数を条件で色分けできます。
          v-card-text
            v-list
              v-list-item.red.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.weeklyPublishCountUpper" v-model="form.weeklyPublishCountUpper" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は赤色で色分けします
              v-list-item.amber.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.weeklyPublishCountMedian" v-model="form.weeklyPublishCountMedian" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は黄色で色分けします (※ 赤色で設定した値未満)
              v-list-item.indigo.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.weeklyPublishCountLower" v-model="form.weeklyPublishCountLower" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は青色で色分けします (※ 黄色で設定した値未満)
      v-col(cols="12")
        v-card
          v-card-title 7日間の視聴回数
          v-card-subtitle 7日間の視聴回数を条件で色分けできます。
          v-card-text
            v-list
              v-list-item.red.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.weeklyViewCountUpper" v-model="form.weeklyViewCountUpper" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は赤色で色分けします
              v-list-item.amber.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.weeklyViewCountMedian" v-model="form.weeklyViewCountMedian" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は黄色で色分けします (※ 赤色で設定した値未満)
              v-list-item.indigo.lighten-2.my-2
                v-list-item-content
                  v-text-field(type="number" :rules="rules.weeklyViewCountLower" v-model="form.weeklyViewCountLower" background-color="white" dense outlined hide-details)
                v-list-item-content
                  .white--text.font-weight-bold.pl-2 回以上は青色で色分けします (※ 黄色で設定した値未満)
      v-col(cols="12")
        .text-right
          v-btn(@click="submit" :loading="loading") 設定を保存する
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { isEmpty, isNumber } from '@utils/validator'

export default defineComponent({
  model: { prop: 'form', event: 'change' },
  props: {
    form: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
  },
  setup({ form }, context) {
    const rules = {
      averageViewCountUpper: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value >= form.averageViewCountMedian || '値が不正です',
      ],
      averageViewCountMedian: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value <= form.averageViewCountUpper || '値が不正です',
        (value: string) => value >= form.averageViewCountLower || '値が不正です',
      ],
      averageViewCountLower: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value <= form.averageViewCountMedian || '値が不正です',
      ],
      weeklyPublishCountUpper: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value >= form.weeklyPublishCountMedian || '値が不正です',
      ],
      weeklyPublishCountMedian: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value <= form.weeklyPublishCountUpper || '値が不正です',
        (value: string) => value >= form.weeklyPublishCountLower || '値が不正です',
      ],
      weeklyPublishCountLower: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value <= form.weeklyPublishCountMedian || '値が不正です',
      ],
      weeklyViewCountUpper: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value >= form.weeklyViewCountMedian || '値が不正です',
      ],
      weeklyViewCountMedian: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value <= form.weeklyViewCountUpper || '値が不正です',
        (value: string) => value >= form.weeklyViewCountLower || '値が不正です',
      ],
      weeklyViewCountLower: [
        (value: string) => !isEmpty(value) || isNumber(value) || '値が入力されていません',
        (value: string) => value <= form.weeklyViewCountMedian || '値が不正です',
      ],
    }

    function submit(): void {
      // @ts-ignore
      if (context.refs.form.validate()) {
        context.emit('submit', form)
      }
    }

    return { rules, submit }
  }
})
</script>
