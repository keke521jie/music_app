import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/songlist',
    name: 'SongList',
    component: () => import('../pages/SongList')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/Search')
  },
  {
    path: '/commentary/:id',
    name: 'Commentary',
    component: () => import('../pages/Commentary'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

