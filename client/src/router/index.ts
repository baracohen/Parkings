import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Parkings from '../views/Parkings.vue'
import ParkingView from '../views/ParkingView.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/parkings',
    name: 'Parkings',
    component: Parkings
  },
  {
    path: '/parkingView/:parkingId',
    name: 'ParkingView',
    component: ParkingView
  }  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
