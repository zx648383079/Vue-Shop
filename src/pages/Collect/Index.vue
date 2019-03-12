<template>
    <div>
        <div class="has-header collect-page">
            <div class="swipe-box goods-list">
                <div class="swipe-row" v-for="(item, index) in items" :key="index">
                    <div class="swipe-content goods-item">
                        <div class="goods-img">
                            <img src="<?=$item->goods->thumb?>" alt="">
                        </div>
                        <div class="goods-info">
                            <h4><?=$item->goods->name?></h4>
                            <span><?=$item->goods->price?></span>
                        </div>
                    </div>
                    <div class="actions-right">
                        <i class="fa fa-trash"></i>
                    </div>
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
