<template>
    <div>
        <BackHeader title="个人中心">
            <a v-if="user" class="right" @click="tapLogout">
                <i class="fa fa-sign-out-alt"></i>
            </a>
        </BackHeader>
        <div class="has-header has-footer">
            <div class="user-header">
                <div class="avatar">
                    <img :src="user ? user.avatar : '/assets/images/avatar/1.png' | assets">
                </div>
                <div class="name">
                    欢迎您，
                    <a v-if="user" @click="tapProfile">{{ user.name }}</a>
                    <a v-else @click="tapLogin">请登陆</a>
                    ~
                </div>
            </div>
            <div class="menu-grid">
                <a @click="$router.push('/order')" class="item">
                    <i class="fa fa-users" aria-hidden="true"></i>
                    订单
                </a>
                <a @click="$router.push('/collect')" class="item">
                    <i class="fa fa-bookmark" aria-hidden="true"></i>
                    关注
                </a>
                <a @click="$router.push('/message')" class="item">
                    <i class="fa fa-comments" aria-hidden="true"></i>
                    消息
                </a>
                <a @click="$router.push('/account/center')" class="item">
                    <i class="fa fa-shield-alt" aria-hidden="true"></i>
                    安全
                </a>
                <a @click="tapProfile" class="item">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    设置
                </a>
            </div>
            <div class="menu-large">
                <MenuLargeItem title="待付款" icon="fa-money-bill" :uri="'/order?status=' + ORDER_STATUS.UN_PAY" :count="order_subtotal.un_pay"/>
                <MenuLargeItem title="待收货" icon="fa-truck" :uri="'/order?status=' + ORDER_STATUS.SHIPPED" :count="order_subtotal.shipped"/>
                <MenuLargeItem title="待评价" icon="fa-comment" uri="/comment" :count="order_subtotal.uncomment"/>
                <MenuLargeItem title="退换货" icon="fa-exchange-alt" uri="/refund" :count="order_subtotal.refunding"/>
            </div>

            <div class="menu-panel">
                <a @click="$router.push('/account')" class="panel-header">
                    <i class="fa fa-briefcase" aria-hidden="true"></i>
                    我的钱包
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <div class="panel-body">
                    <a @click="$router.push('/account')" class="item">
                        <span class="menu-item-icon">0
                        </span>
                        余额
                    </a><a href="" class="item">
                        <span class="menu-item-icon">0
                        </span>
                        积分
                    </a><a href="" class="item">
                        <span class="menu-item-icon">0
                        </span>
                        红包
                    </a><a @click="$router.push('/coupon/my')" class="item">
                        <span class="menu-item-icon">0
                        </span>
                        优惠券
                    </a>
                </div>
            </div>

            <div class="menu-list">
                <MenuItem title="我的收货地址" icon="fa-map-marker" uri="/address"/>
                <MenuItem title="浏览历史" icon="fa-history" uri="/history"/>
                <MenuItem title="我的推荐" icon="fa-share" uri="/affiliate"/>
                <MenuItem title="帮助" icon="fa-gift" uri="/article"/>
            </div>
            
        </div>
        <TabBar/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import TabBar from '@/components/TabBar.vue';
import BackHeader from '@/components/BackHeader.vue';
import { IUser, ORDER_STATUS, IOrderCount } from '@/api/model';
import { dispatchUser, dispatchLogout } from '@/store/dispatches';
import MenuItem from './Child/MenuItem.vue';
import MenuLargeItem from './Child/MenuLargeItem.vue';
import { getOrderSubtotal } from '@/api/order';

@Component({
    components: {
        BackHeader,
        TabBar,
        MenuItem,
        MenuLargeItem
    },
})
export default class Index extends Vue {

    user: IUser | null = null;
    ORDER_STATUS = ORDER_STATUS;
    order_subtotal: IOrderCount = {};

    created() {
        dispatchUser().then(res => {
            this.user = res;
        });
        getOrderSubtotal().then(res => {
            this.order_subtotal = res;
        });
    }

    tapLogin() {
        this.$router.push('/login');
    }

    tapProfile() {
        this.$router.push('/member/profile');
    }

    tapLogout() {
        dispatchLogout().then(() => {
            this.user = null;
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
