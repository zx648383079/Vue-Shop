<template>
    <div>
        <div class="has-header">
            <div class="cart-box">
                <?php foreach($cart as $group):?>
                <div class="cart-group-item">
                    <div class="group-header">
                        <i class="fa check-box"></i>
                        <span><?=$group->getName()?></span>
                    </div>
                    <div class="swipe-box goods-list">
                        <?php foreach($group as $item):?>
                        <div class="swipe-row cart-item" data-id="<?=$item->id?>">
                            <div class="swipe-content goods-item">
                                <i class="fa check-box"></i>
                                <div class="goods-img">
                                    <img src="<?=$item->goods->thumb?>" alt="">
                                </div>
                                <div class="goods-info">
                                    <h4><?=$item->goods->name?></h4>
                                    <span><?=$item->price?></span>
                                    <div class="number-box">
                                        <i class="fa fa-minus"></i>
                                        <input type="text" name="" value="<?=$item->number?>" min="1">
                                        <i class="fa fa-plus"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="actions-right">
                                <i class="fa fa-trash"></i>
                            </div>
                        </div>
                        <?php endforeach;?>
                    </div>
                </div>
                <?php endforeach;?>
            </div>
            <div class="cart-footer">
                <i class="fa check-box"></i>
                <span>全选</span>

                <div class="cart-amount">
                    <span><?=$cart->total()?></span>
                    <a href="<?=$this->url('./mobile/cashier')?>" class="btn">结算</a>
                </div>
            </div>

            <div class="empty-cart-box" v-if="!items || items.length < 1">
                <?php if(auth()->guest()):?>
                <p>登录后可同步购物车中商品</p>
                <a href="<?=$this->url('./mobile/member/login')?>" class="btn">登录</a>
                <?php else:?>
                <p>购物车时空的</p>
                <a href="<?=$this->url('./mobile')?>" class="btn">去逛逛</a>
                <?php endif;?>
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
