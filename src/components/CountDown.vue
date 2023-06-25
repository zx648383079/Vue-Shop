<template>
    <div class="count-down" :class="{disable: input.disable}" @click="tapClick">
        <span>{{ input.text }}</span>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits(['click']);
const props = withDefaults(defineProps<{
    time: number;
}>(), {
    time: 0,
});

const input = reactive({
    text: '获取验证码',
    disable: false,
    handle: 0
});

function tapClick(): void {
    if (input.disable) {
        return;
    }
    emit('click', {
        start,
        reset
    });
}
function start(time = 0): void {
    input.disable = true;
    if (time < 1) {
        time = props.time;
    }
    input.text = time.toString();
    input.handle = window.setInterval(() => {
        time --;
        if (time <= 0) {
            clearInterval(input.handle);
            input.disable = false;
            input.handle = 0;
            input.text = '重新获取';
            return;
        }
        input.text = time.toString();
    }, 1000);
}
function reset(): void {
    if (input.disable) {
        input.disable = true;
    }
    if (input.handle > 0) {
        clearInterval(input.handle);
    }
    input.handle = 0;
    input.text = '获取验证码';
}
</script>
<style lang="scss" scoped>
.count-down {
    line-height: 40px;
    background-color: aquamarine;
    &.disable {
        background-color: #ccc;
    }
}
</style>