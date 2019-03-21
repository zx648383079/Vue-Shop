import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Index.vue';

import Article from '@/pages/Article/Index.vue';
import ArticleCategory from '@/pages/Article/Category.vue';
import ArticleDetail from '@/pages/Article/Detail.vue';

import Account from '@/pages/Account/Index.vue';
import AccountCenter from '@/pages/Account/Center.vue';
import AccountLog from '@/pages/Account/Log.vue';
import AccountCard from '@/pages/Account/Card.vue';
import AccountCardNew from '@/pages/Account/CardNew.vue'

import Category from '@/pages/Category/Index.vue';

import Cart from '@/pages/Cart/Index.vue';
import Cashier from '@/pages/Cashier/Index.vue';
import Pay from '@/pages/Cashier/Pay.vue';
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

import Coupon from '@/pages/Coupon/Index.vue';
import CouponMy from '@/pages/Coupon/My.vue';

import Comment from '@/pages/Comment/Index.vue';
import CommentCreate from '@/pages/Comment/Create.vue';
import CheckIn from '@/pages/CheckIn/Index.vue';

import Affiliate from '@/pages/Affiliate/Index.vue';
import AffiliateOrder from '@/pages/Affiliate/Order.vue';
import AffiliateRule from '@/pages/Affiliate/Rule.vue';
import AffiliateShare from '@/pages/Affiliate/Share.vue';
import AffiliateUser from '@/pages/Affiliate/User.vue';


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
            path: '/article',
            name: 'article',
            component: Article,
            meta: {
                title: '文章列表',
            },
        },
        {
            path: '/article/category',
            name: 'article-category',
            component: ArticleCategory,
            meta: {
                title: '文章分类列表',
            },
        },
        {
            path: '/article/:id',
            name: 'article-detail',
            component: ArticleDetail,
            meta: {
                title: '文章详情',
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
            path: '/coupon',
            name: 'coupon',
            component: Coupon,
            meta: {
                title: '领券中心',
            },
        },
        {
            path: '/coupon/my',
            name: 'coupon-my',
            component: CouponMy,
            meta: {
                title: '我的优惠券',
                requireAuth: true,
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
            path: '/pay/:id',
            name: 'pay',
            component: Pay,
            meta: {
                title: '支付',
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
                requireAuth: true,
            },
        },
        {
            path: '/checkin',
            name: 'check-in',
            component: CheckIn,
            meta: {
                title: '每日签到',
                requireAuth: true,
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
            path: '/account/card',
            name: 'account-card',
            component: AccountCard,
            meta: {
                title: '我的银行卡',
                requireAuth: true,
            },
        },
        {
            path: '/account/card/create',
            name: 'account-card-create',
            component: AccountCardNew,
            meta: {
                title: '添加银行卡',
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
        {
            path: '/comment',
            name: 'comment',
            component: Comment,
            meta: {
                title: '评价管理',
                requireAuth: true,
            },
        },
        {
            path: '/comment/create',
            name: 'comment-create',
            component: CommentCreate,
            meta: {
                title: '评价晒单',
                requireAuth: true,
            },
        },
        {
            path: '/affiliate',
            name: 'affiliate',
            component: Affiliate,
            meta: {
                title: '我的推荐',
                requireAuth: true,
            },
        },
        {
            path: '/affiliate/order',
            name: 'affiliate-order',
            component: AffiliateOrder,
            meta: {
                title: '推荐的订单',
                requireAuth: true,
            },
        },
        {
            path: '/affiliate/rule',
            name: 'affiliate-rule',
            component: AffiliateRule,
            meta: {
                title: '推荐规则',
                requireAuth: true,
            },
        },
        {
            path: '/affiliate/share',
            name: 'affiliate-share',
            component: AffiliateShare,
            meta: {
                title: '我的分享',
                requireAuth: true,
            },
        },
        {
            path: '/affiliate/user',
            name: 'affiliate-user',
            component: AffiliateUser,
            meta: {
                title: '推荐的会员',
                requireAuth: true,
            },
        },
    ],
})
