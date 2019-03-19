<template>
    <div>
        <BackHeader title="结算"/>
        <div class="has-header has-footer checkout-box">
                <AddressLine :address="address" @click="tapAddress"/>

                <PaymentLine v-model="payment" :items="payment_list"/>
                
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
                    <ShippingLine v-model="shipping" :items="shipping_list"/>
                    
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
import { IAddress, ICart, IOrder, IPayment, IShipping } from '@/api/model';
import { dispatchAddress } from '@/store/dispatches';
import { Getter } from 'vuex-class';
import AddressLine from './Child/AddressLine.vue';
import PaymentLine from './Child/PaymentLine.vue';
import ShippingLine from './Child/ShippingLine.vue';
import { getPaymentList } from '@/api/cart';

@Component({
    components: {
        BackHeader,
        AddressLine,
        PaymentLine,
        ShippingLine,
    }
})
export default class Index extends Vue {
    address: IAddress | null = null;
    @Getter('cart') cart?: ICart[];
    order: IOrder| null = null;
    payment_list: IPayment[] = [];
    payment: IPayment| null = null;
    shipping_list: IShipping[] = [];
    shipping: IShipping| null = null;

    created() {
        if (!this.cart || this.cart.length < 1) {
            this.$router.push('/cart');
            return;
        }
        dispatchAddress().then(res => {
            this.address = res;
        });
        getPaymentList().then(res => {
            if (res.data) {
                this.payment_list = res.data;
            }
        });
    }

    tapAddress() {

    }
}
</script>
<style lang="scss" scoped>

</style>
