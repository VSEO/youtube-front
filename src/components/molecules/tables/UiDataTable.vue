<template lang="pug">
  v-data-table.ui-data-table(:headers="headers" :items="items" :loading="loading" hide-default-header hide-default-footer)
    template(#header="{ props }")
      thead.ui-data-table-header
        tr
          th.ui-data-table-header__item.caption(
            v-for="(header, hi) in props.headers" :key="hi"
            @click="header.sortable !== false && onSort(header.value, sort.key === header.value ? !sort.desc : true)"
          )
            | {{ header.text }}
            v-icon(small v-if="sort.key === header.value") {{ sort.desc ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
          th(v-if="selectable")
    template(#item="{ item, headers }")
      tr.ui-data-table__row(:class="{ 'ui-data-table__row-selectable': selectable }" @click="selectable ? onSelectRow(item) : undefined")
        td(v-for="(header, hi) in headers" :key="hi")
          template(v-if="hasSlot(header.value)")
            slot(:name="`item.${header.value}`" :item="item")
          template(v-else)
            span {{ item[header.value] }}
        td(v-if="selectable")
          v-icon mdi-chevron-right
    template(#footer)
      v-divider
      v-sheet
        v-layout.py-4
          v-spacer
          v-flex(shrink align-self-center)
            .d-inline-flex
              span.caption {{ pager.range.from }} - {{ pager.range.to }}
              span.caption.px-2 of
              span.caption {{ total }}
          v-flex.px-8(shrink align-self-center)
            v-btn(icon text :disabled="pager.isFirst(page)" @click="onChangePage(page - 1)")
              v-icon(small) mdi-chevron-left
            span.caption.px-2(v-if="pager.isAboveSecond(page)") ...
            template(v-for="p in [page - 1, page, page + 1]")
              v-btn(icon text v-if="pager.isValidPage(p)" :disabled="p === page"  @click="onChangePage(p)")
                span.caption  {{ p }}
            span.caption.px-2(v-if="pager.isBelowBeforeLast(page)") ...
            v-btn(icon text :disabled="pager.isLast(page)" @click="onChangePage(page + 1)")
              v-icon(small) mdi-chevron-right
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
  props: {
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    page: { type: Number, required: true },
    count: { type: Number, default: 10 },
    total: { type: Number, required: true },
    sort: { type: Object, default: () => ({ key: undefined, desc: false }) },
    selectable: { type: Boolean, default: false }
  },
  setup(props, context) {
    const pager = reactive(buildPager(props.page, props.count, props.total))
    function hasSlot(_name: string): boolean {
      return context.slots?.hasOwnProperty(`item.${_name}`)
    }
    function onSort(key: string, desc: boolean): void {
      context.emit('sort', { key, desc })
    }
    function onSelectRow(item: any): void {
      context.emit('select', item)
    }
    function onChangePage(_page: number): void {
      context.emit('update:page', _page)
    }

    watch(
      () => [props.page, props.count, props.total],
      ([_page, _count, _total]) => {
        Object.assign(pager, buildPager(_page, _count, _total))
      },
      { deep: true, immediate: false }
    )

    return { pager, hasSlot, onSort, onSelectRow, onChangePage }
  }
})

function buildPager(page: number, count: number, total: number) {
  const range = {
    from: total ? (page - 1) * count + 1 : 0,
    to: Math.min(page * count, total)
  }
  const maxPage = Math.ceil(total / count)
  const isFirst = (_page: number): boolean => _page === 1
  const isAboveSecond = (_page: number): boolean => _page > 2
  const isLast = (_page: number): boolean => _page === maxPage
  const isBelowBeforeLast = (_page: number): boolean => _page < maxPage - 1
  const isValidPage = (_page: number): boolean => _page >= 1 && _page <= maxPage

  return { range, maxPage, isFirst, isAboveSecond, isLast, isBelowBeforeLast, isValidPage }
}
</script>

<style lang="scss" scoped>
.ui-data-table {
  &-header {
    &__item {
      cursor: pointer;
    }
  }
  ::v-deep &__row-selectable {
    cursor: pointer;
  }
}
</style>
