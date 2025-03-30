import { describe, it, expect } from 'vitest'
import { usePagination } from '../usePagination.ts'

describe('usePagination', () => {
  it('sets default current page correctly', () => {
    const { currentPage } = usePagination()
    expect(currentPage.value).toEqual(1)
  })

  it('sets default limit correctly', () => {
    const { paginationApiParams } = usePagination({ limits: new Set([10]), page: 2 })
    expect(paginationApiParams.value.limit).toEqual(10)
  })

  it('sets default offset correctly', () => {
    const { paginationApiParams } = usePagination({ limits: new Set([10]), page: 2 })
    expect(paginationApiParams.value.offset).toEqual(10)
  })

  it('calculates current page and overall pages amout correctly', () => {
    const { currentPage, paginationApiParams, pagesTotal, setTotal } = usePagination({
      limits: new Set([10]),
      page: 3,
    })
    expect(currentPage.value).toEqual(3)
    expect(paginationApiParams.value.offset).toEqual(20)
    setTotal(100)
    expect(pagesTotal.value).toEqual(10)
    expect(currentPage.value).toEqual(3)
    expect(paginationApiParams.value.offset).toEqual(20)
    setTotal(30)
    expect(pagesTotal.value).toEqual(3)
    expect(currentPage.value).toEqual(3)
    expect(paginationApiParams.value.offset).toEqual(20)
    setTotal(29)
    expect(pagesTotal.value).toEqual(3)
    expect(currentPage.value).toEqual(3)
    expect(paginationApiParams.value.offset).toEqual(20)
    setTotal(11)
    expect(pagesTotal.value).toEqual(2)
    expect(currentPage.value).toEqual(2)
    expect(paginationApiParams.value.offset).toEqual(10)
    setTotal(10)
    expect(pagesTotal.value).toEqual(1)
    expect(currentPage.value).toEqual(1)
    expect(paginationApiParams.value.offset).toEqual(0)
    setTotal(1)
    expect(pagesTotal.value).toEqual(1)
    expect(currentPage.value).toEqual(1)
    expect(paginationApiParams.value.offset).toEqual(0)
    setTotal(0)
    expect(pagesTotal.value).toEqual(1)
    expect(currentPage.value).toEqual(1)
    expect(paginationApiParams.value.offset).toEqual(0)
  })

  it('throws when setting page outside of pagination range', () => {
    const { setTotal, setPage } = usePagination({
      limits: new Set([10]),
      page: 3,
    })
    expect(() => setPage(-1)).toThrowError
    setTotal(0)
    expect(() => setPage(2)).toThrowError
    setTotal(10)
    expect(() => setPage(2)).toThrowError
  })

  it('sets page correctly', () => {
    const { currentPage, pagesTotal, setTotal, setPage } = usePagination({
      limits: new Set([10]),
      page: 3,
    })
    expect(currentPage.value).toEqual(3)
    expect(pagesTotal.value).toEqual(3)

    setTotal(0)
    expect(currentPage.value).toEqual(1)
    expect(pagesTotal.value).toEqual(1)

    setTotal(100)
    setPage(3)
    expect(currentPage.value).toEqual(3)
    expect(pagesTotal.value).toEqual(10)

    setPage(10)
    expect(currentPage.value).toEqual(10)
    expect(pagesTotal.value).toEqual(10)
  })
})
