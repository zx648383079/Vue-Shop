<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header collect-page">
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="swipe-box goods-list">
                    <SwipeRow name="goods-item" v-for="(item, index) in filterItems" :key="index" @remove="tapRemove(item, index)" :index="index" ref="swiperow">
                        <div class="goods-img">
                            <img :src="item.goods.thumb" alt="">
                        </div>
                        <div class="goods-info">
                            <h4>{{item.goods.name}}</h4>
                            <span>{{ item.goods.price }}</span>
                        </div>
                    </SwipeRow>
                </div>
                <div class="order-empty" v-if="!filterItems || filterItems.length < 1">
                    您还没有收藏商品
                </div>
            </PullToRefresh>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ICollect } from '@/api/model';
import { getCollect, removeCollect } from '@/api/user';
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { computed, reactive, ref } from 'vue';

const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
});
const items = ref<ICollect[]>([]);

const filterItems = computed(() => {
    return items.value.filter(item => {
        return !!item.goods;
    });
});

function tapRemove(item: ICollect, index: number) {
    removeCollect(item.goods_id).then(res => {
        if (!res.data) {
            items.value.splice(index, 1);
        }
    });
}

function tapMore() {
    goPage( ++ queries.page);
}

function tapRefresh() {
    items.value = [];
    queries.isLoading = false;
    queries.hasMore = true;
    goPage(queries.page = 1);
}

function goPage(page: number) {
    if (queries.isLoading || !queries.hasMore) {
        return;
    }
    queries.isLoading = true;
    getCollect({
        page,
    }).then(res => {
        queries.page = page;
        queries.hasMore = res.paging.more;
        queries.isLoading = false;
        if (!res.data) {
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
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
