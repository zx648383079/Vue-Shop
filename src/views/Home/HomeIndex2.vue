<template>
    <div>
        <header class="top top-search-box">
            <a href="" class="logo">
                <img :src="logo" alt="">
            </a>
            <a class="search-entry" @click="tapSearch">
                <i class="iconfont icon-search"></i>
                <span>{{ $t('message.search_tip', {subtotal: subtotal ? subtotal.goods : 0}) }}</span>
            </a>
            <a class="icon-item" @click="tapMessage">
                <i class="iconfont icon-scan"></i>
            </a>
            <a class="icon-item" @click="tapMessage">
                <i class="iconfont icon-comment"></i>
            </a>
        </header>

        <div class="has-header has-footer">

            <div class="header-mask">
                <div class="banner">
                    <SwiperContainer :items="banners"/>
                </div>

                <div class="menu-box">
                    <a v-for="(item, index) in categories" :key="index" class="menu-item">
                        <img class="menu-icon" :src="item.icon" alt="">
                        <div class="menu-name">{{ item.name }}</div>
                    </a>
                </div>
            </div>

            <NoticeBar/>

            <div class="flex-row">
                <div class="flex-panel">
                    <div class="panel-header">
                        上新
                    </div>
                    <div class="flex-row">
                        <div class="flex-item">
                            <div class="item-thumb">
                                <img src="" alt="">
                            </div>
                            <div class="item-price">{{ $n(99.1, 'currency') }}</div>
                        </div>
                        <div class="flex-item">
                            <div class="item-thumb">
                                <img src="" alt="">
                            </div>
                            <div class="item-price">￥99</div>
                        </div>
                    </div>
                </div>
                <div class="flex-panel">
                    <div class="panel-header">
                        上新
                        <CountDown end="0"/>
                    </div>
                    <div class="flex-row">
                        <div class="flex-item">
                            <div class="item-thumb">
                                <img src="" alt="">
                            </div>
                            <div class="item-price">￥99</div>
                        </div>
                        <div class="flex-item">
                            <div class="item-thumb">
                                <img src="" alt="">
                            </div>
                            <div class="item-price">￥99</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-container">
                <div class="product-row-item" v-for="(item, index) in floorItems.new_products" :key="index">
                    <div class="item-thumb">
                        <img :src="item.thumb" alt="">
                    </div>
                    <div class="item-body">
                        <div class="item-name">{{ item.name  }}</div>
                        <div class="item-meta">{{ item.description }}</div>
                        <div class="item-tag-bar">
                            <a class="tag-item" href="">
                                <i class="tag-icon">券</i>
                                满8减1
                            </a>
                            <a class="tag-item" href="">
                                <i class="tag-icon">券</i>
                                满8减1
                            </a>
                        </div>
                        <div class="item-footer">
                            <div class="price-group">
                                <div class="price">
                                    <em>￥</em>
                                    {{ item.price || 0 }}</div>
                                <div class="old-price">￥{{ item.market_price }}</div>
                            </div>
                            <div class="item-action">
                                <i class="iconfont icon-cart"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="goods-list">
                <div class="product-header-item">
                    <h2>热门商品</h2>
                </div>
                <GoodsItem v-for="(item, index) in floorItems.new_products" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
            </div>

            <GoodsPanel :items="floorItems.best_products!" title="推荐商品" @enter="tapProduct" @addCart="tapAddCart"></GoodsPanel>

        </div>

        <TabBar/>
        <CartDialog :mode="mode" :product="(goods as any)" @close="mode = 0"/>
    </div>
</template>
<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
import GoodsItem from './Child/GoodsItem.vue';
import GoodsPanel from './Child/GoodsPanel.vue'
import NoticeBar from './Child/NoticeBar.vue';
import SwiperContainer from './Child/SwiperContainer.vue';
import CountDown from '../../components/CountDown.vue';
import type { IProduct, IAd, ICategory, IHomeProduct, ISite } from '@/api/model';
import CartDialog from '../Goods/Child/CartDialog.vue';
import { addGoods } from '@/api/cart';
import { assetsFilter } from '../../pipes';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useDialog } from '../../components/Dialog/plugin';
import { shopBatch } from '../../api/site';
import { useTheme } from '../../services';

const authStore = useAuthStore();
const router = useRouter();
const toast = useDialog();
const banners = ref<IAd[]>([]);
const categories = ref<ICategory[]>([]);
const floorItems = ref<IHomeProduct>({});
const subtotal = ref<ISite| null>(null);
const goods = ref<IProduct| null>(null);
const mode = ref(0);

const isGuest = computed(() => authStore.guest);
const logo = computed(() => assetsFilter(subtotal.value ? subtotal.value.logo : '/assets/images/wap_logo.png'))

function tapProduct(item: IProduct) {
    router.push({name: 'product', params: {id: item.id + ''}});
}

function tapAddCart(item: IProduct) {
    if (isGuest.value) {
        tapLogin();
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
    if (isGuest.value) {
        tapLogin();
        return;
    }
    router.push('/message');
}

shopBatch<{
    category: ICategory[],
    banner: IAd[],
    home_product: IHomeProduct,
}>({
    category: {},
    banner: {},
    home_product: {},
}).then(res => {
    floorItems.value = res.home_product || {};
    categories.value = res.category;
    banners.value = res.banner;
});

useTheme().getInformation().then(res => {
    subtotal.value = res;
});
</script>

<style lang="scss" scoped>
@import '../../assets/css/theme';
.banner {
    --#{$prefix}-swiper-text: var(--#{$prefix}-primary-text);
    --#{$prefix}-swiper-height: 20rem;
    min-height: 15rem;
}
.header-mask {
    background: linear-gradient(to bottom, var(--#{$prefix}-primary) 60%, var(--#{$prefix}-body) 80%);
}
.menu-box {
    margin: .8rem;
    border-radius: $formRadius;
    box-sizing: border-box;
    width: auto;
}
.flex-row {
    margin: .4rem;
    display: flex;
}
.flex-panel {
    flex: 1;
    margin: .4rem;
    border-radius: $formRadius;
    background-color: var(--#{$prefix}-panel);
    .panel-header {
        padding: .4rem .8rem;
        font-weight: bold;
    }
    .countdown {
        display: inline-block;
    }
}
.flex-item {
    display: inline-block;
    text-align: center;
    flex: 1;
    .item-thumb {
        height: 5rem;
    }
    .item-price {
        color: var(--#{$prefix}-danger);
    }
}

.goods-list {
    margin: .8rem;
    width: auto;
}
.panel-container {
    margin: .8rem;
    border-radius: $formRadius;
}

</style>