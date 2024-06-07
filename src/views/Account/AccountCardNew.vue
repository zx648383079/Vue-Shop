<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <form class="form-inline">
                <div class="tip">
                    请输入您的银行卡号
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="请输入卡号">
                </div>

                <button class="btn btn-danger">下一步</button>
            </form>
        
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.form-inline {
    padding-top: 2.5rem;
    .tip {
        line-height: 2.5rem;
    }
    button {
        width: 80%;
        display: block;
        margin: 2.5rem auto 0;
    }
}
</style>
