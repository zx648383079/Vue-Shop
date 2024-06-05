<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header has-footer">
            <div>
                <div class="goods-item" v-for="(item, index) in items" :key="index">
                    <div class="goods-img">
                        <img :src="item.thumb" alt="">
                    </div>
                    <div class="goods-info">
                        <h4>{{ item.name }}</h4>
                        <span class="amount"> x {{ item.amount }}</span>
                    </div>
                </div>
            </div>
            <div v-if="mode < 2">
                <div class="actions" v-if="status == ORDER_STATUS.SHIPPED">
                    <span>您是否已收到货?</span>
                    <div class="radio-box">
                        <span :class="{ active: mode < 1 }" @click="mode = 0">未收货</span>
                        <span :class="{ active: mode == 1 }" @click="mode = 1">已收货</span>
                    </div>
                </div>
                <RefundGrid v-if="mode < 1"/>
                <div class="choose-mode" v-if="mode == 1">
                    <button class="btn" @click="mode = 2">申请返修/退换货</button>
                </div>
            </div>
            <div class="menu-list" v-if="mode == 2">
                <MenuItem title="维修" icon="icon-hammer" @tapped="mode = 3"/>
                <MenuItem title="退货" icon="icon-undo" @tapped="mode = 4"/>
                <MenuItem title="换货" icon="icon-exchange-alt" @tapped="mode = 5"/>
                <MenuItem title="价格保护" icon="icon-exchange-alt" @tapped="mode = 6"/>
            </div>
            <AfterSalegGrid v-if="mode > 2" :mode="mode"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { ORDER_STATUS, type IOrderGoods } from '@/api/model';
import { getRefundGoods } from '@/api/order';
import RefundGrid from './Child/RefundGrid.vue';
import AfterSalegGrid from './Child/AfterSalegGrid.vue';
import MenuItem from '../Member/Child/MenuItem.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const items = ref<IOrderGoods[]>([]);
const mode = ref(0);
const status = ref<ORDER_STATUS>(ORDER_STATUS.PAID_UN_SHIP);

getRefundGoods(route.query).then(res => {
    if (!res.data || res.data.length < 1) {
        router.push('/');
        return;
    }
    items.value = res.data;
    status.value = res.data[0].status as ORDER_STATUS;
    if (status.value === ORDER_STATUS.RECEIVED || status.value === ORDER_STATUS.FINISH) {
        mode.value = 2;
    }
});
</script>
<style lang="scss" scoped>
.goods-item {
    position: relative;
    background-color: #fff;
    display: grid;
    grid-template: 70px / 80px 1fr;
    padding: 5px;
    .goods-img {
        display: inline-block;
        img {
            width: 70px;
            height: 70px;
        }
    }
    .goods-info {
        display: inline-block;
        height: 70px;
        vertical-align: top;
        overflow: hidden;
        margin-bottom: 0;
        position: relative;
    }
}

.actions {
    line-height: 40px;
    .radio-box {
        float: right;
        span {
            display: inline-block;
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 0 10px;
            margin-left: 10px;
            box-sizing: content-box;
            line-height: 35px;
            &.active {
                background-color: #d22222;
                color: #fff;
            }
        }
    }
}
.choose-mode {
    text-align: center;
    padding-top: 20vh;
    .btn {
        background-color: #d22222;
        line-height: 40px;
        color: #fff;
        
    }
}
</style>
