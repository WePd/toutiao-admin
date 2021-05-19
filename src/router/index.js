import Vue from 'vue'
import VueRouter from 'vue-router'
//@表示src目录的别名 
import Login from '@/views/login/'
import Home from '@/views/home'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
