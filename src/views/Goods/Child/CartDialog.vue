<template>
    <div class="cart-dialog" v-if="mode > 0" @click="tapClose">
        <div class="dialog-body" @click.stop>
            <div class="dialog-header">
                <img :src="product.thumb" alt="">
                <p class="price">{{ product.price }}</p>
                <p class="stock">库存：{{ product.stock }}</p>
                <p class="selected-property"></p>
                <i class="iconfont fa-times dialog-close" @click="tapClose"></i>
            </div>
            <div class="property-box">
                <div v-for="(item, index) in product.properties" :key="index" :class="['group', item.type == 2 ? ' multi-group' : '']">
                    <div class="group-header">{{ item.name }}</div>
                    <div class="group-body">
                        <span v-for="(attr, i) in item.attr_items" :key="i">{{ attr.value }}</span>
                    </div>
                </div>

                <div class="count-box">
                    <span>数量</span>
                    <div class="number-box">
                        <i class="iconfont fa-minus" @click="tapMinus"></i>
                        <input type="text" class="number-input" v-model="amount" @change="tapChangeAmount">
                        <i class="iconfont fa-plus" @click="tapPlus"></i>
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <a @click="tapDoCart" class="dailog-yes">确认</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IProduct, ICartGroup } from '@/api/model';
import { addGoods } from '@/api/cart';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useShopStore } from '../../../stores/shop';
import { useDialog } from '../../../components/Dialog/plugin';

const router = useRouter();
const toast = useDialog();
const shopStore = useShopStore();
const emit = defineEmits(['close']);
const props = withDefaults(
    defineProps<{
        product: IProduct,
        mode: number
    }>(),
    {
        mode: 0
    }
);
const amount = ref(1);

function tapClose() {
    emit('close');
}

function getStock(): number {
    if (!props.product) {
        return 1;
    }
    return props.product.stock as number;
}

function tapMinus() {
    amount.value = Math.max(amount.value - 1, 1);
}

function tapChangeAmount() {
    if (amount.value < 1) {
        amount.value = 1;
        return;
    }
    const stock = getStock();
    if (amount.value > stock) {
        amount.value = stock;
    }
}

function tapPlus() {
    amount.value = Math.min(amount.value + 1, getStock());
}

function tapDoCart() {
    if (!props.product) {
        return;
    }
    if (props.mode === 1) {
        addGoods(props.product.id, amount.value).then(() => {
            toast.warning('已成功加入购物车');
            tapClose();
        });
        return;
    }
    const data: ICartGroup[] = [
        {
            name: props.product.shop + '',
            goods_list: [
                {
                    goods_id: props.product.id,
                    amount: amount.value,
                    goods: props.product,
                    price: props.product.price,
                },
            ],
        },
    ];
    shopStore.setCart(data).then(() => {
        router.push('/cashier');
    });
}
</script>
<style lang="scss" scoped>

</style>
