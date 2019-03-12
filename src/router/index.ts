import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Index.vue';
import Account from '@/pages/Account/Index.vue';
import AccountCenter from '@/pages/Account/Center.vue';
import AccountLog from '@/pages/Account/Log.vue';
import Category from '@/pages/Category/Index.vue';
import Cart from '@/pages/Cart/Index.vue';
import Member from '@/pages/Member/Index.vue';
import Login from '@/pages/Member/Login.vue';
import Search from '@/pages/Search/Index.vue';
import Product from '@/pages/Goods/Index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: '首页',
            },
        },
        {
            path: '/category',
            name: 'category',
            component: Category,
            meta: {
                title: '分类',
            },
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: {
                title: '购物车',
            },
        },
        {
            path: '/product/:id',
            name: 'product',
            component: Product,
            meta: {
                title: '商品',
            },
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
            meta: {
                title: '搜索',
            },
        },
        {
            path: '/member',
            name: 'member',
            component: Member,
            meta: {
                title: '个人中心',
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: '登录',
            },
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
            meta: {
                title: '账户',
            },
        },
        {
            path: '/account/center',
            name: 'account-center',
            component: AccountCenter,
            meta: {
                title: '账户中心',
            },
        },
        {
            path: '/account/log',
            name: 'account-log',
            component: AccountLog,
            meta: {
                title: '首页',
            },
        },
    ],
})
