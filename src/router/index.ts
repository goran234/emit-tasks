import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import formBuilderRoutes from '../task-one/routes';
import taskListRoutes from '../task-two/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/task-one',
    },
    ...taskListRoutes,
    ...formBuilderRoutes,
  ],
})

export default router
