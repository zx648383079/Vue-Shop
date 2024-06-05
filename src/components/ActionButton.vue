<template>
    <div ref="root" class="action-btn" :class="{disabled: props.disabled, loading: props.loading}" @click="tapBody">
        <div class="action-body">
            <slot></slot>
        </div>
        <div class="action-loading">
            <span :style="loadingStyle"></span>
            <span :style="loadingStyle"></span>
            <span :style="loadingStyle"></span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { ButtonEvent } from './types';
import { parseNumber } from '../utils';

const root = ref<HTMLDivElement>();
const emit = defineEmits<(e: 'tapped', args: ButtonEvent) => void>();
const props = reactive<{
    disabled?: boolean,
    loading?: boolean;
}>({
    disabled: false,
    loading: false
});

const loadingStyle = ref({});
/**
* 开始执行加载
*/
function enter() {
    props.loading = true;
}

/**
* 停止执行
*/
function reset() {
    props.loading = false;
}

function tapBody() {
    if (props.disabled || props.loading) {
        return;
    }
    emit('tapped', {
        enter,
        reset
    });
}

onMounted(() => {
    const ele = root.value!;
    const bound = ele.getBoundingClientRect();
    const style = getComputedStyle(ele);
    const height = bound.height - parseNumber(style.paddingTop) - parseNumber(style.paddingBottom);
    const width = height - 10;
    loadingStyle.value =  {
        height: width + 'px',
        width: width + 'px',
    };
});

</script>
<style lang="scss" scoped>
@import '../assets/css/theme';
.action-btn {
    display: block;
    .action-loading {
        display: none;
        align-items: center;
        justify-content: center;
    }
    &.loading {
        .action-body {
            display: none;
        }
        .action-loading {
            display: flex;
        }
    }
}

.action-loading {
    padding: 0.3125rem;
    span {
        display: inline-block;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        background-color: var(--#{$prefix}-border);
        animation-fill-mode: both;
        animation: loading-default 1.8s infinite ease-in-out;
        &:nth-of-type(2) {
            animation-delay: 0.16s;
        }
        &:nth-of-type(3) {
            animation-delay: 0.32s;
        }
    }
}

@keyframes loading-default {
    0%,
    80%,
    100% {
        transform: scale(.8);
        opacity: 1;
    }

    40% {
        transform: scale(.1);
        opacity: 0;
    }
}
</style>