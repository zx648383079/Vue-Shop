<template>
    <div>
        <BackHeader title="我的购物车"></BackHeader>
        <div class="has-header">
            <div class="cart-box" v-if="items && items.length > 0">
                <div class="cart-group-item" v-for="(item, index) in items" :key="index">
                    <div class="group-header">
                        <i :class="['fa', 'check-box', item.checked ? 'active' : '']" @click="toggleCheckGroup(item)"></i>
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="swipe-box goods-list">
                        <SwipeRow name="cart-item goods-item" v-for="(cart, i) in item.goods_list" :key="i" :index="cart.id" ref="swiperow">
                            <i :class="['fa', 'check-box', cart.checked ? 'active' : '']" @click="toggleCheck(item, cart)"></i>
                            <div class="goods-img">
                                <img :src="cart.goods.thumb" alt="">
                            </div>
                            <div class="goods-info">
                                <h4>{{ cart.goods.name }}</h4>
                                <span>{{ cart.price | price }}</span>
                                <div class="number-box">
                                    <i class="fa fa-minus"></i>
                                    <input type="text" name="" v-model="cart.amount">
                                    <i class="fa fa-plus"></i>
                                </div>
                            </div>
                        </SwipeRow>
                    </div>
                </div>
            </div>
            <div class="cart-footer"  v-if="items && items.length > 0">
                <i :class="['fa', 'check-box', checkedAll ? 'active' : '']" @click="toggleCheckAll"></i>
                <span @click="toggleCheckAll">全选</span>

                <div class="cart-amount">
                    <span>{{ total() | price }}</span>
                    <a @click="tapCashier" class="btn">结算</a>
                </div>
            </div>

            <div class="empty-cart-box" v-if="!items || items.length < 1">
                <div v-if="isGuest">
                    <p>登录后可同步购物车中商品</p>
                    <a @click="$router.push('/login')" class="btn">登录</a>
                </div>
                <div v-else>
                    <p>购物车时空的</p>
                    <a @click="$router.push('/')" class="btn">去逛逛</a>
                </div>
            </div>

        </div>
        <TabBar/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ICart, ICartItem } from '@/api/model';
import { getCart } from '@/api/cart';
import { Getter, Action } from 'vuex-class';
import TabBar from '@/components/TabBar.vue';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { dispatchSetCart } from '@/store/dispatches';
import { Toast } from 'mint-ui';

@Component({
    components: {
        TabBar,
        BackHeader,
        SwipeRow,
    }
})
export default class Index extends Vue {
    items: ICart[] = [];
    checkedAll: boolean = false;
    @Getter('isGuest') isGuest?: boolean;

    created() {
        getCart().then(res => {
            if (!res.data) {
                return;
            }
            this.items = res.data;
        }); 
    }

    total(): number {
        let total = 0;
        if (!this.items || this.items.length < 1) {
            return total;
        }
        for (const item of this.items) {
            for (const cart of item.goods_list) {
                if (cart.checked) {
                    total += cart.amount * cart.price;
                }
            }
        }
        return total;
    }

    toggleCheckAll() {
        this.checkedAll = !this.checkedAll;
        for (const item of this.items) {
            item.checked = this.checkedAll;
            for (const cart of item.goods_list) {
                cart.checked = this.checkedAll;
            }
        }
    }

    toggleCheckGroup(item: ICart) {
        item.checked = !item.checked;
        for (const cart of item.goods_list) {
            cart.checked = item.checked;
        }
        if (!item.checked) {
            this.checkedAll = false;
        }
        this.$forceUpdate();
    }

    toggleCheck(item: ICart, cart: ICartItem) {
        cart.checked = !cart.checked;
        if (!cart.checked) {
            this.checkedAll = false;
            item.checked = false;
        }
        this.$forceUpdate();
    }

    tapCashier() {
        const data: ICart[] = [];
        for (const item of this.items) {
            const items: ICartItem[] = [];
            for (const cart of item.goods_list) {
                if (cart.checked) {
                    items.push(cart);
                }
            }
            if (items.length > 0) {
                item.goods_list = items;
                data.push(item);
            }
        }
        if (data.length < 1) {
            Toast('请选择结算的商品');
            return;
        }
        dispatchSetCart(data).then(() => {
            this.$router.push('/cashier');
        });
    }
}
</script>
<style lang="scss" scoped>

</style>