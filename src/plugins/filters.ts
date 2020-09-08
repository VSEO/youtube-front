import Vue from 'vue'
import { formatDate, formatDateTime, truncate } from '@utils/transformer'

interface Filter {
  id: string
  definition: Function
}

export const filters: Filter[] = [
  { id: 'formatDate', definition: formatDate },
  { id: 'formatDateTime', definition: formatDateTime },
  { id: 'truncate', definition: truncate }
]
filters.forEach((filter: Filter) => Vue.filter(filter.id, filter.definition))
