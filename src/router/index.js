import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Board2List.vue'),
    },
    {
      path: '/write',
      component: () => import('../views/WriteMod.vue'),
    },
    {
      path: '/mod/:id',
      component: () => import('../views/WriteMod.vue'),
    },
    {
      path: '/detail/:id',
      component: () => import('../views/Board2Detail.vue'),
    },
  ],
})

export default router
