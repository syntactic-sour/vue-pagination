import { describe, it, expect } from 'vitest'
import { usePagination } from '../usePagination.ts'

describe('usePagination', () => {
  it('sets default current page correctly', () => {
    const { currentPage } = usePagination()
    expect(currentPage.value).toEqual(1)
  })
})
