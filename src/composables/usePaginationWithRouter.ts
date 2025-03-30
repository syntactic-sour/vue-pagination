import { onBeforeMount, watch } from 'vue'
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

  watch(
    () => route.query,
    async (queryParams) => {
      const isValidNewQueryLimit = isValidQueryLimit(queryParams.show)
      const isValidNewQueryPage = isValidQueryPage(queryParams.page)

      const newQueryParams: LocationQuery = {}

      if (!isValidNewQueryLimit) {
        newQueryParams.show = String(paginationApiParams.value.limit)
      }

      if (!isValidNewQueryPage) {
        newQueryParams.page = String(currentPage.value)
      }

      if (!isValidNewQueryLimit || !isValidNewQueryPage) {
        router.push({ query: newQueryParams })

        return
      }

      // Important to keep this order. Limit may reset the page to 1
      setLimit(Number(queryParams.show))
      setPage(Number(queryParams.page))
    },
    { immediate: true },
  )

  return {
    limitsWhitelist,
    currentPage,
    pagesTotal,
    paginationApiParams,

    setTotal,
    setPage,
    setLimit,
    setPrevPage,
    setNextPage,
  }
}
