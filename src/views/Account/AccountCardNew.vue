<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <form class="form-inline">
                <div class="tip">
                    请输入您的银行卡号
                </div>
                <div class="input-group">
                    <input type="text" placeholder="请输入卡号">
                </div>

                <button class="btn">下一步</button>
            </form>
        
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
</script>
<style lang="scss" scoped>
.form-inline {
    padding-top: 40px;
    .tip {
        line-height: 40px;
    }
    button {
        background-color: #b4282d;
        color: #fff;
        width: 80%;
        display: block;
        margin: 40px auto 0;
    }
}
</style>
