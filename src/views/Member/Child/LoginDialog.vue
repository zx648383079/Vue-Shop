<template>
    <div>
        <div class="dialog dialog-content" v-if="input.visible">
            <div class="title-bar">
                <span>一键登录解锁</span>
                <p class="small">选购优质商品，享受优质服务</p>
            </div>
            <a :class="['btn', 'btn-danger', input.agree ? '' : 'disabled']">微信授权登录</a>
            <a :class="['btn', 'btn-outline-danger', input.agree ? '' : 'disabled']">其他方式注册/登录</a>
            <div class="input-group">
                <div class="checkbox" @click="input.agree = !input.agree">
                    <i :class="['iconfont', input.agree ? 'icon-check-circle' : 'icon-circle']"></i>
                </div>
                我已阅读并同意
                <a href="">用户服务协议</a>
                及
                <a href="">隐私政策</a>
            </div>
        </div>
        <div class="dialog-bg" v-if="input.visible" @click="toggleVisible(false)"/>
    </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps<{
    open: boolean
}>();
const input = reactive({
    agree: true,
    visible: props.open
});

function toggleVisible(visible = !input.visible) {
    input.visible = visible;
}

watch(() => props.open, val => {
    if (input.visible === val) {
        return;
    }
    toggleVisible(val);
});



</script>

<style lang="scss" scoped>
.dialog-content {
    top: auto;
    padding: 1.5rem 0 1rem;
}
.title-bar {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    .small {
        font-size: .8rem;
        margin-top: .5rem;
        color: #999;
    }
}
.btn {
    display: block;
    line-height: 2.5rem;
    height: 2.5rem;
    margin: 1rem 2rem;
    text-align: center;
    color: #fff;
    border: 1px solid #b4282d;
    background-color: #b4282d;
    cursor: pointer;
    &.btn-none {
        background-color: #fff;
        color: #b4282d;
    }
    &.disabled {
        cursor: not-allowed;
        opacity: .3;
    }
}
.input-group {
    text-align: center;
    font-size: .8rem;
    line-height: 2rem;
    user-select: none;
    .checkbox {
        display: inline-block;
        margin-right: .5rem;
        font-size: 1.5rem;
        vertical-align: middle;
        color: #999;
    }
    .icon-check-circle {
        color: #b4282d;
    }
}
</style>