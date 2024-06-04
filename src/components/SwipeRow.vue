<template>
    <div class="swipe-row" :style="{left: input.left + 'px'}">
        <div class="actions-left" ref="left">
            <slot name="left"></slot>
        </div>
        <div :class="['swipe-content', name]"  
            @touchstart='touchStart'
            @touchmove='touchMove'
            @touchend='touchEnd'>
            <slot></slot>
        </div>
        <div class="actions-right" ref="right">
            <slot name="right">
                <i class="iconfont icon-trash" @click="tapRemove"></i>
            </slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue';

const emit = defineEmits(['click', 'remove']);
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

function touchStart(e: TouchEvent) {
    resetOther();
    input.oldLeft = input.left;
    input.isTouch = false;
    input.startX = e.targetTouches[0].clientX;
}
function touchMove(e: TouchEvent) {
    input.isTouch = true;
    const diff = e.targetTouches[0].clientX - input.startX;
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
function touchEnd() {
    if (!input.isTouch) {
        animation(input.left, 0);
        emit('click');
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
    const parent = getCurrentInstance()?.parent;
    if (typeof props.index === 'undefined' || !parent) {
        return;
    }
    const items: any[] = parent.refs.swiperow as any[];
    if (!items || items.length < 1) {
        return;
    }
    for (const item of items) {
        if (item.index === props.index) {
            continue;
        }
        item.reset();
    }
}
</script>

<style lang="scss">
$white: #fff;
$primary: rgb(0, 187, 72);
$danger: #BB0000;
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
        .fa {
            font-size: 1.875rem;
            padding: 1.5625rem 0.9375rem;
        }
        a {
            color: $white;
            text-decoration: none;
        }
    }
    .actions-left {
        color: $white;
        background-color: $primary;
        right: 100%;
    }
    .actions-right {
        color: $white;
        background-color: $danger;
        left: 100%;
    }
}
</style>


