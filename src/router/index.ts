import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/IngredienteTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ingrediente-table',
      component: () => import('../views/IngredienteTable.vue'),
    },
    {
      path: '/ingrediente-form',
      name: 'ingrediente-form',
      component: () => import('../views/IngredienteForm.vue'),
    },
  ],
})

export default router
