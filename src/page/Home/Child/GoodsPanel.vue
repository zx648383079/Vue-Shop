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
<script>
import GoodsItem from "./GoodsItem";
export default {
    components: {
        GoodsItem
    },
    props: {
        title: String,
        items: Array
    },
    methods: {
        tapProduct(item) {
            this.$emit('enter', item);
        },
        tapAddCart(item) {
            this.$emit('addCart', item);
        }
    }
}
</script>
