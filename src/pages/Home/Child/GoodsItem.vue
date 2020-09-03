<template>
    <div class="item-view">
        <div class="item-img">
            <a @click="tapProduct"><img :src="item.thumb" alt=""></a>
        </div>
        <div class="item-title">
            {{ item.name }}
        </div>
        <div class="item-actions">
            <span class="item-price">{{ item.price | price }}
            </span>
            <span @click="tapAddCart">加入购物车</span>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class GoodsItem extends Vue {
    @Prop(Object) public readonly item!: any;
    public tapProduct() {
        this.$emit('enter', this.item);
    }
    public tapAddCart() {
        this.$emit('addCart', this.item);
    }
}
</script>
<style lang="scss">
.item-actions {
    cursor: pointer;
}
</style>
