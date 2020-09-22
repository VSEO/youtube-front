<template lang="pug">
  v-container
    v-row
      v-col(cols="12")
        p 情報はまだありません
      //v-col(cols="12")
        v-card(flat)
          v-card-text
            ui-search-form(v-model="form" :loading="loading" @submit="submit")
            p.mb-0(v-if="keyword && suggests.length > 0")
              span {{ `「${keyword}」の関連キーワード:` }}
              v-btn.text-none.ml-2(small v-for="(suggest, si) in suggests" :key="si" @click="add(suggest.keyword)")
                v-icon(small) mdi-plus
                span.ml-1 {{ suggest.keyword }}
      //v-col(cols="12")
        ui-search-result-list
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, ref } from '@vue/composition-api'
import { settingsStore, statisticsStore, suggestsStore } from '@store/index'
import UiSearchResultList from '@organisms/lists/UiSearchResultList.vue'
import UiSearchForm from '@molecules/forms/UiSearchForm.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: { UiSearchResultList, UiSearchForm },
  async validate(_): Promise<boolean> {
    return await settingsStore.load()
      .then(() => true)
      .catch(() => false)
  },
  setup() {
    onBeforeMount(() => {
      statisticsStore.setStatistics([])
      suggestsStore.setKeyword('')
      suggestsStore.setSuggests([])
    })

    const loading = ref(false)
    const form = reactive({ keyword: '' })
    const keyword = computed(() => suggestsStore.keyword)
    const suggests = computed(() => suggestsStore.suggests)

    async function submit() {
      loading.value  = true
      await statisticsStore.search(form)
        .then(() => suggestsStore.search(form))
        .finally(() => {
          form.keyword = ''
          loading.value = false
        })
    }
    async function add(keyword: string) {
      form.keyword = keyword
      await submit()
    }

    return { form, suggests, loading, keyword, submit, add }
  }
})
</script>
