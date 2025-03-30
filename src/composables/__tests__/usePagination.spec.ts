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
})
