import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RegisterLogin from '../views/RegisterLogin.vue'
import Create from '../views/Create.vue'
import Index from '../views/Org1/index.vue'
import Index1 from '../views/Org2/Index1.vue'
import UpdateOrg1 from '../views/Org1/UpdateOrg1.vue'
import UpdateOrg2 from '../views/Org2/UpdateOrg2.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/',
    name: 'registerLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterLogin.vue')
  },
  {
    path: '/Org1',
    name: 'Organisation1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Org1/index.vue')
  },
  {
    path: '/Org2',
    name: 'Organisation2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Org2/Index1.vue')
  },  
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  {
    path: '/updateOrg1/:id',
    name: 'UpdateOrg1',
    component: () => import(/* webpacOrganisation2kChunkName: "about" */ '../views/Org1/UpdateOrg1.vue')
  },
  {
    path: '/updateOrg2/:id',
    name: 'UpdateOrg2',
    component: () => import(/* webpacOrganisation2kChunkName: "about" */ '../views/Org2/UpdateOrg2.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpacOrganisation2kChunkName: "about" */ '../views/Search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
