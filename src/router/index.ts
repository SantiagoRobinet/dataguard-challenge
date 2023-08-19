import { createRouter, createWebHistory } from 'vue-router'

import Loading from '@/views/Loading.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loading
    },
  ]
})

export default router
