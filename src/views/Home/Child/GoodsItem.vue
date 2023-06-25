<template>
    <div class="item-view">
        <div class="item-img">
            <a @click="tapProduct"><img :src="props.item.thumb" alt=""></a>
        </div>
        <div class="item-title">
            {{ props.item.name }}
        </div>
        <div class="item-actions">
            <span class="item-price">{{ props.item.price }}
            </span>
            <span @click="tapAddCart">加入购物车</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IProduct } from '../../../api/model';

const emit = defineEmits(['enter', 'addCart']);
const props = defineProps<{
    item: IProduct,
}>();

function tapProduct() {
    emit('enter', props.item);
}
function tapAddCart() {
    emit('addCart', props.item);
}
</script>
<style lang="scss">
.item-actions {
    cursor: pointer;
}
</style>
