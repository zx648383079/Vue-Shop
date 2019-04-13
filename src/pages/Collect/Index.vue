<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header collect-page">
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="swipe-box goods-list">
                    <SwipeRow name="goods-item" v-for="(item, index) in filterItems" :key="index" @remove="tapRemove(item, index)" :index="index" ref="swiperow">
                        <div class="goods-img">
                            <img :src="item.goods.thumb" alt="">
                        </div>
                        <div class="goods-info">
                            <h4>{{item.goods.name}}</h4>
                            <span>{{ item.goods.price }}</span>
                        </div>
                    </SwipeRow>
                </div>
                <div class="order-empty" v-if="!filterItems || filterItems.length < 1">
                    您还没有收藏商品
                </div>
            </PullToRefresh>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IProduct, ICollect } from '@/api/model';
import { getCollect, removeCollect } from '@/api/user';
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';

@Component({
    components: {
        BackHeader,
        SwipeRow,
        PullToRefresh,
    },
})
export default class Index extends Vue {
    public items: ICollect[] = [];

    public hasMore = true;
    public page = 1;
    public isLoading = false;


    get filterItems(): ICollect[] {
        return this.items.filter(item => {
            return !!item.goods;
        });
    }

    public created() {
        this.tapRefresh();
    }

    public tapRemove(item: ICollect, index: number) {
        removeCollect(item.goods_id).then(res => {
            if (!res.data) {
                this.items.splice(index, 1);
            }
        });
    }

    public tapMore() {
        this.goPage( ++ this.page);
    }

    /**
     * refresh
     */
    public tapRefresh() {
        this.items = [];
        this.isLoading = false;
        this.hasMore = true;
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.isLoading || !this.hasMore) {
            return;
        }
        this.isLoading = true;
        getCollect({
            page,
        }).then(res => {
            this.hasMore = res.paging.more;
            this.isLoading = false;
            if (!res.data) {
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
</script>
<style lang="scss" scoped>
.order-empty {
    font-size: 40px;
    color: #ccc;
    text-align: center;
    padding-top: 20vh;
}
</style>
