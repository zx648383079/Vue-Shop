<template>
    <div>
        <BackHeader title="我的购物车"></BackHeader>
        <div class="has-header">
            <PullToRefresh :loading="queries.isLoading" @refresh="tapRefresh" :more="false">
                <div class="cart-box" v-if="items && items.length > 0">
                    <div class="cart-group-item" v-for="(item, index) in items" :key="index">
                        <div class="group-header">
                            <i :class="['iconfont', 'check-box', item.checked ? 'active' : '']" @click="toggleCheckGroup(item)"></i>
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="swipe-box goods-list">
                            <SwipeRow name="cart-item goods-item" v-for="(cart, i) in item.goods_list" :key="i" :index="(cart.id as any)" ref="swiperow">
                                <i :class="['iconfont', 'check-box', cart.checked ? 'active' : '']" @click="toggleCheck(item, cart)"></i>
                                <div class="goods-img">
                                    <img :src="cart.goods?.thumb" alt="">
                                </div>
                                <div class="goods-info">
                                    <h4>{{ cart.goods?.name }}</h4>
                                    <span>{{ $n(cart.price!, 'currency') }}</span>
                                    <NumberInput v-model="cart.amount"/>
                                </div>
                            </SwipeRow>
                        </div>
                    </div>
                </div>
                <div class="cart-footer"  v-if="items && items.length > 0">
                    <i :class="['iconfont', 'check-box', queries.checkedAll ? 'active' : '']" @click="toggleCheckAll"></i>
                    <span @click="toggleCheckAll">全选</span>

                    <div class="cart-amount">
                        <span>{{ $n(total(), 'currency') }}</span>
                        <a @click="tapCashier" class="btn btn-danger">结算</a>
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
            </PullToRefresh>
        </div>
        <TabBar/>
    </div>
</template>
<script setup lang="ts">
import type { ICartGroup, ICartItem } from '@/api/model';
import { getCart } from '@/api/cart';
import TabBar from '@/components/TabBar.vue';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import NumberInput from './Child/NumberInput.vue';
import { useAuthStore } from '../../stores/auth';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShopStore } from '../../stores/shop';
import { useDialog } from '../../components/Dialog/plugin';

const authStore = useAuthStore();
const shopStore = useShopStore();
const router = useRouter();
const toast = useDialog();
const items = ref<ICartGroup[]>([]);
const queries = reactive({
    checkedAll: false,
    isLoading: false,
});
const isGuest = computed(() => authStore.isGuest);

function tapRefresh() {
    if (queries.isLoading) {
        return;
    }
    queries.isLoading = true;
    getCart().then(res => {
        queries.isLoading = false;
        if (!res.data) {
            return;
        }
        items.value = res.data;
    });
}

function total(): number {
    let total = 0;
    if (!items.value || items.value.length < 1) {
        return total;
    }
    for (const item of items.value) {
        for (const cart of item.goods_list) {
            if (cart.checked && cart.price) {
                total += cart.amount * cart.price;
            }
        }
    }
    return total;
}

function toggleCheckAll() {
    queries.checkedAll = !queries.checkedAll;
    for (const item of items.value) {
        item.checked = queries.checkedAll;
        for (const cart of item.goods_list) {
            cart.checked = queries.checkedAll;
        }
    }
}

function toggleCheckGroup(item: ICartGroup) {
    item.checked = !item.checked;
    for (const cart of item.goods_list) {
        cart.checked = item.checked;
    }
    if (!item.checked) {
        queries.checkedAll = false;
    }
}

function toggleCheck(item: ICartGroup, cart: ICartItem) {
    cart.checked = !cart.checked;
    if (!cart.checked) {
        queries.checkedAll = false;
        item.checked = false;
    }
}

function tapCashier() {
    const data: ICartGroup[] = [];
    for (const item of items.value) {
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
        toast.warning('请选择结算的商品');
        return;
    }
    shopStore.setCart(data).then(() => {
        router.push('/cashier');
    });
}

tapRefresh();
</script>
<style lang="scss" scoped>

</style>
