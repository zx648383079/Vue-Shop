<template>
    <div>
        <SearchBar v-show="isSearch" v-model="keywords" @search="tapSearch"></SearchBar>
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
                <PullToRefresh :loading="is_loading" :more="has_more"   @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <GoodsItem v-for="(item, index) in items" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
                    </div>
                </PullToRefresh>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { getList } from "../../api/product";
import PullToRefresh from '@/components/PullToRefresh.vue';
import GoodsItem from "../Home/Child/GoodsItem.vue";
import SearchBar from './Child/SearchBar.vue'
import { IProduct } from '@/api/model';

interface ISearch {
    keywords: string,
    category: number,
    brand: number,
    page: number
}

@Component({
    components: {
        PullToRefresh,
        GoodsItem,
        SearchBar,
    }
})
export default class Index extends Vue {

    items: IProduct[] = [];
    isSearch = true;
    keywords = '';
    has_more = true;
    is_loading = false;
    searchParams: ISearch = {
        keywords: '',
        category: 0,
        brand: 0,
        page: 1
    };

    created() {
        this.isSearch = Object.keys(this.$route.query).length == 0;
        this.searchParams = Object.assign(this.searchParams, this.$route.query);
        if (!this.isSearch) {
            this.tapRefresh();
        }
    }

    tapRefresh() {
        this.goPage(1);
    }

    tapMore() {
        if (!this.has_more) {
            return;
        }  
        this.goPage(this.searchParams.page + 1);
    }

    goPage(page: number) {
        if (this.is_loading) {
            return;
        }
        this.is_loading = true;
        getList({
            page: page,
            keywords: this.searchParams.keywords,
            category: this.searchParams.category,
            brand: this.searchParams.brand,
        }).then(res => {
            this.searchParams.page = page;
            this.has_more = res.paging.more;
            this.is_loading = false;
            if (page < 2) {
                this.items = res.data;
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
    tapProduct(item: IProduct) {
        this.$router.push({name: 'product', params: {id: item.id + ''}});
    }
    tapAddCart(item: IProduct) {
        console.log(item);
    }
    tapSearch(keywords: string) {
        this.searchParams.keywords = keywords;
        this.isSearch = false;
        this.tapRefresh();
    }
    tapHome() {
        this.$router.push('/');
    }
    tapEnterSearch() {
        this.keywords = this.searchParams.keywords;
        this.isSearch = true;
    }
    tapNewSearch() {
        this.searchParams.keywords = this.keywords = '';
        this.isSearch = true;
    }
}
</script>