import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, ref } from 'vue'
import * as VueRouterExports from 'vue-router'
import { router } from './mock/routerMock.ts'
import { getRouteMock } from './mock/routeMock.ts'
import { usePaginationWithRouter } from '../usePaginationWithRouter.ts'
import { mount } from '@vue/test-utils'

vi.mock('vue-router')
const TestComponent = defineComponent({
  props: {
    limitVariants: Set<number>,
  },
  setup(props) {
    return usePaginationWithRouter(props.limitVariants)
  },
  template: '<div/>',
})

describe('usePaginationWithRouter', () => {
  vi.mocked(VueRouterExports.useRouter).mockReturnValue({
    ...router,
    push: vi.fn(),
  })

  beforeEach(() => {
    vi.mocked(VueRouterExports.useRouter()).push.mockReset()
    vi.mocked(VueRouterExports.useRoute).mockReset()
  })

  it('sets initial query parameters from limitsVariants, page to 1', () => {
    vi.mocked(VueRouterExports.useRoute).mockReturnValue(getRouteMock())

    const limitVariants = new Set([11, 22])
    const wrapper = mount(TestComponent, { props: { limitVariants } })

    expect(VueRouterExports.useRouter().push).toHaveBeenCalledWith({
      query: { show: '11', page: '1' },
    })
    wrapper.unmount()
  })
})
