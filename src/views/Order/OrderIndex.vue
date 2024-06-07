<template>
    <div>
        <BackHeader title="我的订单"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                <a v-for="(item, index) in statusList" :key="index" @click="tapStatus(item)" :class="status == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="order-box">
                <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                    <OrderItem v-for="(item, index) in items" :key="index" :item="item" @receive="tapReceive(item)" @cancel="tapCancel(item)"/>
                    <div class="order-empty" v-if="!items || items.length < 1">
                        您还没有订单
                    </div>
                </PullToRefresh>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { ORDER_STATUS, type IOrder } from '@/api/model';
import { getOrder, receiveOrder, cancelOrder } from '@/api/order';
import OrderItem from './Child/OrderItem.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useDialog } from '../../components/Dialog/plugin';

const route = useRoute();
const toast = useDialog();

const statusList = [
    {
        name: '全部',
        status: 0,
    },
    {
        name: '待支付',
        status: ORDER_STATUS.UN_PAY,
    },
    {
        name: '待收货',
        status: ORDER_STATUS.SHIPPED,
    },
    {
        name: '已完成',
        status: ORDER_STATUS.FINISH,
    },
    {
        name: '已取消',
        status: ORDER_STATUS.CANCEL,
    },
];
const items = ref<IOrder[]>([]);
const hasMore = ref(true);
const page = ref(1);
const isLoading = ref(false);
const status = ref(0);

function tapRefresh() {
    goPage(1);
}

function tapMore() {
    if (!hasMore.value) {
        return;
    }
    goPage(page.value + 1);
}

function goPage(p: number) {
    if (isLoading.value) {
        return;
    }
    isLoading.value = true;
    getOrder({
        status: status.value,
        page: p,
    }).then(res => {
        page.value = p;
        hasMore.value = res.paging.more;
        isLoading.value = false;
        if (page.value < 2) {
            items.value = res.data as never[];
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}

function tapStatus(item: any) {
    if (status.value === item.status) {
        return;
    }
    status.value = item.status;
    tapRefresh();
}

function tapReceive(item: IOrder) {
    toast.confirm('确认取消此订单？').then(action => {
        if (action !== 'confirm') {
            return;
        }
        receiveOrder(item.id).then(res => {
            refreshItem(res);
        });
    });
}

function refreshItem(item: IOrder) {
    for (let i = 0; i < items.value.length; i++) {
        if (items.value[i].id !== item.id) {
            continue;
        }
        if (status.value > 0 && item.status !== status.value) {
            items.value.splice(i, 1);
            break;
        }
        items.value[i] = item;
        break;
    }
}

function tapCancel(item: IOrder) {
    toast.confirm('确认取消此订单？').then(action => {
        if (action !== 'cancel') {
            return;
        }
        cancelOrder(item.id).then(res => {
            refreshItem(res);
        })
    });
}


if (route.query && route.query.status) {
    status.value = parseInt(route.query.status + '', 10) || 0;
}
tapRefresh();
</script>
<style lang="scss" scoped>
.order-empty {
    font-size: 40px;
    color: #ccc;
    text-align: center;
    padding-top: 20vh;
}
</style>
