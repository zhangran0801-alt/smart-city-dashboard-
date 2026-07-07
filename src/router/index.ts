import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/traffic',
    },
    {
      path: '/traffic',
      name: 'TrafficOverview',
      component: () => import('@/views/TrafficOverview/index.vue'),
      meta: { title: '城市交通总览' },
    },
    {
      path: '/environment',
      name: 'Environment',
      component: () => import('@/views/Environment/index.vue'),
      meta: { title: '环境监测' },
    },
    {
      path: '/population',
      name: 'Population',
      component: () => import('@/views/Population/index.vue'),
      meta: { title: '人口与经济' },
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: () => import('@/views/Monitor/index.vue'),
      meta: { title: '实时监控' },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || '智慧城市'} - Smart City Dashboard`
  next()
})

export default router
