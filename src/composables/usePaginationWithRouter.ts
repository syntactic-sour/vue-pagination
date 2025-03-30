import { onBeforeMount } from 'vue'
import { useRoute, useRouter, type LocationQuery, type LocationQueryValue } from 'vue-router'
import { DEFAULT_PAGINATION_LIMITS, usePagination } from './usePagination'

export function usePaginationWithRouter(limits = DEFAULT_PAGINATION_LIMITS) {
  const route = useRoute()
  const router = useRouter()

  const {
    limitsWhitelist,
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setPage,
    setLimit,
    setPrevPage,
    setNextPage,
  } = usePagination({
    limits,
    show:
      !isNaN(Number(route.query.show)) && limits.has(Number(route.query.show))
        ? Number(route.query.show)
        : undefined,
    page: isValidQueryPage(route.query.page) ? Number(route.query.page) : undefined,
  })

  function isValidQueryPage(page: LocationQueryValue | LocationQueryValue[]) {
    return !isNaN(Number(page)) && Number(page) > 0
  }

  function isValidQueryLimit(show: LocationQueryValue | LocationQueryValue[]) {
    return !isNaN(Number(show)) && limitsWhitelist.value.has(Number(show))
  }

  onBeforeMount(() => {
    const isValidLimit = isValidQueryLimit(route.query.show)
    const isValidPage = isValidQueryPage(route.query.page)
    if (isValidLimit && isValidPage) {
      return
    }

    const newQuery: LocationQuery = {}

    if (!isValidLimit) {
      newQuery.show = String(paginationApiParams.value.limit)
    }
    if (!isValidPage) {
      newQuery.page = String(currentPage.value)
    }

    router.push({ query: newQuery })
  })
}
