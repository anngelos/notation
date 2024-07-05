import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import UserInfoView from '@/views/UserInfoView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  {
    path: '/user-info',
    name: 'userinfo',
    component: UserInfoView,
    meta: { requiresAuth: true },
  },

  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },

  {
    path: '/dashboard',
    name: 'dasboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.token !== null;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
