import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Index.vue';
import Account from '@/pages/Account/Index.vue';

import AccountCenter from '@/pages/Account/Center.vue';
import AccountLog from '@/pages/Account/Log.vue';
import Category from '@/pages/Category/Index.vue';

import Cart from '@/pages/Cart/Index.vue';
import Cashier from '@/pages/Cashier/Index.vue';
import Member from '@/pages/Member/Index.vue';
import Profile from '@/pages/Member/Profile.vue';
import Login from '@/pages/Member/Login.vue';
import Search from '@/pages/Search/Index.vue';
import Product from '@/pages/Goods/Index.vue';
import ProductComment from '@/pages/Goods/Comment.vue';

import Invoice from '@/pages/Invoice/Index.vue';
import InvoiceApply from '@/pages/Invoice/Apply.vue';
import InvoiceEdit from '@/pages/Invoice/Edit.vue';
import InvoiceLog from '@/pages/Invoice/Log.vue';
import InvoiceTitle from '@/pages/Invoice/Title.vue';

import Message from '@/pages/Message/Index.vue';
import Collect from '@/pages/Collect/Index.vue';

import Order from '@/pages/Order/Index.vue';
import OrderDetail from '@/pages/Order/Detail.vue';
import OrderLogistics from '@/pages/Order/Logistics.vue';

import Address from '@/pages/Address/Index.vue';
import AddressEdit from '@/pages/Address/Edit.vue';


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
            path: '/cashier',
            name: 'cashier',
            component: Cashier,
            meta: {
                title: '结算',
                requireAuth: true,
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
            path: '/product/:id/comment',
            name: 'product-comment',
            component: ProductComment,
            meta: {
                title: '商品评价',
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
            path: '/member/profile',
            name: 'profile',
            component: Profile,
            meta: {
                title: '我的资料',
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
                title: '我的余额',
                requireAuth: true,
            },
        },
        {
            path: '/account/center',
            name: 'account-center',
            component: AccountCenter,
            meta: {
                title: '账户中心',
                requireAuth: true,
            },
        },
        {
            path: '/account/log',
            name: 'account-log',
            component: AccountLog,
            meta: {
                title: '记录',
                requireAuth: true,
            },
        },
        {
            path: '/invoice',
            name: 'invoice',
            component: Invoice,
            meta: {
                title: '发票管理',
                requireAuth: true,
            },
        },
        {
            path: '/invoice/apply',
            name: 'invoice-apply',
            component: InvoiceApply,
            meta: {
                title: '申请开票',
                requireAuth: true,
            },
        },
        {
            path: '/invoice/title',
            name: 'invoice-title',
            component: InvoiceTitle,
            meta: {
                title: '发票抬头',
                requireAuth: true,
            },
        },
        {
            path: '/invoice/edit',
            name: 'invoice-edit',
            component: InvoiceEdit,
            meta: {
                title: '编辑抬头',
                requireAuth: true,
            },
        },
        {
            path: '/invoice/log',
            name: 'invoice-log',
            component: InvoiceLog,
            meta: {
                title: '开票历史',
                requireAuth: true,
            },
        },
        {
            path: '/message',
            name: 'message',
            component: Message,
            meta: {
                title: '我的消息',
                requireAuth: true,
            },
        },
        {
            path: '/collect',
            name: 'collect',
            component: Collect,
            meta: {
                title: '我的收藏',
                requireAuth: true,
            },
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: {
                title: '我的订单',
                requireAuth: true,
            },
        },
        {
            path: '/order/logistics/:id',
            name: 'order-logistics',
            component: OrderLogistics,
            meta: {
                title: '物流信息',
                requireAuth: true,
            },
        },
        {
            path: '/order/:id',
            name: 'order-detail',
            component: OrderDetail,
            meta: {
                title: '订单详情',
                requireAuth: true,
            },
        },
        {
            path: '/address',
            name: 'address',
            component: Address,
            meta: {
                title: '我的地址',
                requireAuth: true,
            },
        },
        {
            path: '/address/create',
            name: 'address-create',
            component: AddressEdit,
            meta: {
                title: '新增地址',
                requireAuth: true,
            },
        },
        {
            path: '/address/:id',
            name: 'address-edit',
            component: AddressEdit,
            meta: {
                title: '编辑地址',
                requireAuth: true,
            },
        },
    ],
})
