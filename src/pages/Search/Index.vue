<template>
    <div>
        <SearchBar v-show="isSearch" :keywords="keywords" @search="tapSearch"></SearchBar>
        <div v-show="!isSearch">
            <header class="top">
                <div class="search-box under-search">
                    <a class="home-btn" @click="tapHome">
                        <i class="fa fa-home"></i>
                    </a>
                    <form @click="tapEnterSearch">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" readonly="" name="keywords" :value="searchParams.keywords">
                        <i class="fa fa-times-circle" @click="tapNewSearch"></i>
                    </form>
                </div>
            </header>
            <div class="has-header">
                <load-more style="width:100%;" @loadMore="infiniteCallback" :commad="commad" :param="searchParams"
                        ref="searchRusultloadMore">
                    <div class="goods-list">
                        <GoodsItem v-for="(item, index) in items" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
                    </div>
                </load-more>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getList } from "../../api/product";
import LoadMore from '@/components/loadMore.vue'
import GoodsItem from "../Home/Child/GoodsItem.vue";
import SearchBar from './Child/SearchBar.vue'
import { IProduct } from '@/api/model';

export default Vue.extend({
    components: {
      LoadMore,
      GoodsItem,
      SearchBar
    },
    data() {
        const items: any[] = [];
        return {
            isSearch: true,
            keywords: '',
            items,
            commad: getList,
            searchParams: {
                keywords: '',
                category: null,
                brand: null,
                per_page: 20,
                page: 1
            }
        }
    },
    created() {

    },
    mounted: function () {
        this.isSearch = Object.keys(this.$route.query).length == 0
        this.searchParams = JSON.parse(JSON.stringify(Object.assign(this.searchParams, this.$route.query)))
        if (!this.isSearch) {
            this.$refs.searchRusultloadMore.onloadMoreScroll();
        }
    },
    methods: {
        async searchRusult() {
            this.searchParams.per_page = 20;
            this.searchParams.page = 1;
            this.searchParams = JSON.parse(JSON.stringify(Object.assign(this.searchParams, this.$route.query)))
            this.$refs.searchRusultloadMore.onloadMoreScroll();
        },
        async infiniteCallback(response: any) { //下拉加载
            if (response.data.length > 0) {
                response.data.map((i: any) => {
                    this.items.push(i)
                })
            }
        },
        tapProduct(item: IProduct) {
            console.log(item);
        },
        tapAddCart(item: IProduct) {
            console.log(item);
        },
        tapSearch(keywords: string) {
            this.searchParams.keywords = keywords
            this.isSearch = false;
            this.searchRusult();
        },
        tapHome() {
            this.$router.push('/');
        },
        tapEnterSearch() {
            this.keywords = this.searchParams.keywords
            this.isSearch = true
        },
        tapNewSearch() {
            this.searchParams.keywords = this.keywords = ''
            this.isSearch = true
        }
    },
});
</script>