<template>
    <div>
        <header class="top">
            <a class="search-entry" @click="$router.push('/search')">
                <i class="fa fa-search"></i>
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
        <TabBar/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ICategory, IProduct, ISubtotal } from '@/api/model';
import { getCategories, getCategory } from '@/api/category';
import TabBar from '@/components/TabBar.vue';
import { dispatchSubtotal, dispatchCategories } from '@/store/dispatches';

@Component({
    components: {
        TabBar,
    },
})
export default class Index extends Vue {
    public categories: ICategory[] = [];

    public category: ICategory | null = null;

    public subtotal: ISubtotal | null = null;

    public created() {
        dispatchCategories().then(res => {
            if (!res) {
                return;
            }
            this.categories = res;
            this.tapSelected(res[0], 0);
        });
        dispatchSubtotal().then(res => {
            this.subtotal = res;
        });
    }

    public tapSelected(item: ICategory, index: number) {
        if (item.goods_list) {
            this.category = item;
            return;
        }
        getCategory(item.id, 'goods_list,children').then(res => {
            this.categories[index] = this.category = res;
        });
    }

    public tapSearch(item: ICategory) {
        this.$router.push({name: 'search', query: {category: item.id + ''}});
    }

    public tapProduct(item: IProduct) {
        this.$router.push({name: 'product', params: {id: item.id + ''}});
    }
}
</script>
<style lang="scss" scoped>

</style>
