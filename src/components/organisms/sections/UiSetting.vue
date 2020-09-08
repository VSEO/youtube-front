<template lang="pug">
  ui-setting-form.ui-setting(v-model="form" @submit="submit")
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import UiSettingForm from '@molecules/forms/UiSettingForm.vue'
import { settingsStore } from '@store/index'

export default defineComponent({
  components: { UiSettingForm },
  props: {
    setting: { type: Object, required: true }
  },
  setup({ setting }) {
    const error = ref(false)
    const loading = ref(false)
    const form = reactive({
      averageViewCountUpper: 0,
      averageViewCountMedian: 0,
      averageViewCountLower: 0,
      weeklyPublishCountUpper: 0,
      weeklyPublishCountMedian: 0,
      weeklyPublishCountLower: 0,
      weeklyViewCountUpper: 0,
      weeklyViewCountMedian: 0,
      weeklyViewCountLower: 0,
    })

    function submit(): void {
      error.value = false
      loading.value = true
      settingsStore.update(form)
        .then(() => settingsStore.load())
        .catch(() => error.value = true)
        .finally(() => loading.value = false)
    }

    watch(
      () => setting,
      s => Object.assign(form, {
        averageViewCountUpper: s.averageViewCount.upper,
        averageViewCountMedian: s.averageViewCount.median,
        averageViewCountLower: s.averageViewCount.lower,
        weeklyPublishCountUpper: s.weeklyPublishCount.upper,
        weeklyPublishCountMedian: s.weeklyPublishCount.median,
        weeklyPublishCountLower: s.weeklyPublishCount.lower,
        weeklyViewCountUpper: s.weeklyViewCount.upper,
        weeklyViewCountMedian: s.weeklyViewCount.median,
        weeklyViewCountLower: s.weeklyViewCount.lower,
      }),
      { deep: true, immediate: true }
    )

    return { form, submit }
  }
})
</script>
