<template>
    <div>
        <div class="home-panel" v-if="items && items.length > 0">
            <div class="panel-header">{{ title }}</div>
            <div class="goods-list">
                <GoodsItem v-for="(item, index) in items" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import GoodsItem from "./GoodsItem.vue";
import { IProduct } from '@/api/model';
export default Vue.extend({
    components: {
        GoodsItem,
    },
    props: {
        title: String,
        items: Array,
    },
    methods: {
        tapProduct(item: IProduct) {
            this.$emit('enter', item);
        },
        tapAddCart(item: IProduct) {
            this.$emit('addCart', item);
        },
    },
});
</script>
