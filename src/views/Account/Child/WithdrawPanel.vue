<template>
    <DialogPanel title="提现">
        <a>
            <i class="iconfont icon-wallet" aria-hidden="true"></i>
            提现
            <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
        </a>
        <template #panel>
            <p>充值金额</p>
            <div class="money-input">
                <em>￥</em>
                <input type="text" placeholder="0.00">
            </div>
            <p>提现到账户</p>
            <div class="row-input">
                <select name="" id="">
                    <option value="1">支付宝</option>
                    <option value="2">微信</option>
                    <option value="3">工商</option>
                </select>
            </div>
            <div class="row-input">
                <input type="text" placeholder="卡号/账号">
            </div>
            <div class="row-input">
                <input type="text" placeholder="姓名">
            </div>
        </template>
        <template #footer>
            <button class="dialog-yes">提交提现申请</button>
        </template>
    </DialogPanel>
</template>
<script setup lang="ts">
import DialogPanel from '@/components/DialogPanel.vue';
</script>
<style lang="scss">
@import '../../../assets/css/theme';
.menu-list {
    .dialog-panel-box {
        border-bottom: 1px solid var(--#{$prefix}-border);
    }
}
</style>
