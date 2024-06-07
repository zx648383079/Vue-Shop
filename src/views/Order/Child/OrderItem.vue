<template>
    <div class="order-item">
        <div class="order-header">
            <span>
                <em class="item-sn">SN: </em>
                {{ props.item.series_number }}</span>
            <span class="status" :class="{'strong-text': props.item.status == ORDER_STATUS.UN_PAY || props.item.status == ORDER_STATUS.SHIPPED || props.item.status == ORDER_STATUS.RECEIVED }">{{ props.item.status_label }}</span>
        </div>
        <div class="goods-list" v-if="props.item.goods">
            <div class="goods-item" v-for="(goods, index) in props.item.goods" :key="index">
                <div class="goods-img">
                    <img :src="goods.thumb" alt="">
                </div>
                <div class="goods-info">
                    <h4>{{ goods.name }}</h4>
                    <span class="price">{{ $n(goods.price, 'currency') }}</span>
                    <span class="amount"> x {{ goods.amount }}</span>
                </div>
            </div>
        </div>
        <div class="order-amount">
            共 {{ props.item.goods?.length }} 件 合计：{{ $n(props.item.goods_amount, 'currency') }}
        </div>
        <div class="order-footer">
            <div class="order-actions">
                <a @click="tapPay" v-if="props.item.status == ORDER_STATUS.UN_PAY" class="btn-danger">支付</a>
                <a @click="tapOrder">详情</a>
                <a @click="tapReceive" v-if="props.item.status == ORDER_STATUS.SHIPPED" class="btn-danger">确认收货</a>
                <a @click="tapComment" v-if="props.item.status == ORDER_STATUS.RECEIVED" class="btn-danger">评价</a>
                <a @click="tapRefund" v-if="props.item.status == ORDER_STATUS.SHIPPED || props.item.status == ORDER_STATUS.PAID_UN_SHIP">申请退款</a>
                <a @click="tapRefund" v-if="props.item.status == ORDER_STATUS.RECEIVED">退换货</a>
                <a @click="tapRefund" v-if="props.item.status == ORDER_STATUS.FINISH">售后</a>
                <a @click="tapCancel" v-if="props.item.status == ORDER_STATUS.UN_PAY || props.item.status == ORDER_STATUS.PAID_UN_SHIP"  class="btn-danger">取消</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type IOrder, ORDER_STATUS } from '@/api/model';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['receive', 'cancel']);
const props = defineProps<{
    item: IOrder
}>();

function tapPay() {
    if (!props.item) {
        return;
    }
    router.push({name: 'pay', params: {id: props.item.id + ''}});
}

function tapOrder() {
    if (!props.item) {
        return;
    }
    router.push({name: 'order-detail', params: {id: props.item.id + ''}});
}

function tapRefund() {
    if (!props.item) {
        return;
    }
    router.push({name: 'refund-create', params: {order: props.item.id + '' }});
}

function tapComment() {
    router.push({name: 'comment'});
}

function tapReceive() {
    emit('receive');
}

function tapCancel() {
    emit('cancel');
}


</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';

.order-item {
    border-radius: $formRadius;
    padding: .4rem;
    margin-bottom: .4rem;
    .item-sn {
        color: var(--#{$prefix}-secondary-text);
        font-size: .8rem;
    }
    .status {
        color: var(--#{$prefix}-secondary-text);
        font-size: .8rem;
    }
    .strong-text {
        color: var(--#{$prefix}-danger);
    }
    .order-actions {
        a {
            --#{$prefix}-action-text: var(--#{$prefix}-body-text);
            cursor: pointer;
            border: 1px solid var(--#{$prefix}-action-text);
            color: var(--#{$prefix}-action-text);
            display: inline-block;
            border-radius: 1rem;
            padding: 0 .8rem;
            text-align: center;
            min-width: 4rem;
            line-height: 1.5rem;
            font-size: .8rem;
            margin-left: .4rem;
        }
        .btn-danger {
            --#{$prefix}-action-text: var(--#{$prefix}-danger);
        }
    }
}

</style>