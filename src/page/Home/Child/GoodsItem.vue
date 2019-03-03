<template>
    <div class="item-view">
        <div class="item-img">
            <a @click="tapProduct"><img :src="item.thumb" alt=""></a>
        </div>
        <div class="item-title">
            {{ item.name }}
        </div>
        <div class="item-actions">
            <span class="item-price">{{ item.price }}
            </span>
            <span @click="tapAddCart">加入购物车</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    methods: {
        tapProduct() {
            this.$emit('enter', this.item);
        },
        tapAddCart() {
            this.$emit('addCart', this.item);
        }
    }
}
</script>
