<template>
    <div>
        <div class="time-bar" v-if="data.status < 2">
            <span v-if="data.status < 1">距结束</span>
            <span v-if="data.status == 1">距开始</span>
            <em>{{ data.hour }}</em>:
            <em>{{ data.minute }}</em>:
            <em>{{ data.second }}</em>
        </div>
        <span v-if="data.status > 1">已结束</span>
    </div>
</template>
<script setup lang="ts">
import { parseDate } from '@/utils';
import { reactive, watch } from 'vue';

const props = defineProps<{
    start: string|Date,
    end: string|Date
}>();

const data = reactive({
    status: 0,
    hour: 0,
    minute: 0,
    second: 0,
    handle: 0
});

function begin() {
    stop();
    const start = parseDate(props.start);
    const end = parseDate(props.end);
    data.handle = window.setInterval(() => {
        const now = new Date();
        if (end < now) {
            data.status = 2;
            stop();
            return;
        }
        if (start > now) {
            data.status = 1;
            setTimer(start, now);
            return;
        }
        data.status = 0;
        setTimer(start, now);
    }, 500);
}

function stop() {
    if (data.handle > 0) {
        clearInterval(data.handle);
    }
    data.handle = 0;
}

function setTimer(to: Date, from: Date) {
    const diff = Math.floor((to.getTime() - from.getTime()) / 1000);
    data.hour = Math.floor(diff / 3600);
    data.minute = Math.floor(diff % 3600 / 60);
    data.second = diff % 3600 % 60;
}

watch(() => props.start, () => {
    begin()
});
watch(() => props.end, () => {
    begin()
});
</script>
<style lang="scss" scoped>
.time-bar {
    em {
        font-style: normal;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
        padding: 0 2px;
    }
}
</style>