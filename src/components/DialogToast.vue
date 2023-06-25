<template>
    <transition name="toast-pop">
        <div class="toast" v-show="input.visible" :class="customClass" :style="{ 'padding': props.iconClass === '' ? '10px' : '20px' }">
            <i class="toast-icon" :class="props.iconClass" v-if="props.iconClass !== ''"></i>
            <span class="toast-text" :style="{ 'padding-top': props.iconClass === '' ? '0' : '10px' }">{{ props.message }}</span>
        </div>
    </transition>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
const props = withDefaults(defineProps<{
    message: string;
    className: string;
    position: string;
    iconClass: string;
}>(), {
    className: '',
    position: 'middle',
    iconClass: 'middle'
});

const input = reactive({
    visible: false,
    closed: false
});
const close = ref(() => {
    input.visible = false;
});

const customClass = computed(() => {
    const classes = [];
    switch (props.position) {
        case 'top':
            classes.push('is-placetop');
            break;
        case 'bottom':
            classes.push('is-placebottom');
            break;
        default:
            classes.push('is-placemiddle');
    }
    classes.push(props.className);
    return classes.join(' ');
});
</script>

<style lang="scss">
.toast {
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;

    .toast-icon {
        display: block;
        text-align: center;
        font-size: 56px;
    }

    .toast-text {
        font-size: 14px;
        display: block;
        text-align: center;
    }

    &.is-placetop {
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    &.is-placemiddle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &.is-placebottom {
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    &.toast-pop-enter,
    &.toast-pop-leave-active {
        opacity: 0;
    }
}</style>