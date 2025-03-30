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
  const total = ref<number>(Infinity)

  const limitsWhitelist = ref<Set<number>>(limits)
  const currentLimit = ref(
    show && limitsWhitelist.value.has(show) ? show : [...limitsWhitelist.value][0],
  )

  const offset = computed(() =>
    currentPage.value > 1 ? (currentPage.value - 1) * currentLimit.value : 0,
  )
  const paginationApiParams = computed(() => ({
    offset: offset.value,
    limit: currentLimit.value,
  }))

  const pagesTotal = computed(() => {
    if (!isFinite(total.value)) {
      return currentPage.value
    }

    if (total.value === 0) {
      return 1
    }

    return Math.ceil(total.value / currentLimit.value)
  })

  function setTotal() {}

  function setPage() {}

  return {
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setPage,
  }
}
