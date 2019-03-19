<template>
    <div>
        <BackHeader title="支付订单"/>
        <div class="has-header checkout-box" v-if="order">
            <div class="money-header">
                <em>￥</em>
                {{ order.order_amount }}
            </div>
            <div class="checkout-amount">
                <p class="line-item"><span>商品总价</span> <span>{{ order.goods_amount | price }}</span> </p>
                <p class="line-item"><span>运费</span> <span>{{ order.shipping_fee | price }}</span> </p>
                <p class="line-item"><span>订单总价</span> <span>{{ order.order_amount | price }}</span> </p>
            </div>
            <div class="payment-item" v-if="payment" :class="{active: payment.id == order.payment_id}" @click="tapSelected(payment)">
                <div class="icon">
                    <img :src="payment.icon" alt="">
                </div>
                <div class="name">{{ payment.name }}</div>
                <div class="status">
                    <i class="fa"></i>
                </div>
            </div>
            <div v-if="payment_list && payment_list.length > 0">
                <div class="payment-hr">选择其他支付方式</div>
                <div class="payment-list">
                    <div class="payment-item" v-for="(item, index) in payment_list" :key="index"  :class="{active: item.id == order.payment_id}"  @click="tapSelected(item)">
                        <div class="icon">
                            <i class="fab fa-weixin"></i>
                        </div>
                        <div class="name">{{ item.name }}</div>
                        <div class="status">
                            <i class="fa"></i>
                        </div>
                    </div>
                </div>
            </div>
            

            <div class="fixed-footer">
                <button class="btn">立即支付</button> 
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IOrder, ORDER_STATUS, IPayment } from '@/api/model';
import { Toast, MessageBox } from 'mint-ui';
import { dispatchOrder } from '@/store/dispatches';
import { getPaymentList } from '@/api/cart';

@Component({
    components: {
        BackHeader,
    }
})
export default class Pay extends Vue {
    order: IOrder | null = null;
    payment: IPayment | null = null;
    payment_list: IPayment[] = [];

    created() {
        const id = parseInt(this.$route.params.id);
        if (!id) {
            Toast('订单错误');
            this.$router.push('/');
            return;
        }
        dispatchOrder(id).then(res => {
            if (res.status != ORDER_STATUS.UN_PAY) {
                Toast('订单无法支付');
                this.$router.push('/');
                return;
            }
            this.order = res;
            this.refreshPayment();
        });
    }

    public tapSelected(item: IPayment) {
        if (!this.order) {
            return;
        }
        this.order.payment_id = item.id;
    }

    public refreshPayment() {
        getPaymentList().then(res => {
            if (!res.data) {
                return;
            }
            this.payment_list = [];
            for (const item of res.data) {
                if (this.order && item.id == this.order.payment_id) {
                    this.payment = item;
                    continue;
                }
                this.payment_list.push(item);
            }
        });
    }


}
</script>
<style lang="scss" scoped>

</style>
