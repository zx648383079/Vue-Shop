<template>
    <DialogPanel title="配送方式">
        <div class="line-item shipping-box">
            <span>配送方式</span>
            <span>
                {{ props.modelValue ? props.modelValue.name : '请选择' }}
            </span>
            <i class="iconfont fa-chevron-right"></i>
        </div>
        <slot name="panel">
            <div class="item-list">
                <a v-for="(item, index) in props.items" :key="index" :class="{active: props.modelValue && item.id == props.modelValue.id}" @click="tapSelected(item)">{{ item.name }}</a>
            </div>
        </slot>
    </DialogPanel>
</template>
<script setup lang="ts">
import type { IShipping } from '@/api/model';
import DialogPanel from '@/components/DialogPanel.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: IShipping|null,
    items: IShipping[]
}>();

function tapSelected(item: IShipping) {
    emit('update:modelValue', item);
}
</script>
<style lang="scss" scoped>
.shipping-box {
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