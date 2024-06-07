<template>
    <div>
        <div class="store-page">
            <header class="store-header">
                <div class="search-back-box">
                    <a class="back" @click="tapBack">
                        <i class="iconfont icon-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a class="search-entry" @click="$router.push('/search')">
                        <i class="iconfont icon-search" aria-hidden="true"></i>
                        <span>搜索本店商品</span>
                    </a>
                </div>
                <div class="store-info">
                    <div class="logo">
                        <img :src="logo" alt="">
                    </div>
                    <div class="info">
                        <div class="name">12345545</div>
                        <p>233万人收藏</p>
                    </div>
                    <div class="action">
                        <a href="">
                            <i class="iconfont icon-star"></i>    
                            收藏
                        </a>
                    </div>
                </div>
                <div class="tab-bar">
                    <a v-for="(item, index) in tabList" :key="index" @click="tapTab(index)" :class="tabIndex == index ? 'active' : ''">{{ item.name }}</a>
                </div>
            </header>

            <div class="store-body">
                <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <div class="product-item" v-for="(item, index) in items" :key="index">
                            <div class="item-thumb">
                                <a ><img :src="item.thumb" alt=""></a>
                            </div>
                            <div class="item-title">
                                {{item.name}}
                            </div>
                            <div class="item-actions">
                                <span class="item-price">{{ $n(item.price, 'currency') }}</span>
                                <span>加入购物车</span>
                            </div>
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IProduct } from '@/api/model';
import { getList } from '@/api/product';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { assetsFilter } from '../../pipes';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref<IProduct[]>([]);
const hasMore = ref(true);
const page = ref(1);
const isLoading = ref(false);
const tabIndex = ref(0);
const tabList = [
    {
        name: '首页',
        status: 0,
    },
    {
        name: '全部商品',
        status: 0,
    },
    {
        name: '促销',
        status: 0,
    },
    {
        name: '动态',
        status: 0,
    },
];

const logo = computed(() => assetsFilter('/assets/images/avatar/1.png'));

function tapBack() {
    if (!window || window.history.length <= 1) {
        router.push('/');
        return;
    }
    router.go(-1);
}

function tapTab(index: number) {
    tabIndex.value = index;
}

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
    getList({
        p,
    }).then(res => {
        page.value = p;
        hasMore.value = res.paging.more;
        isLoading.value = false;
        if (p < 2) {
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
