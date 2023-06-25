<template>
    <div>
        <BackHeader title="支付订单"/>
        <div class="has-header checkout-box" v-if="order">
            <div class="money-header">
                <em>￥</em>
                {{ order.order_amount }}
            </div>
            <div class="checkout-amount">
                <p class="line-item"><span>商品总价</span> <span>{{ order.goods_amount }}</span> </p>
                <p class="line-item"><span>运费</span> <span>{{ order.shipping_fee }}</span> </p>
                <p class="line-item"><span>订单总价</span> <span>{{ order.order_amount }}</span> </p>
            </div>
            <div class="payment-item" v-if="payment" :class="{active: payment.id == order.payment_id}" @click="tapSelected(payment)">
                <div class="icon">
                    <img :src="payment.icon" alt="">
                </div>
                <div class="name">{{ payment.name }}</div>
                <div class="status">
                    <i class="fa"></i>
                </div>
            </div>
            <div v-if="paymentList && paymentList.length > 0">
                <div class="payment-hr">选择其他支付方式</div>
                <div class="payment-list">
                    <div class="payment-item" v-for="(item, index) in paymentList" :key="index"  :class="{active: item.id == order.payment_id}"  @click="tapSelected(item)">
                        <div class="icon">
                            <i class="fab fa-weixin"></i>
                        </div>
                        <div class="name">{{ item.name }}</div>
                        <div class="status">
                            <i class="fa"></i>
                        </div>
                    </div>
                </div>
            </div>
            

            <div class="fixed-footer">
                <button class="btn" @click="tapPay">立即支付</button> 
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import type { IOrder, IPayment, IPrePay } from '@/api/model';
import { ORDER_STATUS } from '@/api/model';
import Toast from '@/components/toast';
import { getPaymentList } from '@/api/cart';
import { payOrder } from '@/api/order';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShopStore } from '../../stores/shop';

const route = useRoute();
const router = useRouter();
const shopStore = useShopStore();
const order = ref<IOrder|null>(null);
const payment = ref<IPayment|null>(null);
const paymentList = ref<IPayment[]>([]);

function tapSelected(item: IPayment|null) {
    if (!order.value || !item) {
        return;
    }
    order.value.payment_id = item.id;
}

function refreshPayment() {
    getPaymentList().then(res => {
        if (!res.data) {
            return;
        }
        paymentList.value = [];
        for (const item of res.data) {
            if (order.value && item.id === order.value.payment_id) {
                payment.value = item;
                continue;
            }
            paymentList.value.push(item);
        }
    });
}

function tapPay() {
    if (!payment.value || !order.value) {
        Toast('请选择支付方式');
        return;
    }
    payOrder(order.value.id, payment.value.id).then(res => {
        if (res.data) {
            doPay(res.data);
        }
    });
}

    function doPay(data: IPrePay) {
    if (!order.value) {
        return;
    }
    if (data.success) {
        router.replace('/order/' + order.value.id);
        return;
    }
    if (data.url) {
        window.location.href = data.url;
        return;
    }
    if (data.html) {
        const div = document.createElement('div');
        div.innerHTML = data.html;
        document.body.appendChild(div);
        return;
    }
    if (data.params) {
        // TODO
    }
}

const id = parseInt(route.params.id as string, 10);
if (!id) {
    Toast('订单错误');
    router.push('/');
} else {
    shopStore.getOrder(id).then(res => {
        if (res.status !== ORDER_STATUS.UN_PAY) {
            Toast('订单无法支付');
            router.push('/');
            return;
        }
        order.value = res;
        refreshPayment();
    });
}
    
</script>
<style lang="scss" scoped>

</style>
