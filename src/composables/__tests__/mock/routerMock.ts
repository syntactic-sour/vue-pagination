import { createRouter, createWebHistory } from 'vue-router'
import ViewMock from './ViewMock.vue'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewMock,
    },
  ],
})
