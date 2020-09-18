<template lang="pug">
  v-list.ui-search-result-list
    template(v-if="statistics.length > 0")
      v-list-item(v-for="(data, di) in statistics" :key="di")
        v-list-item-action
          v-btn(icon @click="remove(di)")
            v-icon mdi-close
        v-list-item-content
          v-row
            v-col
              .list-item-header.mb-2 キーワード
              .list-item-content
                v-card(flat)
                  v-card-text.px-0
                    span {{ data.keyword }}
            v-col
              .list-item-header.mb-2 1投稿平均視聴回数
              .list-item-content
                v-card(outlined :class="buildClass(data.averageViewCount, setting.averageViewCount)")
                  v-card-text.font-weight-bold {{ data.averageViewCount | formatNumber }}
            v-col
              .list-item-header.mb-2 7日間の投稿数
              .list-item-content
                v-card(outlined :class="buildClass(data.weeklyPublishCount, setting.weeklyPublishCount)")
                  v-card-text.font-weight-bold {{ data.weeklyPublishCount | formatNumber }}
            v-col
              .list-item-header.mb-2 7日間の視聴回数
              .list-item-content
                v-card(outlined :class="buildClass(data.weeklyViewCount, setting.weeklyViewCount)")
                  v-card-text.font-weight-bold {{ data.weeklyViewCount | formatNumber }}
    template(v-else)
      v-list-item
        v-list-item-content 検索結果はまだありません
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { settingsStore, statisticsStore } from '@store/index'
import { Setting, SettingThreshold } from '@models/setting'

export default defineComponent({
  setup() {
    const setting = computed(() => settingsStore.setting)
    const statistics = computed(() => statisticsStore.statistics)

    function remove(index: number): void {
      statisticsStore.removeStatistics(index)
    }
    function buildClass(count: number, settingThreshold: SettingThreshold): string[] {
      switch (true) {
        case count >= settingThreshold.upper:
          return ['red', 'lighten-2']
          break
        case count >= settingThreshold.median:
          return ['amber', 'lighten-2']
          break
        case count >= settingThreshold.lower:
          return ['indigo', 'lighten-2']
          break
      }
      return []
    }
    return { setting, statistics, remove, buildClass }
  }
})
</script>
