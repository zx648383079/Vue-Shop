<template>
    <div>
        <div class="has-header">
            <div class="tab-bar order-header">
                <?php foreach($status_list as $key => $item):?>
                <a href="<?=$this->url('./mobile/order', ['status' => $key])?>" <?=$status == $key ? 'class="active"': ''?>><?=$item?></a>
                <?php endforeach;?>
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
<script>
export default {
    data() {
        return {
            items: [

            ]
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>

</style>
