<template>
    <DialogPanel title="优惠券" ref="dialog">
        <div class="line-item inovice-box">
            <span>优惠券</span>
            <span>
                {{ value ? value.name : (!items || items.length < 1 ? '无可用' : '请选择') }}
            </span>
            <i class="fa fa-chevron-right"></i>
        </div>
        <div slot="panel" class="coupon-body">
            <div class="my-coupon-item" v-for="(item, index) in items" :key="index" @click="tapSelected(item)">
                <div class="price">
                    <em>{{ item.money | price }}</em>
                </div>
                <div class="info">
                    <p>{{ item.name }}</p>
                    <div class="time">
                        <span>{{ item.start_at | time }}-{{ item.end_at | time}}</span>
                    </div>
                    <i :class="['fa', 'check-box', value && item.id == value.id ? 'active' : '']"></i>
                </div>
            </div>
        </div>
        <div slot="footer">
            <button @click="tapHide">确定</button>
        </div>
    </DialogPanel>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ICoupon } from '@/api/model';
import DialogPanel from '@/components/DialogPanel.vue';

@Component({
    components: {
        DialogPanel,
    },
})
export default class CouponLine extends Vue {
    @Prop(Object) public readonly value!: ICoupon;
    @Prop(Array) public readonly items!: ICoupon[];
    public hide: boolean = true;

    public tapSelected(item: ICoupon) {
        this.$emit('input', item);
    }

    public tapHide() {
        (this.$refs.dialog as DialogPanel).hideCalerdar();
    }
}
</script>
<style lang="scss" scoped>
.payment-box {
    background-color: #fff;
}

.my-coupon-item {
    .check-box {
        position: absolute;
        right: 10px;
    }
}
.coupon-body {
    max-height: 45vh;
}
</style>