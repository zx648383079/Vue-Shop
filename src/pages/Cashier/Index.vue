<template>
    <div>
        <BackHeader title="结算"/>
        <div class="has-header has-footer checkout-box">
                <AddressItem :address="address" @click="tapAddress"/>

                <div class="line-item payment-box">
                    <span>支付方式</span>
                    <span>
                        请选择
                    </span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                
                <div class="goods-list" v-for="(item, index) in cart" :key="index">
                    <div class="group-header">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="goods-item" v-for="(goods, i) in item.goods_list" :key="i">
                        <div class="goods-img">
                            <img :src="goods.goods.thumb" alt="">
                        </div>
                        <div class="goods-info">
                            <h4>{{ goods.goods.name }}</h4>
                            <span class="price">{{ goods.price }}</span>
                            <span class="amount"> x {{ goods.amount }}</span>
                        </div>
                    </div>
                    <div class="line-item shipping-box">
                        <span>配送方式</span>
                        <span>
                            请选择
                        </span>
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>
                

                <div class="checkout-amount" v-if="order">
                    <p class="line-item"><span>商品总价</span> <span data-key="goods_amount">{{ order.goods_amount }}</span> </p>
                    <p class="line-item"><span>+运费</span> <span data-key="shipping_fee">{{ order.shipping_fee }}</span> </p>
                    <p class="line-item"><span>+支付手续费</span> <span data-key="pay_fee">{{ order.pay_fee }}</span> </p>
                    <p class="line-item"><span>-优惠</span> <span data-key="discount">{{ order.discount }}</span> </p>
                    <p class="line-item"><span>订单总价</span> <span data-key="order_amount">{{ order.order_amount }}</span> </p>
                </div>
                <div class="checkout-footer" v-if="order">
                    <span data-key="order_amount">{{ order.order_amount }}</span>
                    <a class="btn">立即支付</a>
                </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IAddress, ICart, IOrder } from '@/api/model';
import { dispatchAddress } from '@/store/dispatches';
import { Getter } from 'vuex-class';
import AddressItem from './Child/Address.vue';

@Component({
    components: {
        BackHeader,
        AddressItem,
    }
})
export default class Index extends Vue {
    address: IAddress | null = null;
    @Getter('cart') cart?: ICart[];
    order: IOrder| null = null;

    created() {
        if (!this.cart || this.cart.length < 1) {
            this.$router.push('/cart');
            return;
        }
        dispatchAddress().then(res => {
            this.address = res;
        });
    }

    tapAddress() {

    }
}
</script>
<style lang="scss" scoped>

</style>
