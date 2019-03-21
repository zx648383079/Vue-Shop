<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header collect-page" 
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="is_loading"
                infinite-scroll-distance="10">
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
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IProduct, ICollect } from '@/api/model';
import { getCollect, removeCollect } from '@/api/user';
import { InfiniteScroll } from 'mint-ui';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';

Vue.use(InfiniteScroll);

@Component({
    components: {
        BackHeader,
        SwipeRow,
    },
})
export default class Index extends Vue {
    public items: ICollect[] = [];

    public has_more = true;
    public page = 1;
    public is_loading = false;


    get filterItems(): ICollect[] {
        return this.items.filter(item => {
            return !!item.goods;
        });
    }

    public created() {
        this.refresh();
    }

    public tapRemove(item: ICollect, index: number) {
        removeCollect(item.goods_id).then(res => {
            if (!res.data) {
                this.items.splice(index, 1);
            }
        });
    }

    public loadMore() {
        this.goPage( ++ this.page);
    }

    /**
     * refresh
     */
    public refresh() {
        this.items = [];
        this.is_loading = false;
        this.has_more = true;
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.is_loading || !this.has_more) {
            return;
        }
        this.is_loading = true;
        getCollect({
            page,
        }).then(res => {
            this.has_more = res.paging.more;
            this.is_loading = false;
            if (!res.data) {
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
