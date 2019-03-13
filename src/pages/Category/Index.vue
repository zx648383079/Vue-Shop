<template>
    <div>
        <header class="top">
            <a class="search-entry" @click="$router.push('/search')">
                <i class="fa fa-search"></i>
                <span>搜索商品, 共19304款好物</span>
            </a>
        </header>
        <div class="has-header has-footer category-page">
            <div class="category-menu">
                <div v-for="(item, index) in categories" :key="index" :class="['menu-item', item.id == category.id ? 'active' : '']" @click="tapSelected(item)">{{ item.name }}</div>
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
                        <div class="item-view" v-for="(item, index) in category.goods_list" :key="index">
                            <div class="item-img">
                                <a  @click="tapProduct(item)"><img :src="item.thumb" alt=""></a>
                            </div>
                            <div class="item-title">
                                {{item.name}}
                            </div>
                            <div class="item-actions">
                                <span class="item-price">{{ item.price }}</span>
                                
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
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ICategory, IProduct } from '@/api/model';

@Component
export default class Index extends Vue {
    categories: ICategory[] = [];

    category: ICategory | null = null;

    tapSelected(item: ICategory) {
        this.category = item;
    }

    tapSearch(item: ICategory) {
        this.$router.push({name: 'search', query: {category: item.id + ''}});
    }

    tapProduct(item: IProduct) {
        this.$router.push({name: 'product', params: {id: item.id + ''}});
    }
}
</script>
<style lang="scss" scoped>

</style>
