<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                 <a v-for="(item, index) in tabItems" :key="index" @click="tapStatus(item)" :class="tabIndex == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="order-box">
                <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <div class="goods-item" v-for="(item, index) in items" :key="index">
                            <div class="goods-img">
                                <img :src="item.thumb" alt="">
                            </div>
                            <div class="goods-info">
                                <h4>{{ item.name }}</h4>
                                <span class="amount"> x {{ item.amount }}</span>
                                <a class="action" @click="tapApply(item)">申请售后</a>
                            </div>
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import type { IOrderGoods } from '@/api/model';
import { getRefundGoodsList } from '@/api/order';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();
const tabItems = [
    {
        name: '售后申请',
        status: 0,
    },
    {
        name: '处理中',
        status: 1,
    },
    {
        name: '记录',
        status: 2,
    },
];
const items = ref<IOrderGoods[]>([]);
const hasMore = ref(true);
const page = ref(1);
const isLoading = ref(false);
const tabIndex = ref(0);

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
    getRefundGoodsList({
        status: tabIndex,
        page: p,
    }).then(res => {
        page.value = p;
        hasMore.value = res.paging.more;
        isLoading.value = false;
        if (p < 2) {
            items.value = res.data as never[];
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}

function tapStatus(item: any) {
    if (tabIndex.value === item.status) {
        return;
    }
    tabIndex.value = item.status;
    tapRefresh();
}

function tapApply(item: IOrderGoods) {
    router.push({name: 'refund-create', query: {goods: item.id + ''}});
}

if (route.query && route.query.status) {
    tabIndex.value = parseInt(route.query.status + '', 10) || 0;
}
tapRefresh();
</script>
<style lang="scss" scoped>
.order-box {
    .goods-list {
        .goods-item {
            margin-bottom: 10px;
            .goods-info {
                .amount {
                    position: static;
                }
                .action {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    display: block;
                    border: 1px solid red;
                    border-radius: 10px;
                    line-height: 30px;
                    padding: 0 10px;
                    font-size: 16px;
                }
            }
        }
    }
}

</style>
