<template>
    <div class="swipe-row" :style="{left: input.left + 'px'}">
        <div class="actions-left" ref="leftBox">
            <slot name="left"></slot>
        </div>
        <div :class="['swipe-content', name]" 
            @mousedown="mouseDown" 
            @touchstart='touchStart'
            @touchmove='touchMove'
            @touchend='touchEnd'>
            <slot></slot>
        </div>
        <div class="actions-right" ref="rightBox">
            <div v-if="$slots.right">
                <slot name="right"></slot>
            </div>
            <a v-else @click="tapRemove">
                <i class="iconfont icon-trash"></i>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, reactive, ref, type VNode, type VNodeNormalizedChildren } from 'vue';

const app = getCurrentInstance();
const emit = defineEmits(['tapped', 'remove']);
const props = defineProps<{
    name: string|string[],
    index: number|string;
}>();

const input = reactive({
    oldLeft: 0,
    left: 0,
    startX: 0,
    isTouch: false
})

const leftBox = ref<HTMLDivElement>();
const rightBox = ref<HTMLDivElement>();

function getLeftWidth(): number {
    if (!leftBox.value) {
        return 0;
    }
    return leftBox.value.clientWidth || leftBox.value.offsetWidth;
}
function getRightWidth(): number {
    if (!rightBox.value) {
        return 0;
    }
    return rightBox.value.clientWidth || rightBox.value.offsetWidth;
}
function tapRemove(item: any) {
    emit('remove', item);
}

let isMouseDown = false;

function mouseDown(e: MouseEvent) {
    isMouseDown = true;
    onTouchStart(e.clientX, e);
}

function mouseMove(e: MouseEvent) {
    if (!isMouseDown) {
        return;
    }
    onTouchMove(e.clientX);
}

function mouseUp() {
    if (!isMouseDown) {
        return;
    }
    isMouseDown = false;
    touchEnd();
}

function touchStart(e: TouchEvent) {
    onTouchStart(e.targetTouches[0].clientX, e);
}


function touchMove(e: TouchEvent) {
    e.preventDefault();
    onTouchMove(e.targetTouches[0].clientX);
}

function touchEnd() {
    if (!input.isTouch) {
        animation(input.left, 0);
        emit('tapped');
        return;
    }
    // const diff = e.changedTouches[0].clientX - startX;
    if (input.left === 0) {
        return;
    }
    if (input.left > 0) {
        const width = getLeftWidth();
        animation(input.left, input.left * 3 > width ? width : 0);
        return;
    }
    const w = - getRightWidth();
    animation(input.left, input.left * 3 < w ? w : 0);
}

function onTouchStart(x: number, e: Event) {
    e.preventDefault();
    resetOther();
    input.oldLeft = input.left;
    input.isTouch = false;
    input.startX = x;
}

function onTouchMove(x: number) {
    input.isTouch = true;
    const diff = x - input.startX;
    if (input.oldLeft === 0) {
        if (diff < 0) {
            input.left = Math.max(diff, -getRightWidth());
            return;
        }
        input.left = Math.min(diff, getLeftWidth());
        return;
    }
    if (input.oldLeft > 0) {
        if (diff > 0) {
            return;
        }
        input.left = Math.max(input.oldLeft + diff, 0);
        return;
    }
    if (diff < 0) {
        return;
    }
    input.left = Math.min(input.oldLeft + diff, 0);
}

function animation(
    start: number, end: number, endHandle?: () => void) {
    const diff = start > end ? -1 : 1;
    let step = 1;
    const handle = setInterval(() => {
        start += (step ++) * diff;
        if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
            clearInterval(handle);
            input.left = end;
            if (typeof endHandle === 'function') {
                endHandle();
            }
            return;
        }
        input.left = start;
    }, 16);
}

function reset() {
    if (input.left === 0) {
        return;
    }
    animation(input.left, 0);
}
function resetOther() {
    const parent = app?.parent;
    if (typeof props.index === 'undefined' || !parent) {
        return;
    }
    const items: any[] = [];
    const getChildren = (eleItems: VNodeNormalizedChildren) => {
        if (!Array.isArray(eleItems)) {
            return;
        }
        eleItems.forEach(item => {
            const vnode: VNode = item as any;
            if (typeof vnode.type !== 'object') {
                if (vnode.children) {
                    getChildren(vnode.children);
                }
                return;
            }
            if ((vnode.type as any).__name === 'SwipeRow') {
                items.push(vnode);
                return;
            }
        });
    };
    getChildren(parent.subTree.children);
    if (!items || items.length < 1) {
        return;
    }
    for (const item of items) {
        if (item.props.index === props.index) {
            continue;
        }
        item.component?.exposed?.reset();
    }
}

onMounted(() => {
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
});
onUnmounted(() => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
});
defineExpose({
    reset,
});
</script>

<style lang="scss">
@import '../assets/css/theme';
.swipe-row {
    width: 100%;
    position: relative;
    height: 5rem; 
    padding: 0;
    margin: 0;
    transition: left .5s;
    .swipe-content {
        width: 100%;
        display: block;
        height: 5rem;
    }
    .actions-left,
    .actions-right {
        position: absolute;
        height: 5rem; 
        min-height: 5rem;
        max-height: 5rem;
        text-align: center;
        font-size: 1.375rem;
        top: 0;
        white-space: nowrap;
        .iconfont {
            display: inline-block;
            font-size: 1.875rem;
            padding: 1.5625rem 0.9375rem;
        }
        a {
            color: var(--#{$prefix}-primary-text);
            text-decoration: none;
        }
    }
    .actions-left {
        color: var(--#{$prefix}-primary-text);
        background-color: var(--#{$prefix}-primary);
        right: 100%;
    }
    .actions-right {
        color: var(--#{$prefix}-danger-text);
        background-color: var(--#{$prefix}-danger);
        left: 100%;
    }
}
</style>


