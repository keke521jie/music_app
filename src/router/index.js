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
    component: ()=>import('../pages/SongList')
  },
]

const router = createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes
})

export default router

