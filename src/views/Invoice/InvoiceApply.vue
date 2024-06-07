<template>
    <div>
        <BackHeader title="申请开票"/>
        <div class="has-header has-double-footer">
            <div class="order-mini-item" v-for="(item, index) in items" :key="index">
                <i class="iconfont check-box" :class="{active: item.checked}" @click="toggleCheck(item)"></i>
                <div class="info">
                    <div class="name">
                        <em class="item-sn">SN: </em>
                        {{ item.series_number }}</div>
                    <p>{{ item.created_at }}</p>
                </div>
                <div class="amount">
                    {{ $n(item.goods_amount, 'currency') }}
                </div>
            </div>
        </div>
        <div class="invoice-footer">
            <div @click="toggleCheckAll">
                <i class="iconfont check-box" :class="{active: queries.checkedAll}"></i>
                全选
            </div>
            <div>
                已选择 {{ queries.selectedCount }} 笔订单
            </div>
            <div>
                <p>可开票金额{{ $n(queries.total, 'currency') }}</p>
                <p>已选金额{{ $n(queries.selectedMoney, 'currency') }}</p>
            </div>
            <div>
                <a href="">立即开票</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { getOrderList } from '../../api/invoice';
import type { IOrder } from '../../api/model';
import { reactive, ref } from 'vue';

const items = ref<IOrder[]>([]);
const queries = reactive({
    checkedAll: false,
    selectedCount: 0,
    selectedMoney: 0,
    total: 0
});

function toggleCheckAll() {
    queries.checkedAll = !queries.checkedAll;
    for (const item of items.value) {
        item.checked = queries.checkedAll;
    }
    refresh();
}

function toggleCheck(item: IOrder) {
    item.checked = !item.checked;
    if (!item.checked) {
        queries.checkedAll = false;
    }
    refresh();
}

function refresh() {
    queries.total = 0;
    queries.selectedCount = 0;
    queries.selectedMoney = 0;
    for (const item of items.value) {
        queries.total += item.goods_amount;
        if (!item.checked) {
            continue;
        }
        queries.selectedCount ++;
        queries.selectedMoney += item.goods_amount;
    }
}

getOrderList().then(res => {
    if (!res.data) {
        return;
    }
    items.value = res.data;
})
</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.item-sn {
    color: var(--#{$prefix}-secondary-text);
    font-size: .8rem;
}
</style>
