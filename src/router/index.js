import Vue from 'vue'
import VueRouter from 'vue-router'
import WeatherDetails from '@/views/WeatherDetails.vue'
import Favorites from '@/views/Favorites.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: WeatherDetails
  },
  {
    path: '/favorites',
    component: Favorites
  }
]

export const router = new VueRouter({ routes })

