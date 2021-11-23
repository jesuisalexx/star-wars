import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: true, exact: true, to: { name: 'home' } }
      ]
    }
  },
  {
    path: '/film/:filmId',
    name: 'film',
    component: () => import('@/views/Film.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Film', disabled: true, exact: true, to: { name: 'film' } }
      ]
    }
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('@/views/Characters.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Characters', disabled: true, exact: true, to: { name: 'characters' } }
      ]
    }
  },
  {
    path: '/character/:characterId',
    name: 'character',
    component: () => import('@/views/Character.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Characters', disabled: false, exact: true, to: { name: 'characters' } },
        { text: 'Character', disabled: true, exact: true, to: { name: 'character' } }
      ]
    }
  },
  {
    path: '/planet/:planetId',
    name: 'planet',
    component: () => import('@/views/Planet.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Planets', disabled: false, exact: true, to: { name: 'planets' } },
        { text: 'Planet', disabled: true, exact: true, to: { name: 'planet' } }
      ]
    }
  },
  {
    path: '/planets',
    name: 'planets',
    component: () => import('@/views/Planets.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Planets', disabled: true, exact: true, to: { name: 'planets' } }
      ]
    }
  },
  {
    path: '/starships',
    name: 'starships',
    component: () => import('@/views/Starships.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Starships', disabled: true, exact: true, to: { name: 'starships' } }
      ]
    }
  },
  {
    path: '/starship/:starshipId',
    name: 'starship',
    component: () => import('@/views/Starship.vue'),
    meta: {
      crumbs: [
        { text: 'Home', disabled: false, exact: true, to: { name: 'home' } },
        { text: 'Starships', disabled: false, exact: true, to: { name: 'starships' } },
        { text: 'Starship', disabled: true, exact: true, to: { name: 'starship' } }
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
