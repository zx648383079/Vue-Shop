<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                <a v-for="(item, index) in statusList" :key="index" @click="tapStatus(item)" :class="queries.status == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="comment-list-box">
                <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <GoodsItem v-for="(item, index) in items" :key="index" :item="item" @comment="tapComment(item)"/>
                    </div>
                </PullToRefresh>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import GoodsItem from './Child/GoodsItem.vue';
import type { IOrderGoods } from '@/api/model';
import { getCommentGoods } from '@/api/order';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
    status: 0
});
const items = ref<IOrderGoods[]>([]);
const statusList = [
    {
        name: '待评价',
        status: 0,
    },
    {
        name: '已评价',
        status: 1,
    },
];

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
    getCommentGoods({
        status: status,
        page,
    }).then(res => {
        queries.page = page;
        queries.hasMore = res.paging.more;
        queries.isLoading = false;
        if (page < 2) {
            items.value = res.data as never[];
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}

function tapStatus(item: any) {
    if (queries.status === item.status) {
        return;
    }
    queries.status = item.status;
    tapRefresh();
}

function tapComment(item: IOrderGoods) {
    router.push({name: 'comment-create', query: {goods: item.id + ''}});
}

if (route.query && route.query.status) {
    queries.status = parseInt(route.query.status + '', 10) || 0;
}
tapRefresh();
</script>
<style lang="scss" scoped>

</style>
