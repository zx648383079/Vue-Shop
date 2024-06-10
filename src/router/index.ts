import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import { useAuth, useTheme } from '../services';
import { globalSingleton } from '../globe';
import { handleChangeLocale } from '../i18n';

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/HomeIndex2.vue'),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/index2',
        name: 'home2',
        component: () => import('../views/Home/HomeIndex.vue'),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/article',
        name: 'article',
        component: () => import('../views/Article/ArticleIndex.vue'),
        meta: {
            title: '文章列表',
        },
    },
    {
        path: '/article/category',
        name: 'article-category',
        component: () => import('../views/Article/ArticleCategory.vue'),
        meta: {
            title: '文章分类列表',
        },
    },
    {
        path: '/article/:id',
        name: 'article-detail',
        component: () => import('../views/Article/ArticleDetail.vue'),
        meta: {
            title: '文章详情',
        },
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('../views/Category/CategoryIndex.vue'),
        meta: {
            title: '分类',
        },
    },
    {
        path: '/coupon',
        name: 'coupon',
        component: () => import('../views/Coupon/CouponIndex.vue'),
        meta: {
            title: '领券中心',
        },
    },
    {
        path: '/coupon/my',
        name: 'coupon-my',
        component: () => import('../views/Coupon/CouponMy.vue'),
        meta: {
            title: '我的优惠券',
            requireAuth: true,
        },
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart/CartIndex.vue'),
        meta: {
            title: '购物车',
        },
    },
    {
        path: '/cashier',
        name: 'cashier',
        component: () => import('../views/Cashier/CashierIndex.vue'),
        meta: {
            title: '结算',
            requireAuth: true,
        },
    },
    {
        path: '/pay/:id',
        name: 'pay',
        component: () => import('../views/Cashier/CashierPay.vue'),
        meta: {
            title: '支付',
            requireAuth: true,
        },
    },
    {
        path: '/product/history',
        name: 'product-history',
        component: () => import('../views/Goods/ProductHistory.vue'),
        meta: {
            title: '浏览记录',
        },
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/Goods/ProductIndex.vue'),
        meta: {
            title: '商品',
        },
    },
    {
        path: '/store/quick/:id',
        name: 'store-quick',
        component: () => import('../views/Store/StoreQuick.vue'),
        meta: {
            title: '店铺',
        },
    },
    {
        path: '/store/:id',
        name: 'store',
        component: () => import('../views/Store/StoreIndex.vue'),
        meta: {
            title: '店铺',
        },
    },
    {
        path: '/product/:id/comment',
        name: 'product-comment',
        component: () => import('../views/Goods/ProductComment.vue'),
        meta: {
            title: '商品评价',
        },
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/Search/SearchIndex.vue'),
        meta: {
            title: '搜索',
        },
    },
    {
        path: '/activity/seckill',
        name: 'activity-seckill',
        component: () => import('../views/Activity/ActivitySeckill.vue'),
        meta: {
            title: '秒杀',
        },
    },
    {
        path: '/member',
        name: 'member',
        component: () => import('../views/Member/MemberIndex.vue'),
        meta: {
            title: '个人中心',
        },
    },
    {
        path: '/member/profile',
        name: 'profile',
        component: () => import('../views/Member/MemberProfile.vue'),
        meta: {
            title: '我的资料',
            requireAuth: true,
        },
    },
    {
        path: '/member/edit/:name',
        name: 'edit-profile',
        component: () => import('../views/Member/MemberEdit.vue'),
        meta: {
            title: '编辑信息',
            requireAuth: true,
        },
    },
    {
        path: '/member/cancel',
        name: 'member-cancel',
        component: () => import('../views/Member/MemberCancel.vue'),
        meta: {
            title: '账户注销',
            requireAuth: true,
        },
    },
    {
        path: '/member/driver',
        name: 'member-driver',
        component: () => import('../views/Member/MemberDriver.vue'),
        meta: {
            title: '登录设备管理',
            requireAuth: true,
        },
    },
    {
        path: '/member/password',
        name: 'member-password',
        component: () => import('../views/Member/MemberPassword.vue'),
        meta: {
            title: '修改密码',
            requireAuth: true,
        },
    },
    {
        path: '/member/certification',
        name: 'member-certification',
        component: () => import('../views/Member/MemberCertification.vue'),
        meta: {
            title: '实名认证',
            requireAuth: true,
        },
    },
    {
        path: '/checkin',
        name: 'check-in',
        component: () => import('../views/CheckIn/CheckInIndex.vue'),
        meta: {
            title: '每日签到',
            requireAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Member/MemberLogin.vue'),
        meta: {
            title: '登录',
            transition: 'fade',
        },
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('../views/Account/AccountIndex.vue'),
        meta: {
            title: '我的余额',
            requireAuth: true,
        },
    },
    {
        path: '/account/center',
        name: 'account-center',
        component: () => import('../views/Account/AccountCenter.vue'),
        meta: {
            title: '账户中心',
            requireAuth: true,
        },
    },
    {
        path: '/account/log',
        name: 'account-log',
        component: () => import('../views/Account/AccountLog.vue'),
        meta: {
            title: '记录',
            requireAuth: true,
        },
    },
    {
        path: '/account/card',
        name: 'account-card',
        component: () => import('../views/Account/AccountCard.vue'),
        meta: {
            title: '我的银行卡',
            requireAuth: true,
        },
    },
    {
        path: '/account/card/create',
        name: 'account-card-create',
        component: () => import('../views/Account/AccountCardNew.vue'),
        meta: {
            title: '添加银行卡',
            requireAuth: true,
        },
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import('../views/Invoice/InvoiceIndex.vue'),
        meta: {
            title: '发票管理',
            requireAuth: true,
        },
    },
    {
        path: '/invoice/apply',
        name: 'invoice-apply',
        component: () => import('../views/Invoice/InvoiceApply.vue'),
        meta: {
            title: '申请开票',
            requireAuth: true,
        },
    },
    {
        path: '/invoice/title',
        name: 'invoice-title',
        component: () => import('../views/Invoice/InvoiceTitle.vue'),
        meta: {
            title: '发票抬头',
            requireAuth: true,
        },
    },
    {
        path: '/invoice/edit',
        name: 'invoice-edit',
        component: () => import('../views/Invoice/InvoiceEdit.vue'),
        meta: {
            title: '编辑抬头',
            requireAuth: true,
        },
    },
    {
        path: '/invoice/log',
        name: 'invoice-log',
        component: () => import('../views/Invoice/InvoiceLog.vue'),
        meta: {
            title: '开票历史',
            requireAuth: true,
        },
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/Message/MessageIndex.vue'),
        meta: {
            title: '我的消息',
            requireAuth: true,
        },
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: () => import('../views/Feedback/FeedbackIndex.vue'),
        meta: {
            title: '留言反馈',
        },
    },
    {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/Collect/CollectIndex.vue'),
        meta: {
            title: '我的收藏',
            requireAuth: true,
        },
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order/OrderIndex.vue'),
        meta: {
            title: '我的订单',
            requireAuth: true,
        },
    },
    {
        path: '/order/logistics/:id',
        name: 'order-logistics',
        component: () => import('../views/Order/OrderLogistics.vue'),
        meta: {
            title: '物流信息',
            requireAuth: true,
        },
    },
    {
        path: '/order/:id',
        name: 'order-detail',
        component: () => import('../views/Order/OrderDetail.vue'),
        meta: {
            title: '订单详情',
            requireAuth: true,
        },
    },
    {
        path: '/address',
        name: 'address',
        component: () => import('../views/Address/AddressIndex.vue'),
        meta: {
            title: '我的地址',
            requireAuth: true,
        },
    },
    {
        path: '/address/create',
        name: 'address-create',
        component: () => import('../views/Address/AddressEdit.vue'),
        meta: {
            title: '新增地址',
            requireAuth: true,
        },
    },
    {
        path: '/address/:id',
        name: 'address-edit',
        component: () => import('../views/Address/AddressEdit.vue'),
        meta: {
            title: '编辑地址',
            requireAuth: true,
        },
    },
    {
        path: '/comment',
        name: 'comment',
        component: () => import('../views/Comment/CommentIndex.vue'),
        meta: {
            title: '评价管理',
            requireAuth: true,
        },
    },
    {
        path: '/comment/create',
        name: 'comment-create',
        component: () => import('../views/Comment/CommentCreate.vue'),
        meta: {
            title: '评价晒单',
            requireAuth: true,
        },
    },
    {
        path: '/refund',
        name: 'refund',
        component: () => import('../views/Refund/RefundIndex.vue'),
        meta: {
            title: '售后管理',
            requireAuth: true,
        },
    },
    {
        path: '/refund/create',
        name: 'refund-create',
        component: () => import('../views/Refund/RefundCreate.vue'),
        meta: {
            title: '申请售后',
            requireAuth: true,
        },
    },
    {
        path: '/affiliate',
        name: 'affiliate',
        component: () => import('../views/Affiliate/AffiliateIndex.vue'),
        meta: {
            title: '我的推荐',
            requireAuth: true,
        },
    },
    {
        path: '/affiliate/order',
        name: 'affiliate-order',
        component: () => import('../views/Affiliate/AffiliateOrder.vue'),
        meta: {
            title: '推荐的订单',
            requireAuth: true,
        },
    },
    {
        path: '/affiliate/rule',
        name: 'affiliate-rule',
        component: () => import('../views/Affiliate/AffiliateRule.vue'),
        meta: {
            title: '推荐规则',
            requireAuth: true,
        },
    },
    {
        path: '/affiliate/share',
        name: 'affiliate-share',
        component: () => import('../views/Affiliate/AffiliateShare.vue'),
        meta: {
            title: '我的分享',
            requireAuth: true,
        },
    },
    {
        path: '/affiliate/user',
        name: 'affiliate-user',
        component: () => import('../views/Affiliate/AffiliateUser.vue'),
        meta: {
            title: '推荐的会员',
            requireAuth: true,
        },
    },
    {
        path: '/garbage',
        name: 'garbage',
        component: () => import('../views/Garbage/GarbageIndex.vue'),
        meta: {
            title: '垃圾分类查询',
        },
    },
    {
        path: '/garbage/result',
        name: 'garbage-result',
        component: () => import('../views/Garbage/GarbageResult.vue'),
        meta: {
            title: '垃圾分类查询结果',
        },
    },
    {
        path: '/browser',
        name: 'browser',
        component: () => import('../views/Browser/BrowserIndex.vue'),
        meta: {
            title: '浏览器',
        },
    },
    ];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(this: Router, to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        const position: any = {};
        if (to.hash) {
            position.selector = to.hash;
            if (document.querySelector(to.hash)) {
                return position;
            }
            return;
        }
        return new Promise(resolve => {
            if (to.matched.some(m => m.meta.scrollToTop)) {
                position.x = 0
                position.y = 0
            }
            globalSingleton.once('scroll', () => {
                resolve(position);
            });
        });
    },
});

router.beforeEach(async(to, from, next) => {
    const auth = useAuth();
    if (to.meta.requireAuth && auth.isGuest) {
        return next({
            path: '/login',
            query: {
                redirect_uri: to.fullPath,
            }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    }
    await handleChangeLocale(to.params.locale as string);
    return next();
});
router.afterEach((to, from) => {
    if (to.meta.title) {
        useTheme().setTitle(to.meta.title as string);
    }
});

export default router
