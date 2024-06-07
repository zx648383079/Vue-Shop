<template>
    <div>
        <BackHeader :title="($route.meta.title as any)"/>
        <div class="has-header">
            <div class="tip">
                最新登录设备：点击可以查看登录时间
            </div>
            <a class="item">
                <div class="name">MI 8</div>
                <div class="time">4秒前</div>
                <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { ref } from 'vue';

const items = ref<any[]>([]);
</script>
<style lang="scss" scoped>
.tip {
    line-height: 1.875rem;
    padding: 0.625rem;
}
.item {
    background-color: #fff;
    padding: 0.3125rem 3.75rem 0.3125rem 0.625rem;
    position: relative;
    display: block;
    .name {
        line-height: 1.875rem;
        font-size: 1.25rem;
    }
    .time {
        color: #ccc;
        font-size: 0.75rem;
    }
    .iconfont {
        position: absolute;
        right: 0.625rem;
        top: 1.125rem;
        font-size: 1.25rem;
        color: #999;
    }
    &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
    }
}
</style>
