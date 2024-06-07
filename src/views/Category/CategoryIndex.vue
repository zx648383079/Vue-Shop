<template>
    <div>
        <header class="top">
            <a class="search-entry" @click="$router.push('/search')">
                <i class="iconfont icon-search"></i>
                <span>搜索商品, 共 {{ subtotal ? subtotal.goods : 0 }} 款好物</span>
            </a>
        </header>
        <div class="has-header has-footer category-page">
            <div class="category-menu">
                <div v-for="(item, index) in categories" :key="index" :class="['menu-item', category && item.id == category.id ? 'active' : '']" @click="tapSelected(item, index)">{{ item.name }}</div>
            </div>

            <div class="category-main" v-if="category">
                <div class="item active">
                    <div class="banner">
                        <img :src="category.banner" alt="">
                    </div>
                    <div class="header">
                        <a @click="tapSearch(category)">{{ category.name }}</a>
                    </div>
                    <div class="goods-list" v-if="category.goods_list && category.goods_list.length > 0">
                        <div class="product-item" v-for="(item, index) in category.goods_list" :key="index">
                            <div class="item-thumb">
                                <a  @click="tapProduct(item)"><img :src="item.thumb" alt=""></a>
                            </div>
                            <div class="item-title">
                                {{item.name}}
                            </div>
                            <div class="item-actions">
                                <span class="item-price">{{ $n(item.price, 'currency') }}</span>
                                
                            </div>
                        </div>
                    </div>
                    <ul class="tree-grid" v-if="category.children && category.children.length > 0">
                        <li class="tree-item" v-for="(item, index) in category.children" :key="index">
                            <a  @click="tapSearch(item)">{{ item.name }}</a>
                            <ul class="tree-item-chidren" v-if="item.children && item.children.length > 0">
                                <li class="tree-item" v-for="(it, i) in item.children" :key="i">
                                    <a  @click="tapSearch(it)">{{ it.name }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <TabBar/>
    </div>
</template>
<script setup lang="ts">
import type { ICategory, IProduct, ISite } from '@/api/model';
import { getCategory } from '@/api/category';
import TabBar from '@/components/TabBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShopStore } from '../../stores/shop';

const router = useRouter();
const shopStore = useShopStore();
const categories = ref<ICategory[]>([]);
const category = ref<ICategory | null>(null);
const subtotal = ref<ISite | null>(null);

function tapSelected(item: ICategory, index: number) {
    if (item.goods_list) {
        category.value = item;
        return;
    }
    getCategory(item.id, 'goods_list,children').then(res => {
        categories.value[index] = category.value = res;
    });
}

function tapSearch(item: ICategory | null) {
    if (!item) {
        return;
    }
    router.push({name: 'search', query: {category: item.id + ''}});
}

function tapProduct(item: IProduct) {
    router.push({name: 'product', params: {id: item.id + ''}});
}

shopStore.getCategories().then(res => {
    if (!res) {
        return;
    }
    categories.value = res;
    tapSelected(res[0], 0);
});
shopStore.getSite().then(res => {
    subtotal.value = res;
});

</script>
<style lang="scss" scoped>

</style>
