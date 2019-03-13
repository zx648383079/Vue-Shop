<template>
    <div>
        <header class="top top-search-box">
            <a href="" class="logo">
                <img :src="'/assets/images/wap_logo.png' | assets" alt="">
            </a>
            <a class="search-entry" @click="tapSearch">
                <i class="fa fa-search"></i>
                <span>搜索商品, 共666款好物</span>
            </a>
            <a v-if="!isLogin" @click="tapLogin">登录</a>
            <a v-if="isLogin">
                <i class="fa fa-comment-dots"></i>
            </a>
        </header>

        <div class="has-header has-footer">

            <div class="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(item, index) in banners" :key="index">
                        <img :src="item.content" width="100%" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>

            <div class="menu-box">
                <a v-for="(item, index) in categories" :key="index" class="menu-item">
                    <img class="menu-icon" :src="item.icon" alt="">
                    <div class="menu-name">{{ item.name }}</div>
                </a>
            </div>

            <GoodsPanel :items="data.new_products" title="最新商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

            <GoodsPanel :items="data.hot_products" title="热门商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

            <GoodsPanel :items="data.best_products" title="推荐商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

        </div>

        <TabBar/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TabBar from '@/components/TabBar.vue'
import GoodsPanel from './Child/GoodsPanel.vue'
import {
    mapGetters,
    mapMutations
} from 'vuex'
import {getHome} from '../../api/product'
import {getCategories} from '../../api/category'
import {getBanners} from '../../api/ad'
import { IProduct } from '@/api/model';

export default Vue.extend({
    components: {
        TabBar,
        GoodsPanel,
    },
    data() {
        return {
            banners: [],
            categories: [],
            data: {},
            isLogin: false
        }
    },
    created: function () {
        getHome().then(res => {
            this.data = res;
        })
        getCategories().then(res => {
            this.categories = res.data;
        })
        getBanners().then(res => {
            this.banners = res.data
        })

    },
    methods: {
        tapProduct(item: IProduct) {
            this.$router.push({name: 'product', params: {id: item.id}});
        },
        tapAddCart(item: IProduct) {
            console.log(item);
        },
        tapSearch() {
            this.$router.push('/search');
        },
        tapLogin() {
            this.$router.push('/login');
        },
    }
});
</script>

<style scoped>
.banner {
    height: 200px;
}
</style>