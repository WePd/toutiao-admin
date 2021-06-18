import Vue from 'vue'
import VueRouter from 'vue-router'
//@表示src目录的别名 
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

//全局前置导航守卫，可以控制登录要求
router.beforeEach((to, from, next) => {
  //检测本地localstorge
  const user = JSON.parse(window.localStorage.getItem('user'));
  if(to.path != '/login' ){
    if(user) next()
    else{
      next('/login')
    }
  }
  else next()
})
export default router
