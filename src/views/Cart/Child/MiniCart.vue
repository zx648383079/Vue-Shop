<template>
    <div class="cart-mini" v-if="cart">
        <div class="popup-cell" v-for="(item, index) in cart.promotion_cell" :key="index">
            {{ item.popup_tip }}
            <a v-if="item.link">{{ item.link.text }}&gt;</a>
        </div>
        <div class="goods-box" v-show="queries.expanded">
            <div class="header">
                已选商品
                <span class="right">
                    <i class="iconfont icon-trash"></i>
                    清空
                </span>
            </div>
            <div class="group-item" v-for="(group, j) in cart.data" :key="j">
                <div class="item" v-for="(item, index) in group.goods_list" :key="index">
                    <div class="name">{{ item.goods?.name }}</div>
                    <div class="item-price">{{ item.price }}</div>
                    <div class="item-actions">
                        <i class="iconfont icon-minus-circle" v-if="item.amount && item.amount > 0"  @click="tapMinus(item)"></i>
                        <span v-if="item.amount && item.amount > 0">{{ item.amount }}</span>
                        <i class="iconfont icon-plus-circle" @click="tapPlus(item)"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-footer">
            <div class="icon" @click="tapExpand">
                <i class="iconfont icon-cart"></i>
                <span class="amount-tip" v-if="queries.amount > 0">{{ cartAmount }}</span>
            </div>
            <div class="subtotal">
                <div class="item-price">{{ cart.data.length > 0 ? cart.subtotal.total : '未选购商品' }}</div>
                <p>另需配送费</p>
            </div>
            <div class="checkout">
                {{ cart.checkout_button?.text }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ICart, ICartItem } from '@/api/model';
import { getCart } from '@/api/cart';
import { computed, reactive, ref } from 'vue';

const cart = ref<ICart|null>(null);
const queries = reactive({
    amount: 100,
    expanded: false
});

const cartAmount = computed(() => {
    if (queries.amount > 99) {
        return '99+';
    }
    return queries.amount.toString();
});
function tapPlus(item: ICartItem) {
    if (!item.amount) {
        item.amount = 0;
    }
    item.amount ++;
}

function tapMinus(item: ICartItem) {
    if (!item.amount) {
        item.amount = 0;
    }
    item.amount = Math.max(0, item.amount - 1);
}

function tapExpand() {
    if (!cart.value || cart.value.data.length < 1) {
        return;
    }
    queries.expanded = !queries.expanded;
}

getCart().then(res => {
    cart.value = res;
});

</script>
<style lang="scss" scoped>
.cart-mini {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .popup-cell {
        background-color: rgba($color: #e9f16c, $alpha: .7);
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        a {
            color: red;
        }
    }
    .goods-box {
        background-color: #ccc;
        .header {
            line-height: 40px;
            height: 40px;
            .right {
                float: right;
                font-size: 12px;
                color: #333;
            }
        }
        .group-item {
            background-color: #fff;
        }
        .item {
            display: grid;
            grid-template-columns: 1fr 40px 80px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
            .name {
                word-break: keep-all;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .price {
                color: red;
            }
            .item-actions {
                text-align: center;
                span {
                    display: inline-block;
                    padding: 0 5px;
                }
                .icon-minus-circle {
                    color: #777;
                }
            }
        }
    }
    .mini-footer {
        display: grid;
        grid-template-columns: 60px 1fr 80px;
        background-color: rgba($color: #333, $alpha: .9);
        color: #fff;
        height: 50px;
        .icon {
            position: relative;
            font-size: 30px;
            text-align: center;
            line-height: 50px;
            .amount-tip {
                font-size: 12px;
                position: absolute;
                top: -2px;
                right: 0px;
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
        .subtotal {
            padding: 5px 0;
            p {
                font-size: 12px;
                color: #ccc;
            }
        }
        .checkout {
            background-color: #1dc267;
            line-height: 50px;
            text-align: center;
        }
    }
}
</style>