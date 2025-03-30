import { computed, ref } from 'vue'

export const DEFAULT_PAGINATION_LIMITS = new Set([10, 20, 30])

export function usePagination({
  limits = DEFAULT_PAGINATION_LIMITS,
  show,
  page = 1,
}: {
  show?: number
  limits?: Set<number>
  page?: number
} = {}) {
  const currentPage = ref(page)

  return {
    currentPage,
  }
}
