<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header has-footer">
            <div class="tab-header">
                <div class="tab-item" v-for="(item, index) in statusList" :key="index" :class="{active: index == queries.status}" @click="tapStatus(index)">{{ item }}</div>
            </div>

            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="my-coupon-item" v-for="(item, index) in items" :key="index" :calss="{expired: item.expired}">
                    <div class="price">
                        <em>{{ item.money }}</em>
                        <p>满{{ item.min_money }}可用</p>
                    </div>
                    <div class="info">
                        <p>{{ item.name }}</p>
                        <div class="time">
                            <span>{{ item.start_at }}-{{ item.end_at}}</span>
                            <a href="" v-if="!item.expired">立即使用</a>
                        </div>
                    </div>
                </div>
            </PullToRefresh>
        </div>

        <footer class="tab-bar">
            <a @click="$router.replace('/coupon')">
                <i class="iconfont fa-gift" aria-hidden="true"></i>
                领券
            </a>
            <a class="active">
                <i class="iconfont fa-user" aria-hidden="true"></i>
                我的优惠券
            </a>
        </footer>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { getMyCoupon } from '../../api/coupon';
import type { ICoupon } from '../../api/model';
import { reactive, ref } from 'vue';

const statusList = [
    '未使用',
    '使用记录',
    '已过期',
];

const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
    status: 0,
});
const items = ref<ICoupon[]>([]);

function tapStatus(index: number) {
    queries.status = index;
    tapRefresh();
}

function tapRefresh() {
    goPage(1);
}

function tapMore() {
    if (!queries.hasMore) {
        return;
    }
    goPage(queries.page + 1);
}

function goPage(page: number) {
    if (queries.isLoading) {
        return;
    }
    queries.isLoading = true;
    getMyCoupon({
        status: status,
        page,
    }).then(res => {
        queries.page = page;
        queries.isLoading = false;
        if (!res.data) {
            return;
        }
        if (page < 2) {
            items.value = res.data;
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}

tapRefresh();

</script>
<style lang="scss" scoped>

</style>
