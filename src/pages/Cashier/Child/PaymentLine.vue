<template>
    <DialogPanel title="支付方式">
        <div class="line-item payment-box">
            <span>支付方式</span>
            <span>
                {{ value ? value.name : '请选择' }}
            </span>
            <i class="fa fa-chevron-right"></i>
        </div>
        <div class="item-list" slot="panel">
            <a v-for="(item, index) in items" :key="index" :class="{active: value && item.id == value.id}" @click="tapSelected(item)">{{ item.name }}</a>
        </div>
    </DialogPanel>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IPayment } from '@/api/model';
import DialogPanel from '@/components/DialogPanel.vue';

@Component({
    components: {
        DialogPanel,
    },
})
export default class PaymentLine extends Vue {
    @Prop(Object) public readonly value?: IPayment;
    @Prop(Array) public readonly items?: IPayment[];

    public tapSelected(item: IPayment) {
        this.$emit('input', item);
    }
}
</script>
<style lang="scss" scoped>
.payment-box {
    background-color: #fff;
}

.item-list {
    a {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #ccc;
        &.active {
            background-color: rgb(248, 209, 209);
            color: red;
            border-color: red;
        }
    }
}
</style>