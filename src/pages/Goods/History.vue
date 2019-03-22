<template>
    <div>
        <BackHeader :title="$route.meta.title">
            <a v-if="items && items.length > 0" class="right" @click="tapClear">
                <i class="fa fa-trash-alt"></i>
            </a>
        </BackHeader>
        <div class="has-header collect-page">
            <PullToRefresh :loading="is_loading" :more="has_more" @refresh="tapRefresh" @more="tapMore">
                <div class="swipe-box goods-list">
                    <SwipeRow name="goods-item" v-for="(item, index) in items" :key="index" @remove="tapRemove(item)" :index="index" ref="swiperow">
                        <div class="goods-img">
                            <img :src="item.thumb" alt="">
                        </div>
                        <div class="goods-info">
                            <h4>{{item.name}}</h4>
                            <span>{{ item.price }}</span>
                        </div>
                    </SwipeRow>
                </div>
                <div class="order-empty" v-if="!items || items.length < 1">
                    您没有浏览记录
                </div>
            </PullToRefresh>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IProduct, ICollect } from '@/api/model';
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils';
import { SET_GOODS_HISTORY } from '@/store/types';
import { MessageBox } from 'mint-ui';
import { getList } from '@/api/product';

@Component({
    components: {
        BackHeader,
        SwipeRow,
        PullToRefresh,
    },
})
export default class Index extends Vue {
    public items: IProduct[] = [];

    public has_more = true;
    public page = 1;
    public is_loading = false;
    public goodsId: number[] = [];

    public created() {
        this.tapRefresh();
    }

    public tapRemove(item: IProduct) {
        for (let i = 0; i < this.goodsId.length; i++) {
            if (this.goodsId[i] === item.id) {
                this.goodsId.splice(i, 1);
                break;
            }
        }
        setLocalStorage(SET_GOODS_HISTORY, this.goodsId);
    }

    public tapClear() {
        MessageBox.confirm('确认清空浏览记录？').then(action => {
            if (action !== 'confirm') {
                return;
            }
            this.goodsId = [];
            this.items = [];
            this.has_more = false;
            this.is_loading = false;
            removeLocalStorage(SET_GOODS_HISTORY);
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
        this.is_loading = false;
        this.has_more = true;
        this.goodsId = getLocalStorage<number[]>(SET_GOODS_HISTORY, true);
        if (!this.goodsId || this.goodsId.length < 1) {
            this.has_more = false;
            this.is_loading = true;
            setTimeout(() => {
                this.is_loading = false;
            }, 500);
            return;
        }
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.is_loading || !this.has_more) {
            return;
        }
        this.is_loading = true;
        getList({
            id: this.goodsId,
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
.order-empty {
    font-size: 40px;
    color: #ccc;
    text-align: center;
    padding-top: 20vh;
}
</style>
