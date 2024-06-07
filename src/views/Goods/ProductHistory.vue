<template>
    <div>
        <BackHeader :title="$route.meta.title as string">
            <a v-if="items && items.length > 0" class="right" @click="tapClear">
                <i class="iconfont icon-trash-alt"></i>
            </a>
        </BackHeader>
        <div class="has-header collect-page">
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="swipe-box goods-list">
                    <SwipeRow name="goods-item" v-for="(item, index) in items" :key="index" @remove="tapRemove(item)" :index="index" ref="swiperow">
                        <div class="goods-img">
                            <img :src="item.thumb" alt="">
                        </div>
                        <div class="goods-info">
                            <h4>{{item.name}}</h4>
                            <span>{{ $n(item.price, 'currency') }}</span>
                        </div>
                    </SwipeRow>
                </div>
                <div class="order-empty" v-if="!items || items.length < 1">
                    您没有浏览记录
                </div>
            </PullToRefresh>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IProduct } from '@/api/model';
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { SET_GOODS_HISTORY } from '@/stores/types';
import { getList } from '@/api/product';
import { reactive, ref } from 'vue';
import { useDialog } from '../../components/Dialog/plugin';
import { useCache } from '../../services';


const toast = useDialog();
const cache = useCache();
const items = ref<IProduct[]>([]);
const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false
});
const goodsId = ref<number[]>([]);

function tapRemove(item: IProduct) {
    for (let i = 0; i < goodsId.value.length; i++) {
        if (goodsId.value[i] === item.id) {
            goodsId.value.splice(i, 1);
            break;
        }
    }
    cache.set(SET_GOODS_HISTORY, goodsId);
}

function tapClear() {
    toast.confirm('确认清空浏览记录？').then(action => {
        if (action !== 'confirm') {
            return;
        }
        goodsId.value = [];
        items.value = [];
        queries.hasMore = false;
        queries.isLoading = false;
        cache.remove(SET_GOODS_HISTORY);
    });
}

function tapMore() {
    goPage(queries.page + 1);
}

function tapRefresh() {
    items.value = [];
    queries.isLoading = false;
    queries.hasMore = true;
    goodsId.value = cache.get<number[]>(SET_GOODS_HISTORY, true);
    if (!goodsId.value || goodsId.value.length < 1) {
        queries.hasMore = false;
        queries.isLoading = true;
        setTimeout(() => {
            queries.isLoading = false;
        }, 500);
        return;
    }
    goPage(1);
}

function goPage(page: number) {
    if (queries.isLoading || !queries.hasMore) {
        return;
    }
    queries.isLoading = true;
    getList({
        id: goodsId.value,
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
