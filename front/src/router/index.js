import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../components/user/index.vue'
import UserInfo from '../components/userInfo/index.vue'
import Chartmanager from "@/components/chartmanager/index"
import WorkingTimes from '../components/workingtimes/index'
import WorkingTime from '../components/workingtime/index'
import ClockManager from '../components/clockManager/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    name: 'User',
    component: User
  }, {
    path: '/user/:userId',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/chartManager/:userId',
    name: 'Chart',
    component: Chartmanager
  },
  {
    path: '/workingtimes/:userId',
    name: 'WorkingTimes',
    component: WorkingTimes
  },
  {
    path: '/workingtime/:userId/:workingTimeId',
    name: 'WorkingTime',
    component: WorkingTime
  },
  {
    path: '/clockManager/:userId',
    name: 'Clock',
    component: ClockManager
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
