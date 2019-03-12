<template>
    <div>
        <div class="has-header">
            <div class="tab-bar order-header">
                <?php foreach($status_list as $key => $item):?>
                <a href="<?=$this->url('./mobile/comment', ['status' => $key])?>" <?=$status == $key ? 'class="active"': ''?>><?=$item?></a>
                <?php endforeach;?>
            </div>

            <div class="comment-list-box">
                <div class="goods-list">
                    <?php foreach($goods_list as $goods):?>
                    <div class="goods-item">
                        <div class="goods-img">
                            <img src="<?=$goods->thumb?>" alt="">
                        </div>
                        <div class="goods-info">
                            <h4><?=$goods->name?></h4>
                            <?php if($goods->comment_id < 1):?>
                            <a href="<?=$this->url('./mobile/comment/create', ['goods' => $goods->id])?>" class="comment-btn">评价</a>
                            <?php endif;?>
                        </div>
                    </div>
                    <?php endforeach;?>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Index extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
