<template>
    <div>
        <div class="store-page">
            <header class="store-header">
                <div class="search-back-box">
                    <a class="back" @click="tapBack">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a class="search-entry" @click="$router.push('/search')">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <span>搜索本店商品</span>
                    </a>
                </div>
                <div class="store-info">
                    <div class="logo">
                        <img :src="'/assets/images/avatar/1.png' | assets" alt="">
                    </div>
                    <div class="info">
                        <div class="name">12345545</div>
                        <p>233万人收藏</p>
                    </div>
                    <div class="action">
                        <a href="">
                            <i class="fa fa-star"></i>    
                            收藏
                        </a>
                    </div>
                </div>
                <div class="tab-bar">
                    <a v-for="(item, index) in tabList" :key="index" @click="tapTab(index)" :class="tabIndex == index ? 'active' : ''">{{ item.name }}</a>
                </div>
            </header>

            <div class="store-body">
                <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <div class="item" v-for="(item, index) in items" :key="index">
                            <div class="item-img">
                                <a ><img :src="item.thumb" alt=""></a>
                            </div>
                            <div class="item-info">
                                <div class="item-title">{{item.name}}</div>
                                <span class="item-price">{{item.price}}</span>
                                <div class="item-actions">
                                    <i class="fa fa-minus-circle" v-if="item.amount && item.amount > 0"  @click="tapMinus(item)"></i>
                                    <span v-if="item.amount && item.amount > 0">{{ item.amount }}</span>
                                    <i class="fa fa-plus-circle" @click="tapPlus(item)"></i>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        </div>
        <MiniCart/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IProduct } from '@/api/model';
import { getList } from '@/api/product';
import PullToRefresh from '@/components/PullToRefresh.vue';
import MiniCart from '@/pages/Cart/Child/MiniCart.vue';

@Component({
    components: {
        PullToRefresh,
        MiniCart,
    },
})
export default class Quick extends Vue {
    public items: IProduct[] = [];
    public hasMore = true;
    public isLoading = false;
    public page = 1;
    public tabIndex = 0;
    public tabList = [
        {
            name: '首页',
            status: 0,
        },
        {
            name: '全部商品',
            status: 0,
        },
        {
            name: '促销',
            status: 0,
        },
        {
            name: '动态',
            status: 0,
        },
    ];

    public created() {
        this.tapRefresh();
    }

    public tapBack() {
        if (window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }

    public tapTab(index: number) {
        this.tabIndex = index;
    }

    /**
     * tapPlus
     */
    public tapPlus(item: IProduct) {
        if (!item.amount) {
            item.amount = 0;
        }
        item.amount ++;
    }

    public tapMinus(item: IProduct) {
        if (!item.amount) {
            item.amount = 0;
        }
        item.amount = Math.max(0, item.amount - 1);
    }

    public tapRefresh() {
        this.goPage(1);
    }

    public tapMore() {
        if (!this.hasMore) {
            return;
        }
        this.goPage(this.page + 1);
    }

    public goPage(page: number) {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        getList({
            page,
        }).then(res => {
            this.page = page;
            this.hasMore = res.paging.more;
            this.isLoading = false;
            if (page < 2) {
                this.items = [];
            }
            res.data.forEach(item => {
                item.amount = 0;
                this.items.push(item);
            });
        });
    }
}
</script>
<style lang="scss" scoped>
.tab-bar {
    border-bottom: 1px solid #ccc;
}
.goods-list {
    display: block;
    text-align: left;
    .item {
        position: relative;
        display: grid;
        background-color: #fff;
        grid-template-columns: 100px 1fr;
        .item-img {
            height: 100px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .item-price {
            color: red;
        }
        .item-actions {
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: inline-block;
            span {
                display: inline-block;
                padding: 0 5px;
            }
            .fa-minus-circle {
                color: #777;
            }
        }
    }
}
</style>
