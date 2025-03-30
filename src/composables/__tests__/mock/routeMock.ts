import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

export function getRouteMock(): RouteLocationNormalizedLoadedGeneric {
  return {
    name: 'home',
    matched: [],
    params: {},
    fullPath: '/',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/',
    meta: {},
  }
}
