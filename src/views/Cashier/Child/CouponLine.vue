<template>
    <DialogPanel title="优惠券" ref="dialog">
        <div class="line-item inovice-box">
            <span>优惠券</span>
            <span>
                {{ model ? model.name : (!items || items.length < 1 ? '无可用' : '请选择') }}
            </span>
            <i class="iconfont icon-chevron-right"></i>
        </div>
        <template #panel>
            <div class="coupon-body">
                <div class="my-coupon-item" v-for="(item, index) in props.items" :key="index" @click="tapSelected(item)">
                    <div class="item-header">
                        <div class="item-price">
                            <em>￥</em>
                            {{ item.money }}
                        </div>
                    </div>
                    <div class="item-body">
                        <p>{{ item.name }}</p>
                        <div class="item-time">
                            <span>{{ $d(item.start_at, 'long') }}-{{ $d(item.end_at, 'long')}}</span>
                        </div>
                        <i :class="['iconfont', 'check-box', model && item.id == model.id ? 'active' : '']"></i>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <button @click="tapHide">确定</button>
        </template>
    </DialogPanel>
</template>
<script setup lang="ts">
import type { ICoupon } from '@/api/model';
import DialogPanel from '@/components/DialogPanel.vue';
import { ref } from 'vue';

const model = defineModel<ICoupon>();
const props = defineProps<{
    items: ICoupon[]
}>();
const dialog = ref<typeof DialogPanel>();

function tapSelected(item: ICoupon) {
    model.value = item;
}

function tapHide() {
    // dialog.hideCalerdar();
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.payment-box {
    background-color: var(--#{$prefix}-panel);
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