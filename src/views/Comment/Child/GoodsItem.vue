<template>
    <div class="goods-item">
        <div class="goods-img">
            <img :src="props.item.thumb" alt="">
        </div>
        <div class="goods-info">
            <h4>{{ props.item.name }}</h4>
            <a v-if="!props.item.comment_id || props.item.comment_id < 1" @click="tapComment" class="comment-btn">评价</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IOrderGoods } from '@/api/model';

const emit = defineEmits(['comment']);
const props = defineProps<{
    item: IOrderGoods
}>();

function tapComment() {
    emit('comment')
}
</script>
<style lang="scss" scoped>

</style>
