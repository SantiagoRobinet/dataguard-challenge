import { createRouter, createWebHistory } from 'vue-router'

import Loading from '@/views/LoadingView.vue'
import Error from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loading
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },
  ]
})

export default router
