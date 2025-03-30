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

  function correctCurrentPage() {
    if (total.value === 0) {
      currentPage.value = 1
      return
    }

    if (total.value <= (currentPage.value - 1) * currentLimit.value) {
      currentPage.value = Math.ceil(total.value / currentLimit.value)
    }
  }

  function setTotal(newTotal: number) {
    total.value = newTotal >= 0 ? newTotal : 0
    correctCurrentPage()
  }

  function setPage(newPage: number) {
    if (newPage < 1 || total.value <= (newPage - 1) * currentLimit.value) {
      throw new Error('Unable to set page that is outside of pagination range')
    }
    currentPage.value = newPage
  }

  function setLimit(newLimit: number) {
    const oldLimit = currentLimit.value
    currentLimit.value = limitsWhitelist.value.has(newLimit)
      ? newLimit
      : [...limitsWhitelist.value][0]

    if (oldLimit !== currentLimit.value) {
      currentPage.value = 1
    }
  }

  function setNextPage() {}

  function setPrevPage() {}

  return {
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setLimit,
    setPage,
    setNextPage,
    setPrevPage,
  }
}
