<template>
    <div>
        <BackHeader title="我的订单"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                <a v-for="(item, index) in statusList" :key="index" @click="tapStatus(item)" :class="status == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="order-box">
                <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                    <OrderItem v-for="(item, index) in items" :key="index" :item="item" @receive="tapReceive(item)" @cancel="tapCancel(item)"/>
                    <div class="order-empty" v-if="!items || items.length < 1">
                        您还没有订单
                    </div>
                </PullToRefresh>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { ORDER_STATUS, IOrder } from '@/api/model';
import { getOrder, receiveOrder, cancelOrder } from '@/api/order';
import OrderItem from './Child/OrderItem.vue';
import ConfirmBox from '@/components/confirm.ts';

@Component({
    components: {
        BackHeader,
        OrderItem,
        PullToRefresh,
    },
})
export default class Index extends Vue {
    public statusList = [
        {
            name: '全部',
            status: 0,
        },
        {
            name: '待支付',
            status: ORDER_STATUS.UN_PAY,
        },
        {
            name: '待收货',
            status: ORDER_STATUS.SHIPPED,
        },
        {
            name: '已完成',
            status: ORDER_STATUS.FINISH,
        },
        {
            name: '已取消',
            status: ORDER_STATUS.CANCEL,
        },
    ];
    public items: IOrder[] = [];
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
        getOrder({
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

    public tapReceive(item: IOrder) {
        ConfirmBox('确认取消此订单？').then(action => {
            if (action !== 'confirm') {
                return;
            }
            receiveOrder(item.id).then(res => {
                this.refreshItem(res);
            });
        });
    }

    public refreshItem(item: IOrder) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id !== item.id) {
                continue;
            }
            if (this.status > 0 && item.status !== this.status) {
                this.items.splice(i, 1);
                break;
            }
            this.items[i] = item;
            break;
        }
        this.$forceUpdate();
    }

    public tapCancel(item: IOrder) {
        ConfirmBox('确认取消此订单？').then(action => {
            if (action !== 'cancel') {
                return;
            }
            cancelOrder(item.id).then(res => {
                this.refreshItem(res);
            })
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
