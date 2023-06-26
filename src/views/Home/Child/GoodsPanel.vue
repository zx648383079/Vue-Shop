<template>
    <div>
        <div class="home-panel" v-if="props.items && props.items.length > 0">
            <div class="panel-header">{{ props.title }}</div>
            <div class="goods-list">
                <GoodsItem v-for="(item, index) in props.items" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import GoodsItem from './GoodsItem.vue';
import type { IProduct } from '@/api/model';

const emit = defineEmits(['enter', 'addCart']);
const props = defineProps<{
    items?: IProduct[],
    title?: string
}>();

function tapProduct(item: IProduct) {
    emit('enter', item);
}
function tapAddCart(item: IProduct) {
    emit('addCart', item);
}
</script>
