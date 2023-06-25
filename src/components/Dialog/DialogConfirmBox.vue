<template>
    <div class="dialog-box" v-if="props.visible">
        <div class="dialog-header" v-if="props.title">
            <div class="dialog-title">{{ props.title }}</div>
            <i class="iconfont icon-close dialog-close" @click="close()"></i>
        </div>
        <div class="dialog-body">
            <div class="message-icon" v-if="props.icon">
                <i class="iconfont" :class="props.icon"></i>
            </div>
            <div class="message-body">
                <div class="message-content" v-if="props.content">{{ props.content }}</div>
            </div>
        </div>
        <div class="dialog-footer">
            <div class="btn-group">
                <div class="btn btn-primary" @click="close(true)">{{ props.confirmText }}</div>
                <div class="btn btn-danger" @click="close()">{{ props.cancelText }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const props = withDefaults(defineProps<{
    visible?: boolean;
    title?: string;
    content?: string;
    icon?: string;
    confirmText?: string;
    cancelText?: string;
}>(), {
    cancelText: 'Cancel',
    confirmText: 'Confirm'
});

function close(res = false) {

}

</script>
<style lang="scss">
.dialog-box {
    position: fixed;
    z-index: 920;
    left: 50%;
    margin-left: -21.875rem;
    top: 50%;
    margin-top: -7.5rem;
    width: 43.75rem;
    background: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transform: translate3d(0, -1000px, 0);
    .dialog-header {
        position: relative;
        height: 2.5rem;
        line-height: 1.875rem;
        text-align: center;
        padding: 0.3125rem 0.625rem;
        border-bottom: 1px solid #ccc;
        .iconfont {
            width: 1.875rem;
            height: 1.875rem;
            border: none;
            position: absolute;
            top: 0;
            line-height: 1.875rem;
        }
        .icon-arrow-left {
            left: 0;
            top: 0.3125rem;
        }
        .dialog-close {
            right: 0;
            top: 0.375rem;
        }
    }
    .dialog-body {
        padding: 0.625rem;
    }
    .dialog-footer {
        border-top: 1px solid #ccc;
        text-align: center;
    }
    .dialog-invail-tip {
        position: absolute;
        top: 2.5rem;
        left: 0;
        right: 0;
        z-index: 20;
    }
    &.dialog-open {
        transform: translate3d(0, 0, 0);
    }
    &.dialog-not-header {
        .dialog-invail-tip {
            top: 0;
        }
    }
}
</style>