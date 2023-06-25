<template>
    <div class="large-header">
        <a class="back" @click="tapBack">
            <i class="iconfont fa-chevron-left" aria-hidden="true"></i>
        </a>
        <div class="title">{{ props.title }}</div>
        <slot></slot>
        <i class="iconfont fa-check" @click="tapSubmit"></i>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
const emit = defineEmits(['submited']);
const props = defineProps<{
    title: string;
}>();

function tapBack() {
    if (window.history.length <= 1) {
        router.push('/');
        return;
    }
    router.go(-1);
}
function tapSubmit() {
    emit('submited');
}
</script>
<style lang="scss" scoped>
.large-header {
    background: #05a6b1;
    color: #fff;
    height: 150px;
    position: relative;
    margin-bottom: 20px;
    .back {
        top: 10px;
        font-size: 1.5625rem;
        position: absolute;
        left: 0.625rem;
    }
    .title {
        padding: 90px 0 0 20px;
        font-size: 30px;
    }
    .fa-check {
        position: absolute;
        bottom: -20px;
        font-size: 30px;
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        right: 20px;
        border-radius: 50%;
        background-color: #1d8686;
    }
}
</style>

