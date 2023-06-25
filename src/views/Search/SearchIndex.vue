<template>
    <div>
        <SearchBar v-show="isSearch" v-model="keywords" @search="tapSearch"></SearchBar>
        <div v-show="!isSearch">
            <header class="top">
                <div class="search-box under-search">
                    <a class="home-btn" @click="tapHome">
                        <i class="iconfont fa-home"></i>
                    </a>
                    <form @click="tapEnterSearch">
                        <i class="iconfont fa-search" aria-hidden="true"></i>
                        <input type="text" readonly name="keywords" :value="searchParams.keywords">
                        <i class="iconfont fa-times-circle" @click="tapNewSearch"></i>
                    </form>
                </div>
            </header>
            <div class="has-header">
                <PullToRefresh :loading="isLoading" :more="hasMore"   @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <GoodsItem v-for="(item, index) in items" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
                    </div>
                </PullToRefresh>
            </div>
        </div>
        <CartDialog :mode="mode" :product="(goods as any)" @close="mode = 0"/>
    </div>
</template>
<script setup lang="ts">
import { getList } from '../../api/product';
import PullToRefresh from '@/components/PullToRefresh.vue';
import GoodsItem from '../Home/Child/GoodsItem.vue';
import SearchBar from './Child/SearchBar.vue'
import type { IProduct } from '@/api/model';
import CartDialog from '../Goods/Child/CartDialog.vue';
import { addGoods } from '@/api/cart';
import { useAuthStore } from '../../stores/auth';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDialog } from '../../components/Dialog/plugin';

interface ISearch {
    keywords: string,
    category: number,
    brand: number,
    page: number,
}

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useDialog();

const isGuest = computed(() => authStore.isGuest);
const items = ref<IProduct[]>([]);
const isSearch = ref(true);
const keywords = ref('');
const hasMore = ref(true);
const isLoading = ref(false);
const searchParams = ref<ISearch>({
    keywords: '',
    category: 0,
    brand: 0,
    page: 1,
});
const mode = ref(0);
const goods = ref<IProduct | null>(null);

function tapRefresh() {
    goPage(1);
}

function tapMore() {
    if (!hasMore.value) {
        return;
    }
    goPage(searchParams.value.page + 1);
}

function goPage(page: number) {
    if (isLoading.value) {
        return;
    }
    isLoading.value = true;
    getList({
        page,
        keywords: searchParams.value.keywords,
        category: searchParams.value.category,
        brand: searchParams.value.brand,
    }).then(res => {
        searchParams.value.page = page;
        hasMore.value = res.paging.more;
        isLoading.value = false;
        if (page < 2) {
            items.value = res.data;
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}
function tapProduct(item: IProduct) {
    router.push({name: 'product', params: {id: item.id + ''}});
}
function tapAddCart(item: IProduct) {
    if (isGuest.value) {
        router.push('/login');
        return;
    }
    if (goods.value && goods.value.id === item.id) {
        mode.value = 1;
        return;
    }
    addGoods(item.id, 1).then(res => {
        if (!res.dialog) {
            toast.success('已成功加入购物车');
            return;
        }
        goods.value = res.data;
        mode.value = 1;
    });
}
function tapSearch(keywords: string) {
    searchParams.value.keywords = keywords;
    isSearch.value = false;
    tapRefresh();
}
function tapHome() {
    router.push('/');
}
function tapEnterSearch() {
    keywords.value = searchParams.value.keywords;
    isSearch.value = true;
}
function tapNewSearch() {
    searchParams.value.keywords = keywords.value = '';
    isSearch.value = true;
}


isSearch.value = Object.keys(route.query).length === 0;
searchParams.value = Object.assign(searchParams.value, route.query);
if (!isSearch.value) {
    tapRefresh();
}
</script>