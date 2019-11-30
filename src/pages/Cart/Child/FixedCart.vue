<template>
    <div class="cart-fixed">
        <i class="fa fa-shopping-cart"></i>
        <span class="amount-tip" v-if="amount > 0">{{ cartAmount }}</span>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class FixedCart extends Vue {
    public amount: number = 100;

    public get cartAmount(): string {
        if (this.amount > 99) {
            return '99+';
        }
        return this.amount.toString();
    }
}
</script>
<style lang="scss" scoped>
.cart-fixed {
    position: fixed;
    bottom: 30px;
    right: 30px;
    font-size: 30px;
    z-index: 88;
    .amount-tip {
        font-size: 12px;
        position: absolute;
        top: -3px;
        left: -3px;
        color: #fff;
        background-color: red;
        border-radius: 50%;
        display: block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
    }
}
</style>