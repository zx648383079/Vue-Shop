<template>
    <div>
        <header class="top top-search-box">
            <a href="" class="logo">
                <img :src="logo" alt="">
            </a>
            <a class="search-entry" @click="tapSearch">
                <i class="iconfont fa-search"></i>
                <span>搜索商品, 共{{ subtotal ? subtotal.goods : 0 }}款好物</span>
            </a>
            <a v-if="isGuest" @click="tapLogin">登录</a>
            <a v-if="!isGuest" @click="tapMessage">
                <i class="iconfont fa-comment-dots"></i>
            </a>
        </header>

        <div class="has-header has-footer">

            <div class="banner">
                <Swiper :auto="4000">
                    <SwiperSlide v-for="(item, index) in banners" :key="index">
                        <img :src="item.content" style="width:100%">
                    </SwiperSlide>
                </Swiper>
            </div>

            <div class="menu-box">
                <a v-for="(item, index) in categories" :key="index" class="menu-item">
                    <img class="menu-icon" :src="item.icon" alt="">
                    <div class="menu-name">{{ item.name }}</div>
                </a>
            </div>

            <GoodsPanel :items="floorItems.new_products!" title="最新商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

            <GoodsPanel :items="floorItems.hot_products!" title="热门商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

            <GoodsPanel :items="floorItems.best_products!" title="推荐商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

        </div>

        <TabBar/>
        <CartDialog :mode="mode" :product="(goods as any)" @close="mode = 0"/>
    </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import TabBar from '@/components/TabBar.vue'
import GoodsPanel from './Child/GoodsPanel.vue'
import {getHome} from '../../api/product'
import {getCategories} from '../../api/category'
import {getBanners} from '../../api/ad'
import type { IProduct, IAd, ICategory, IHomeProduct, ISite } from '@/api/model';
import CartDialog from '../Goods/Child/CartDialog.vue';
import { addGoods } from '@/api/cart';
import { assetsFilter } from '../../pipes';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useShopStore } from '../../stores/shop';
import { useDialog } from '../../components/Dialog/plugin';

const authStore = useAuthStore();
const shopStore = useShopStore();
const router = useRouter();
const toast = useDialog();
const banners = ref<IAd[]>([]);
const categories = ref<ICategory[]>([]);
const floorItems = ref<IHomeProduct>({});
const subtotal = ref<ISite| null>(null);
const goods = ref<IProduct| null>(null);
const mode = ref(0);

const isGuest = computed(() => authStore.isGuest);
const logo = computed(() => assetsFilter(subtotal.value ? subtotal.value.logo : '/assets/images/wap_logo.png'))

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

function tapSearch() {
    router.push('/search');
}

function tapLogin() {
    router.push('/login');
}

function tapMessage() {
    router.push('/message');
}

getHome().then(res => {
    floorItems.value = res;
}).catch(err => {
    toast.error(err);
});
getCategories().then(res => {
    if (!res.data) {
        return;
    }
    categories.value = res.data;
});
getBanners().then(res => {
    if (!res.data) {
        return;
    }
    banners.value = res.data;
});
shopStore.getSite().then(res => {
    subtotal.value = res;
});
</script>

<style scoped>
.banner {
    /* height: 50vw; */
}
</style>