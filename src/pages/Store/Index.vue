<template>
    <div>
        <div class="store-page">
            <header class="store-header">
                <div class="search-back-box">
                    <a class="back" @click="tapBack">
                        <i class="iconfont fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a class="search-entry" @click="$router.push('/search')">
                        <i class="iconfont fa-search" aria-hidden="true"></i>
                        <span>搜索本店商品</span>
                    </a>
                </div>
                <div class="store-info">
                    <div class="logo">
                        <img :src="logo" alt="">
                    </div>
                    <div class="info">
                        <div class="name">12345545</div>
                        <p>233万人收藏</p>
                    </div>
                    <div class="action">
                        <a href="">
                            <i class="iconfont fa-star"></i>    
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
                        <div class="item-view" v-for="(item, index) in items" :key="index">
                            <div class="item-img">
                                <a ><img :src="item.thumb" alt=""></a>
                            </div>
                            <div class="item-title">
                                {{item.name}}
                            </div>
                            <div class="item-actions">
                                <span class="item-price">{{item.price}}</span>
                                <span>加入购物车</span>
                            </div>
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import { IProduct } from '@/api/model';
import { getList } from '@/api/product';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { assetsFilter } from '../../pipes';

@Options({
    components: {
        PullToRefresh,
    },
})
export default class Index extends Vue {
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

    public get logo() {
        return assetsFilter('/assets/images/avatar/1.png');
    }

    public created() {
        this.tapRefresh();
    }

    public tapBack() {
        if (!window || window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }

    public tapTab(index: number) {
        this.tabIndex = index;
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
                this.items = res.data;
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
