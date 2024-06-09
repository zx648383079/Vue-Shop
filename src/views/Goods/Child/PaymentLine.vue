<template>
    <DialogPanel title="支付" ref="dialog">
        <div class="promote-line">
            <div class="line-header">支付</div>
            <div class="line-body">
                <div class="pay-icon-item">
                    <i class="iconfont icon-wechat"></i>
                    微信支付
                </div>
                <div class="pay-icon-item">
                    <i class="iconfont icon-wechat"></i>
                    支付宝支付
                </div>
            </div>
            <div class="line-arrow">...</div>
        </div>
        <template #panel>

        </template>
    </DialogPanel>
</template>
<script lang="ts" setup>
import DialogPanel from '../../../components/DialogPanel.vue';

</script>
<style lang="scss" scoped>
</style>