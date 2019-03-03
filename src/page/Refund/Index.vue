<template>
    <div>
        <div class="has-header">
            <div class="tab-bar order-header">
                <a href="" class="active">售后申请</a>
                <a href="">处理中</a>
                <a href="">记录</a>
            </div>

            <div class="order-box">
                <?php foreach($goods_list as $goods):?>
                <div class="goods-item">
                    <div class="goods-img">
                        <img src="<?=$goods->thumb?>" alt="">
                    </div>
                    <div class="goods-info">
                        <h4><?=$goods->name?></h4>
                        <span class="amount"> x <?=$goods->number?></span>
                        <a href="">申请售后</a>
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
