<template>
    <div class="goods-item">
        <div class="goods-img">
            <img :src="item.thumb" alt="">
        </div>
        <div class="goods-info">
            <h4>{{ item.name }}</h4>
            <a v-if="!item.comment_id || item.comment_id < 1" @click="tapComment" class="comment-btn">评价</a>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit } from 'vue-property-decorator';
import { IOrderGoods } from '@/api/model';

export default class GoodsItem extends Vue {
    @Prop(Object) public readonly item!: IOrderGoods;

    @Emit('comment')
    public tapComment() {
        // 
    }
}
</script>
<style lang="scss" scoped>

</style>
