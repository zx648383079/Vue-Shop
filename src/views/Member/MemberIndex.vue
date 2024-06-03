<template>
    <div>
        <BackHeader title="个人中心" :fixed="isFixed">
            <a v-if="user" class="right" @click="tapLogout">
                <i class="iconfont fa-sign-out-alt"></i>
            </a>
        </BackHeader>
        <div class="has-header has-footer">
            <div class="user-header">
                <div class="avatar">
                    <img :src="avatar">
                </div>
                <div class="name">
                    欢迎您，
                    <a v-if="user" @click="tapProfile">{{ user.name }}</a>
                    <a v-else @click="tapLogin">请登录</a>
                    ~
                </div>
            </div>
            <div class="menu-grid">
                <a @click="$router.push('/order')" class="item">
                    <i class="iconfont fa-users" aria-hidden="true"></i>
                    订单
                </a>
                <a @click="$router.push('/collect')" class="item">
                    <i class="iconfont fa-collect" aria-hidden="true"></i>
                    关注
                </a>
                <a @click="$router.push('/message')" class="item">
                    <i class="iconfont fa-message" aria-hidden="true"></i>
                    消息
                </a>
                <a @click="$router.push('/account/center')" class="item">
                    <i class="iconfont fa-shield" aria-hidden="true"></i>
                    安全
                </a>
                <a @click="tapProfile" class="item">
                    <i class="iconfont fa-set" aria-hidden="true"></i>
                    设置
                </a>
            </div>
            <div class="menu-large">
                <MenuLargeItem title="待付款" icon="fa-money" :uri="'/order?status=' + ORDER_STATUS.UN_PAY" :count="orderSubtotal.un_pay"/>
                <MenuLargeItem title="待收货" icon="fa-shipping-fast" :uri="'/order?status=' + ORDER_STATUS.SHIPPED" :count="orderSubtotal.shipped"/>
                <MenuLargeItem title="待评价" icon="fa-comment" uri="/comment" :count="orderSubtotal.uncomment"/>
                <MenuLargeItem title="退换货" icon="fa-exchange" uri="/refund" :count="orderSubtotal.refunding"/>
            </div>

            <div class="menu-panel">
                <a @click="$router.push('/account')" class="panel-header">
                    <i class="iconfont fa-wallet" aria-hidden="true"></i>
                    我的钱包
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <div class="panel-body">
                    <a @click="$router.push('/account')" class="item">
                        <span class="menu-item-icon">{{accountSubtotal.money || 0}}
                        </span>
                        余额
                    </a><a href="" class="item">
                        <span class="menu-item-icon">{{accountSubtotal.integral || 0}}
                        </span>
                        积分
                    </a><a href="" class="item">
                        <span class="menu-item-icon">{{accountSubtotal.bonus || 0}}
                        </span>
                        红包
                    </a><a @click="$router.push('/coupon/my')" class="item">
                        <span class="menu-item-icon">{{accountSubtotal.coupon || 0}}
                        </span>
                        优惠券
                    </a>
                </div>
            </div>

            <div class="menu-list">
                <MenuItem title="签到" icon="fa-calendar-check" uri="/checkin"/>
                <MenuItem title="我的收货地址" icon="fa-map" uri="/address"/>
                <MenuItem title="浏览历史" icon="fa-history" uri="/product/history"/>
                <MenuItem title="我的推荐" icon="fa-share" uri="/affiliate"/>
                <MenuItem title="帮助" icon="fa-gift" uri="/article"/>
                <MenuItem title="反馈" icon="fa-comment" uri="/feedback"/>
            </div>
            
        </div>
        <TabBar/>
    </div>
</template>
<script setup lang="ts">
import TabBar from '@/components/TabBar.vue';
import BackHeader from '@/components/BackHeader.vue';
import { ORDER_STATUS } from '@/api/model';
import type { IUser, IOrderCount, ISubtotal } from '@/api/model';
import MenuItem from './Child/MenuItem.vue';
import MenuLargeItem from './Child/MenuLargeItem.vue';
import { getOrderSubtotal } from '@/api/order';
import { getAccountSubtotal } from '../../api/user';
import { assetsFilter } from '../../pipes';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const user = ref<IUser| null>(null);
const orderSubtotal = ref<IOrderCount>({});
const accountSubtotal = ref<ISubtotal>({});
const isFixed = ref(false);

const avatar = computed(() => {
    return assetsFilter(user.value ? user.value.avatar : '/assets/images/avatar/1.png');
});

function getSubtotal() {
    if (!user.value) {
        return;
    }
    getOrderSubtotal().then(res => {
        orderSubtotal.value = res;
    });
    getAccountSubtotal().then(res => {
        accountSubtotal.value = res;
    });
}


function handleScroll() {
    const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    isFixed.value = top > 176;
}

function tapLogin() {
    router.push('/login');
}

function tapProfile() {
    router.push('/member/profile');
}

function tapLogout() {
    authStore.logoutUser().then(() => {
        user.value = null;
    });
}


onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);   //  离开页面清除（移除）滚轮滚动事件
});

authStore.getUser().then(res => {
    user.value = res;
    getSubtotal();
});

</script>
<style lang="scss" scoped>

</style>
