<template>
    <DialogPanel title="充值">
        <a>
            <i class="iconfont icon-money-o" aria-hidden="true"></i>
            充值
            <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
        </a>
        <template #panel>
            <p>充值金额</p>
            <div class="money-input">
                <em>￥</em>
                <input type="text" placeholder="0.00">
            </div>
        </template>
        <template #footer>
            <button class="dialog-yes">下一步</button>
        </template>
    </DialogPanel>
</template>
<script setup lang="ts">
import DialogPanel from '@/components/DialogPanel.vue';
</script>
