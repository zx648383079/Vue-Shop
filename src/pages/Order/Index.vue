<template>
    <div>
        <BackHeader title="我的订单"/>
        <div class="has-header">
            <div class="tab-bar order-header">
                <a v-for="(item, index) in status_list" :key="index" @click="tapStatus(item)" :class="status == item.status ? 'active' : ''">{{ item.name }}</a>
            </div>

            <div class="order-box">
                <?php foreach($order_list as $order):?>
                <div class="order-item">
                    <div class="order-header">
                        <span><?=$order->series_number?></span>
                        <span class="status"><?=$order->status_label?></span>
                    </div>
                    <div class="goods-list">
                        <?php foreach($order->goods as $goods):?>
                        <div class="goods-item">
                            <div class="goods-img">
                                <img src="<?=$goods->thumb?>" alt="">
                            </div>
                            <div class="goods-info">
                                <h4><?=$goods->name?></h4>
                                <span class="price"><?=$goods->price?></span>
                                <span class="amount"> x <?=$goods->number?></span>
                            </div>
                        </div>
                        <?php endforeach;?>
                    </div>
                    <div class="order-amount">
                        共 <?=count($order->goods)?> 件 合计：<?=$order->goods_amount?>
                    </div>
                    <div class="order-footer">
                        <div class="order-actions">
                            <?php if($order->status == OrderModel::STATUS_UN_PAY):?>
                            <a href="<?=$this->url('./mobile/cashier/pay', ['id' => $order->id])?>">支付</a>
                            <?php endif;?>
                            <a href="<?=$this->url('./mobile/order/detail', ['id' => $order->id])?>">详情</a>
                            <?php if($order->status == OrderModel::STATUS_SHIPPED):?>
                            <a data-type="del" data-tip="确认收货？" href="<?=$this->url('./mobile/order/receive', ['id' => $order->id])?>">确认收货</a>
                            <?php endif;?>
                            <?php if($order->status == OrderModel::STATUS_RECEIVED):?>
                            <a href="<?=$this->url('./mobile/comment')?>">评价</a>
                            <?php endif;?>
                            <?php if(in_array($order->status, [OrderModel::STATUS_SHIPPED, OrderModel::STATUS_RECEIVED])):?>
                            <a href="">退换货</a>
                            <?php endif;?>
                            <?php if(in_array($order->status, [OrderModel::STATUS_FINISH])):?>
                            <a href="">售后</a>
                            <?php endif;?>
                            <?php if(in_array($order->status, [OrderModel::STATUS_UN_PAY, OrderModel::STATUS_PAID_UN_SHIP])):?>
                            <a data-type="del" data-tip="确认取消此订单？" href="<?=$this->url('./mobile/order/cancel', ['id' => $order->id])?>">取消</a>
                            <?php endif;?>
                        </div>
                    </div>
                </div>
                <?php endforeach;?>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { ORDER_STATUS } from '@/api/model';

@Component({
    components: {
        BackHeader
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
    ORDER_STATUS = ORDER_STATUS;
    items = [];
    status = 0;

    created() {
        if (this.$route.query && this.$route.query.status) {
            this.status = parseInt(this.$route.query.status + '') || 0;
        }   
    }

    tapStatus(item: any) {
        this.status = item.status;
    }
}
</script>
<style lang="scss" scoped>

</style>
