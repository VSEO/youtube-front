<template lang="pug">
  ui-data-table.ui-user-table(
    :headers="headers"
    :items="items"
    :loading="loading"
    :page="conditions.page"
    :total="total"
    :sort="conditions.sort"
    @update:page="onUpdatePage"
    @sort="onSort"
  )
    template(#item.role="{ item }")
      span {{ item.roleName }}
    template(#item.createdAt="{ item }")
      span {{ item.createdAt | formatDateTime }}
    template(#item.updatedAt="{ item }")
      span {{ item.updatedAt | formatDateTime }}
    template(#item.action="{ item }")
      v-btn(icon)
        v-icon(small @click="$emit('edit', item)") mdi-pencil
      v-btn(icon)
        v-icon(small @click="$emit('delete', item)") mdi-delete
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import UiDataTable from '@molecules/tables/UiDataTable.vue'
import { usersStore } from '@store/index'

export default defineComponent({
  components: { UiDataTable },
  setup() {
    onBeforeMount(() => usersStore.search())

    const headers = [
      { text: 'ID', value: 'id' },
      { text: 'パスワード', value: 'password' },
      { text: '権限', value: 'role' },
      { text: '登録日時', value: 'createdAt' },
      { text: '更新日時', value: 'updatedAt' },
      { text: 'アクション', value: 'action', sortable: false },
    ]
    const items = computed(() => usersStore.users)
    const loading = ref(false)
    const conditions = computed(() => usersStore.conditions)
    const total = computed(() => usersStore.total)

    function onSort(sort: { key: string; desc: boolean }): void {
      loading.value = true
      usersStore.setConditions({ sort })
      usersStore.search().finally(() => loading.value = false)
    }
    function onUpdatePage(_page: number): void {
      loading.value = true
      usersStore.setConditions({ page: _page })
      usersStore.search().finally(() => loading.value = false)
    }

    return { headers, items, loading, conditions, total, onSort, onUpdatePage }
  }
})
</script>
