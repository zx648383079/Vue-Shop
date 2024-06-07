<template>
    <div>
        <BackHeader title="结算"/>
        <div class="has-header has-footer checkout-box">
            <AddressLine :address="(address as any)" @tapped="tapAddress"/>

            <PaymentLine v-model="payment" :items="paymentList"/>
            
            <div class="goods-list" v-for="(item, index) in cart" :key="index">
                <div class="group-header">
                    <span>{{ item.name }}</span>
                </div>
                <div class="goods-item" v-for="(goods, i) in item.goods_list" :key="i">
                    <div class="goods-img">
                        <img :src="goods.goods?.thumb" alt="">
                    </div>
                    <div class="goods-info">
                        <h4>{{ goods.goods?.name }}</h4>
                        <span class="price">{{ $n(goods.price!, 'currency') }}</span>
                        <span class="amount"> x {{ goods.amount }}</span>
                    </div>
                </div>
                <ShippingLine v-model="shipping" :items="shippingList"/>
                
            </div>

            <InvoiceLine v-model="invoice"/>
            <CouponLine v-model="coupon" :items="couponList"/>
            

            <div class="checkout-amount" v-if="order">
                <p class="line-item"><span>商品总价</span> <span data-key="goods_amount">{{ $n(order.goods_amount, 'currency') }}</span> </p>
                <p class="line-item"><span>+运费</span> <span data-key="shipping_fee">{{ $n(order.shipping_fee, 'currency') }}</span> </p>
                <p class="line-item"><span>+支付手续费</span> <span data-key="pay_fee">{{ $n(order.pay_fee, 'currency') }}</span> </p>
                <p class="line-item"><span>-优惠</span> <span data-key="discount">{{ $n(order.discount, 'currency') }}</span> </p>
                <p class="line-item"><span>订单总价</span> <span data-key="order_amount">{{ $n(order.order_amount, 'currency') }}</span> </p>
            </div>

            <div class="address-tip" v-if="address">
                {{ address.region?.full_name }} {{ address.address }}
            </div>
            <div class="checkout-footer" v-if="order">
                <span data-key="order_amount">{{ $n(order.order_amount, 'currency') }}</span>
                <a @click="tapCheckout" class="btn btn-danger">立即支付</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import type { IAddress, IOrder, IPayment, IShipping, ICartItem, ICoupon, IInvoiceTitle } from '@/api/model';
import AddressLine from './Child/AddressLine.vue';
import PaymentLine from './Child/PaymentLine.vue';
import ShippingLine from './Child/ShippingLine.vue';
import InvoiceLine from './Child/InvoiceLine.vue';
import CouponLine from './Child/CouponLine.vue';
import { previewOrder, getShippingList, checkoutOrder } from '@/api/cart';
import { useShopStore } from '../../stores/shop';
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';

interface ICartBox {
    type: number,
    goods: ICartItem[] | number[];
}

const shopStore = useShopStore();
const router = useRouter();
const address = ref<IAddress | null>(null);
const order = ref<IOrder | null>(null);
const payment = ref<IPayment|null>(null);
const paymentList = ref<IPayment[]>([]);
const shipping = ref<IShipping|null>(null);
const shippingList = ref<IShipping[]>([]);
const coupon = ref<ICoupon|null>(null);
const couponList = ref<ICoupon[]>([]);
const invoice = ref<IInvoiceTitle|null>(null);
const cartBox = ref<ICartBox | null>(null);

const addressList = computed(() => shopStore.addressList);
const cart = computed(() => shopStore.cart);

function refreshPrice() {
    if (!address.value || !cartBox.value) {
        return;
    }
    previewOrder(
        cartBox.value.goods, address.value.id,
        shipping.value ? shipping.value.id : 0, payment.value ? payment.value.id : 0, cartBox.value.type).then(res => {
        order.value = res;
    });
}

function tapCheckout() {
    if (!address.value || !cartBox.value || !shipping.value || !payment.value) {
        return;
    }
    checkoutOrder(
        cartBox.value.goods, address.value.id,
        shipping.value.id, payment.value.id, cartBox.value.type).then(res => {
        shopStore.setCart([]);
        shopStore.order = res;
        router.replace('/pay/' + res.id);
    });
}

function tapAddress() {
    if (!addressList.value || addressList.value.length < 1) {
        router.push({path: '/address/create', query: {back: '1'}});
        return;
    }
    router.push({name: 'address', query: {selected: (address.value ? address.value.id + '' : '0')}});
}



function getGoodsIds(): ICartBox {
    if (!cart.value) {
        return {type: 0, goods: []};
    }
    const goods: ICartItem[] = [];
    const items: number[]  = [];
    let type = -1;
    for (const group of cart.value) {
        for (const item of group.goods_list) {
            if (type === -1) {
                type = item.id && item.id > 0 ? 0 : 1;
            }
            if (type > 0) {
                goods.push({
                    goods_id: item.goods_id,
                    amount: item.amount,
                });
                continue;
            }
            items.push(item.id as number);
        }
    }
    return type > 0 ? {type, goods} : {type, goods: items};
}


watch(address, () => {
    refreshPrice();
    if (!address.value || !cartBox.value) {
        return;
    }
    getShippingList(cartBox.value.goods, address.value.id, cartBox.value.type).then(res => {
        if (res.data) {
            shippingList.value = res.data;
        }
    })
});
watch(payment, () => {
    refreshPrice();
});
watch(shipping, () => {
    refreshPrice();
});
</script>
<style lang="scss" scoped>
.address-tip {
    background-color: bisque;
    color: red;
    line-height: 30px;
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    z-index: 97;
}
.has-footer {
    margin-bottom: 5.625rem;
}
</style>
