<template>
    <div>
        <BackHeader title="我的订单"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                <a v-for="(item, index) in status_list" :key="index" @click="tapStatus(item)" :class="status == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="order-box">
                <PullToRefresh :loading="is_loading" :more="has_more" @refresh="tapRefresh" @more="tapMore">
                    <OrderItem v-for="(item, index) in items" :key="index" :item="item"/>
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
import { getOrder } from '@/api/order';
import OrderItem from './Child/OrderItem.vue';

@Component({
    components: {
        BackHeader,
        OrderItem,
        PullToRefresh,
    }
})
export default class Index extends Vue {
    status_list = [
        {
            name: '全部',
            status: 0
        },
        {
            name: '待支付',
            status: ORDER_STATUS.UN_PAY
        },
        {
            name: '待收货',
            status: ORDER_STATUS.SHIPPED
        },
        {
            name: '已完成',
            status: ORDER_STATUS.FINISH
        },
        {
            name: '已取消',
            status: ORDER_STATUS.CANCEL
        },
    ];
    items: IOrder[] = [];
    status = 0;
    has_more = true;
    page = 1;
    is_loading = false;

    created() {
        if (this.$route.query && this.$route.query.status) {
            this.status = parseInt(this.$route.query.status + '') || 0;
        }
        this.tapRefresh();
    }

    public tapRefresh() {
        this.goPage(1);
    }

    public tapMore() {
        if (!this.has_more) {
            return;
        }  
        this.goPage(this.page + 1);
    }

    public goPage(page: number) {
        if (this.is_loading) {
            return;
        }
        this.is_loading = true;
        getOrder({
            status: this.status,
            page,
        }).then(res => {
            this.has_more = res.paging.more;
            this.is_loading = false;
            if (this.page < 2) {
                this.items = res.data as never[];
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }

    public tapStatus(item: any) {
        if (this.status == item.status) {
            return;
        }
        this.status = item.status;
        this.tapRefresh();
    }
}
</script>
<style lang="scss" scoped>

</style>
