import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Account from '../page/Account'
import AccountCenter from '../page/Account/Center'
import AccountLog from '../page/Account/Log'
import Category from '../page/Category'
import Cart from '../page/Cart'
import Member from '../page/Member'
import Login from '../page/Member/Login'
import Search from '../page/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/account/center',
      name: 'account-center',
      component: AccountCenter
    },
    {
      path: '/account/log',
      name: 'account-log',
      component: AccountLog
    },
  ]
})
