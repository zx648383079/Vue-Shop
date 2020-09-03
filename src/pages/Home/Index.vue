<template>
    <div>
        <header class="top top-search-box">
            <a href="" class="logo">
                <img :src="logo | assets" alt="">
            </a>
            <a class="search-entry" @click="tapSearch">
                <i class="fa fa-search"></i>
                <span>搜索商品, 共{{ subtotal ? subtotal.goods : 0 }}款好物</span>
            </a>
            <a v-if="isGuest" @click="tapLogin">登录</a>
            <a v-if="!isGuest" @click="tapMessage">
                <i class="fa fa-comment-dots"></i>
            </a>
        </header>

        <div class="has-header has-footer">

            <div class="banner">
                <Swiper :auto="4000">
                    <SwiperItem v-for="(item, index) in banners" :key="index">
                        <img :src="item.content" width="100%" alt="">
                    </SwiperItem>
                </Swiper>
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
        <CartDialog :mode="mode" :product="goods" @close="mode = 0"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import TabBar from '@/components/TabBar.vue'
import GoodsPanel from './Child/GoodsPanel.vue'
import {getHome, getInfo} from '../../api/product'
import {getCategories} from '../../api/category'
import {getBanners} from '../../api/ad'
import { IProduct, IAd, ICategory, IHomeProduct, ISubtotal, ISite } from '@/api/model';
import { dispatchSite } from '@/store/dispatches';
import { Getter } from 'vuex-class';
import CartDialog from '@/pages/Goods/Child/CartDialog.vue';
import Swiper from '@/components/Swiper.vue';
import SwiperItem from '@/components/SwiperItem.vue';
import { addGoods } from '@/api/cart';
import Toast from '@/components/toast';

@Component({
    components: {
        TabBar,
        GoodsPanel,
        CartDialog,
        Swiper,
        SwiperItem,
    },
})
export default class Index extends Vue {
    public banners: IAd[] = [];
    public categories: ICategory[] = [];
    public data: IHomeProduct = {};
    public subtotal: ISite| null = null;
    public mode: number = 0;
    public goods: IProduct | null = null;

    @Getter('isGuest') public isGuest?: boolean;

    public get logo(): string {
        return this.subtotal ? this.subtotal.logo : '/assets/images/wap_logo.png';
    }

    public created() {
        getHome().then(res => {
            this.data = res;
        });
        getCategories().then(res => {
            if (!res.data) {
                return;
            }
            this.categories = res.data;
        });
        getBanners().then(res => {
            if (!res.data) {
                return;
            }
            this.banners = res.data;
        });
        dispatchSite().then(res => {
            this.subtotal = res;
        });
    }

    public tapProduct(item: IProduct) {
        this.$router.push({name: 'product', params: {id: item.id + ''}});
    }

    public tapAddCart(item: IProduct) {
        if (this.isGuest) {
            this.$router.push('/login');
            return;
        }
        if (this.goods && this.goods.id === item.id) {
            this.mode = 1;
            return;
        }
        addGoods(item.id, 1).then(res => {
            if (!res.dialog) {
                Toast('已成功加入购物车');
                return;
            }
            this.goods = res.data;
            this.mode = 1;
        });
    }

    public tapSearch() {
        this.$router.push('/search');
    }

    public tapLogin() {
        this.$router.push('/login');
    }

    public tapMessage() {
        this.$router.push('/message');
    }
}
</script>

<style scoped>
.banner {
    height: 50vw;
}
</style>