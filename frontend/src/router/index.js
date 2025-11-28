import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import SignupPage from '@/components/SignupPage.vue'
import LoginPage from '@/components/LoginPage.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
