<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                 <a v-for="(item, index) in statusList" :key="index" @click="tapStatus(item)" :class="status == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="order-box">
                <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                    <div class="goods-list">
                        <div class="goods-item" v-for="(item, index) in items" :key="index">
                            <div class="goods-img">
                                <img :src="item.thumb" alt="">
                            </div>
                            <div class="goods-info">
                                <h4>{{ item.name }}</h4>
                                <span class="amount"> x {{ item.amount }}</span>
                                <a class="action" @click="tapApply(item)">申请售后</a>
                            </div>
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import { IOrderGoods } from '@/api/model';
import { getRefundGoodsList } from '@/api/order';

@Component({
    components: {
        BackHeader,
        PullToRefresh,
    },
})
export default class Index extends Vue {
    public statusList = [
        {
            name: '售后申请',
            status: 0,
        },
        {
            name: '处理中',
            status: 1,
        },
        {
            name: '记录',
            status: 2,
        },
    ];
    public items: IOrderGoods[] = [];
    public status = 0;
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        if (this.$route.query && this.$route.query.status) {
            this.status = parseInt(this.$route.query.status + '', 10) || 0;
        }
        this.tapRefresh();
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
        getRefundGoodsList({
            status: this.status,
            page,
        }).then(res => {
            this.hasMore = res.paging.more;
            this.isLoading = false;
            if (this.page < 2) {
                this.items = res.data as never[];
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }

    public tapStatus(item: any) {
        if (this.status === item.status) {
            return;
        }
        this.status = item.status;
        this.tapRefresh();
    }

    /**
     * tapApply
     */
    public tapApply(item: IOrderGoods) {
        this.$router.push({name: 'refund-create', query: {goods: item.id + ''}});
    }
}
</script>
<style lang="scss" scoped>
.order-box {
    .goods-list {
        .goods-item {
            margin-bottom: 10px;
            .goods-info {
                .amount {
                    position: static;
                }
                .action {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    display: block;
                    border: 1px solid red;
                    border-radius: 10px;
                    line-height: 30px;
                    padding: 0 10px;
                    font-size: 16px;
                }
            }
        }
    }
}

</style>
