<template>
    <div>
        <BackHeader title="结算"/>
        <div class="has-header has-footer checkout-box">
            <AddressLine :address="address" @click="tapAddress"/>

            <PaymentLine v-model="payment" :items="paymentList"/>
            
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
                        <span class="price">{{ goods.price | price }}</span>
                        <span class="amount"> x {{ goods.amount }}</span>
                    </div>
                </div>
                <ShippingLine v-model="shipping" :items="shippingList"/>
                
            </div>

            <InvoiceLine v-model="invoice"/>
            <CouponLine v-model="coupon" :items="couponList"/>
            

            <div class="checkout-amount" v-if="order">
                <p class="line-item"><span>商品总价</span> <span data-key="goods_amount">{{ order.goods_amount | price }}</span> </p>
                <p class="line-item"><span>+运费</span> <span data-key="shipping_fee">{{ order.shipping_fee | price }}</span> </p>
                <p class="line-item"><span>+支付手续费</span> <span data-key="pay_fee">{{ order.pay_fee | price }}</span> </p>
                <p class="line-item"><span>-优惠</span> <span data-key="discount">{{ order.discount | price }}</span> </p>
                <p class="line-item"><span>订单总价</span> <span data-key="order_amount">{{ order.order_amount | price }}</span> </p>
            </div>

            <div class="address-tip" v-if="address">
                {{ address.region.full_name }} {{ address.address }}
            </div>
            <div class="checkout-footer" v-if="order">
                <span data-key="order_amount">{{ order.order_amount | price }}</span>
                <a @click="tapCheckout" class="btn">立即支付</a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IAddress, ICartGroup, IOrder, IPayment, IShipping, ICartItem, ICoupon } from '@/api/model';
import { dispatchAddress, dispatchSetCart, dispatchSetOrder } from '@/store/dispatches';
import { Getter } from 'vuex-class';
import AddressLine from './Child/AddressLine.vue';
import PaymentLine from './Child/PaymentLine.vue';
import ShippingLine from './Child/ShippingLine.vue';
import InvoiceLine from './Child/InvoiceLine.vue';
import CouponLine from './Child/CouponLine.vue';
import { getPaymentList, previewOrder, getShippingList, checkoutOrder, getCouponList } from '@/api/cart';

interface ICartBox {
    type: number,
    goods: ICartItem[] | number[];
}

@Component({
    components: {
        BackHeader,
        AddressLine,
        PaymentLine,
        ShippingLine,
        CouponLine,
        InvoiceLine,
    },
})
export default class Index extends Vue {
    public address: IAddress | null = null;
    @Getter('addressList') public addressList?: IAddress[];
    @Getter('cart') public cart?: ICartGroup[];
    public order: IOrder| null = null;
    public paymentList: IPayment[] = [];
    public payment: IPayment| null = null;
    public shippingList: IShipping[] = [];
    public couponList: ICoupon[] = [];
    public shipping: IShipping| null = null;
    public cartBox: ICartBox | null = null;
    public invoice = null;
    public coupon = null;

    public created() {
        if (!this.cart || this.cart.length < 1) {
            this.$router.push('/cart');
            return;
        }
        this.cartBox = this.getGoodsIds();
        dispatchAddress().then(res => {
            this.address = res;
        });
        getPaymentList().then(res => {
            if (res.data) {
                this.paymentList = res.data;
            }
        });
        if (!this.cartBox) {
            return;
        }
        getCouponList(this.cartBox.goods, this.cartBox.type).then(res => {
            if (res.data) {
                this.couponList = res.data;
            }
        });
    }

    @Watch('address')
    public onAddressChanged() {
        this.refreshPrice();
        if (!this.address || !this.cartBox) {
            return;
        }
        getShippingList(this.cartBox.goods, this.address.id, this.cartBox.type).then(res => {
            if (res.data) {
                this.shippingList = res.data;
            }
        })
    }

    @Watch('payment')
    public onPaymentChanged() {
        this.refreshPrice();
    }

    @Watch('shipping')
    public onShippingChanged() {
        this.refreshPrice();
    }

    public refreshPrice() {
        if (!this.address || !this.cartBox) {
            return;
        }
        previewOrder(
            this.cartBox.goods, this.address.id,
            this.shipping ? this.shipping.id : 0, this.payment ? this.payment.id : 0, this.cartBox.type).then(res => {
            this.order = res;
        });
    }

    public tapCheckout() {
        if (!this.address || !this.cartBox || !this.shipping || !this.payment) {
            return;
        }
        checkoutOrder(
            this.cartBox.goods, this.address.id,
            this.shipping.id, this.payment.id, this.cartBox.type).then(res => {
            dispatchSetCart([]);
            dispatchSetOrder(res);
            this.$router.replace('/pay/' + res.id);
        });
    }

    public tapAddress() {
        if (!this.addressList || this.addressList.length < 1) {
            this.$router.push({path: '/address/create', query: {back: '1'}});
            return;
        }
        this.$router.push({name: 'address', query: {selected: (this.address ? this.address.id + '' : '0')}});
    }



    public getGoodsIds(): ICartBox {
        if (!this.cart) {
            return {type: 0, goods: []};
        }
        const goods: ICartItem[] = [];
        const cart: number[]  = [];
        let type: number = -1;
        for (const group of this.cart) {
            for (const item of group.goods_list) {
                if (type === -1) {
                    type = item.id && item.id > 0 ? 0 : 1;
                }
                if (type > 0) {
                    goods.push({
                        goods_id: item.goods_id,
                        amount: item.amount,
                    });
                    continue;
                }
                cart.push(item.id as number);
            }
        }
        return type > 0 ? {type, goods} : {type, goods: cart};
    }
}
</script>
<style lang="scss" scoped>
.address-tip {
    background-color: bisque;
    color: red;
    line-height: 30px;
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    z-index: 97;
}
.has-footer {
    margin-bottom: 5.625rem;
}
</style>
