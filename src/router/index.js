import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/film/:filmId',
    name: 'film',
    component: () => import('@/views/Film.vue')
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('@/views/Characters.vue')
  },
  {
    path: '/character/:characterId',
    name: 'character',
    component: () => import('@/views/Character.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
