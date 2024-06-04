<template>
    <DialogPanel title="充值">
        <a>
            <i class="iconfont icon-money-check-alt" aria-hidden="true"></i>
            充值
            <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
        </a>
        <slot name="panel">
            <p>充值金额</p>
            <div class="money-input">
                <em>￥</em>
                <input type="text" placeholder="0.00">
            </div>
        </slot>
        <slot name="footer">
            <button class="dialog-yes">下一步</button>
        </slot>
    </DialogPanel>
</template>
<script setup lang="ts">
import DialogPanel from '@/components/DialogPanel.vue';
</script>
