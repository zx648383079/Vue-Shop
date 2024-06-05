<template>
    <DialogPanel title="支付方式">
        <div class="line-item payment-box">
            <span>支付方式</span>
            <span>
                {{ model ? model.name : '请选择' }}
            </span>
            <i class="iconfont icon-chevron-right"></i>
        </div>
        <slot name="panel">
            <div class="item-list">
                <a v-for="(item, index) in props.items" :key="index" :class="{active: model && item.id == model.id}" @click="tapSelected(item)">{{ item.name }}</a>
            </div>
        </slot>
    </DialogPanel>
</template>
<script setup lang="ts">
import type { IPayment } from '@/api/model';
import DialogPanel from '@/components/DialogPanel.vue';

const model = defineModel<IPayment>();
const props = defineProps<{
    items: IPayment[]
}>();

function tapSelected(item: IPayment) {
    model.value = item;
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