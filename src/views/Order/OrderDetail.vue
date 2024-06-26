<template>
    <div>
        <BackHeader title="订单详情"/>
        <div class="has-header order-box" v-if="order">
            <div class="status-header">
                <i class="iconfont icon-money-bill"></i>
                {{ order.status_label }}
            </div>
            <div class="shipping-box">
                {{ order.shipping_status }}
            </div>
            <div class="address-box" v-if="order.address">
                <i class="iconfont icon-map"></i>
                <p>
                    <span class="name">{{ order.address.name }}</span>
                    <span class="tel">{{ order.address.tel }}</span>
                </p>
                <p>{{ order.address.region_name }} {{ order.address.address }}</p>
            </div>

            <div class="goods-list" v-if="order.goods">
                    <div class="goods-item" v-for="(goods, index) in order.goods" :key="index">
                        <div class="goods-img">
                            <img :src="goods.thumb" alt="">
                        </div>
                        <div class="goods-info">
                            <h4>{{ goods.name }}</h4>
                            <span class="item-price">{{ $n(goods.price, 'currency') }}</span>
                            <span class="amount"> x {{ goods.amount }}</span>
                        </div>
                    </div>
                </div>
                <div class="order-amount">
                    <p class="text-right">共 {{ order.goods?.length }} 件 合计：{{ $n(order.goods_amount, 'currency') }}</p>
                    <p class="line-item"><span>订单号</span> <span>{{ order.series_number }}</span> </p>
                    <p class="line-item"><span>下单时间</span> <span>{{ order.created_at }}</span> </p>
                    <p class="line-item" v-if="order.pay_at"><span>支付时间</span> <span>{{ order.pay_at }}</span> </p>
                    <p class="line-item" v-if="order.shipping_at"><span>发货时间</span> <span>{{ order.shipping_at }}</span> </p>
                    <p class="line-item" v-if="order.receive_at"><span>签收时间</span> <span>{{ order.receive_at }}</span> </p>
                    <p class="line-item" v-if="order.finish_at"><span>完成时间</span> <span>{{ order.finish_at }}</span> </p>
                    <hr>
                    <p class="line-item"><span>商品总价</span> <span>{{ $n(order.goods_amount, 'currency') }}</span> </p>
                    <p class="line-item"><span>+运费</span> <span>{{ $n(order.shipping_fee, 'currency') }}</span> </p>
                    <p class="line-item"><span>+支付手续费</span> <span>{{ $n(order.pay_fee, 'currency') }}</span> </p>
                    <p class="line-item"><span>-优惠</span> <span>{{ $n(order.discount, 'currency') }}</span> </p>
                    <p class="line-item"><span>订单总价</span> <span>{{ $n(order.order_amount, 'currency') }}</span> </p>
                </div>
                <div class="order-footer">
                    <div class="order-actions">
                       <a @click="tapPay" v-if="order.status == ORDER_STATUS.UN_PAY">支付</a>
                        <a @click="tapReceive" v-if="order.status == ORDER_STATUS.SHIPPED">确认收货</a>
                        <a @click="tapComment" v-if="order.status == ORDER_STATUS.RECEIVED">评价</a>
                        <a @click="tapRefund" v-if="order.status == ORDER_STATUS.SHIPPED || order.status == ORDER_STATUS.PAID_UN_SHIP">申请退款</a>
                        <a @click="tapRefund" v-if="order.status == ORDER_STATUS.RECEIVED">退换货</a>
                        <a @click="tapRefund" v-if="order.status == ORDER_STATUS.FINISH">售后</a>
                        <a @click="tapCancel" v-if="order.status == ORDER_STATUS.UN_PAY || order.status == ORDER_STATUS.PAID_UN_SHIP">取消</a>
                    </div>
                </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { type IOrder, ORDER_STATUS } from '@/api/model';
import { receiveOrder, cancelOrder } from '@/api/order';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShopStore } from '../../stores/shop';
import { useDialog } from '../../components/Dialog/plugin';

const router = useRouter();
const route = useRoute();
const toast = useDialog();
const shopStore = useShopStore();
const order = ref<IOrder | null>(null);

function tapPay() {
    if (!order.value) {
        return;
    }
    router.push({name: 'pay', params: {id: order.value.id + ''}});
}

function tapRefund() {
    if (!order.value) {
        return;
    }
    router.push({name: 'refund-create', params: {order: order.value.id + ''}});
}

function tapComment() {
    router.push({name: 'comment'});
}

function tapReceive() {
    toast.confirm('确认取消此订单？').then(action => {
        if (action !== 'confirm' || !order.value) {
            return;
        }
        receiveOrder(order.value.id).then(res => {
            order.value = res;
        });
    });
}

function tapCancel() {
    toast.confirm('确认取消此订单？').then(action => {
        if (action !== 'confirm' || !order.value) {
            return;
        }
        cancelOrder(order.value.id).then(res => {
            order.value = res;
        });
    });
}


const id = parseInt(route.params.id as string, 10);
if (!id) {
    toast.error('订单错误');
    router.push('/');
    
} else {
    shopStore.getOrder(id).then(res => {
        order.value = res;
    });
}

</script>
<style lang="scss" scoped>

</style>
