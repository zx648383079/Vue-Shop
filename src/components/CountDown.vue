<template>
    <div class="countdown">
        <p class="label" v-if="props.label">{{ props.label }}</p>
        <p class="time">
            <span>{{ input.hour }}</span>
            :
            <span>{{ input.minute }}</span>
            :
            <span>{{ input.second }}</span>
        </p>
    </div>
</template>
<script setup lang="ts">
import { onUnmounted, reactive, watch } from 'vue';
import { twoPadFilter } from '../pipes';

const emit = defineEmits(['finished']);
const props = withDefaults(defineProps<{
    label?: string;
    end: number|string;
    auto?: boolean;
}>(), {
    label: '',
    auto: false,
});

const input = reactive({
    formatEnd: 0,
    hour: '00',
    minute: '00',
    second: '00',
    handle: 0,
});

watch(() => props.end, val => {
    input.formatEnd = parseTime(val);
    refresh();
});
watch(() => props.auto, val => {
    if (val) {
        startTimer();
    }
});
function refresh(now?: Date) {
    if (!now) {
        now = new Date();
    }
    const diff = Math.max(input.formatEnd - parseTime(now), 0) / 1000;
    if (diff <= 0) {
        emit('finished');
    }
    input.hour = twoPadFilter(Math.floor(diff / 3600));
    input.minute = twoPadFilter(Math.floor(diff % 3600 / 60));
    input.second = twoPadFilter(Math.floor(diff % 60));
    if (diff <= 0) {
        stopTimer();
    }
}

function startTimer() {
    stopTimer();
    input.handle = window.setInterval(() => {
        refresh();
    }, 300);
}

function stopTimer() {
    if (input.handle > 0) {
        clearInterval(input.handle);
        input.handle = 0;
    }
}

function parseTime(date: any): number {
    if (!date) {
        return 0;
    }
    if (typeof date === 'object') {
        return (date as Date).getTime();
    }
    if (typeof date === 'string' && !/^\d{10}$/.test(date)) {
        return new Date(date).getTime();
    }
    return /^\d{10}$/.test(date) ? date * 1000 : parseInt(date, 10);
}
onUnmounted(() => {
    stopTimer();
});
</script>
<style lang="scss" scoped>
@import '../assets/css/theme';
</style>