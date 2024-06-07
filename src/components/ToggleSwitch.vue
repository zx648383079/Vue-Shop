<template>
    <div class="switch-box" :class="{active: isActive}" @click="tapToggle">
        <div class="switch-input"></div>
        <div class="switch-label">
            {{ labelContent }}
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel<number|boolean>();
const props = defineProps<{
    disabled?: boolean;
    label?: string;
    onLabel?: string;
    offLabel?: string;
}>();
const labelContent = computed(() => {
    if (isActive.value) {
        return props.onLabel || props.label;
    }
    return props.offLabel || props.label;
});

const isActive = computed(() => {
    if (typeof model.value === 'boolean') {
        return model.value;
    }
    return model.value && model.value > 0;
});
function tapToggle(e: MouseEvent) {
    e.stopPropagation();
    if (props.disabled) {
        return;
    }
    if (typeof model.value === 'boolean') {
        model.value = !model.value
        return;
    }
    model.value = model.value && model.value > 0 ? 0 : 1;
}
</script>
<style lang="scss" scoped>
@import '../assets/css/theme';
.switch-box {
    display: inline-block;
    line-height: 2em;
    .switch-input {
        display: inline-block;
        cursor: pointer;
        background-color: var(--#{$prefix}-border);
        border-radius: 2em;
        display: inline-block;
        position: relative;
        margin-right: .5em;
        transition: all .1s ease-in;
        width: 4em;
        height: 2em;
        vertical-align: bottom;
        &::before {
            content: ' ';
            position: absolute;
            border-radius: 2em;
            background-color: var(--#{$prefix}-primary-text);
            top: 0;
            left: 0;
            z-index: 1;
            width: 2em;
            transition: all .1s ease-in;
            height: 2em;
            box-shadow: 0 3px 1px rgba(0,0,0,.05), 0 0 1px rgba(0,0,0,.3);
        }
        &:after {
            content: ' ';
            position: absolute;
            border-radius: 2em;
            top: 0;
            transition: box-shadow .1s ease-in;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: inset 0 0 0 0 #eee, 0 0 1px rgba(0,0,0,.4);
        }
    }
    .switch-label {
        display: inline-block;
    }
    &.active {
        .switch-input {
            &::before {
                left: 2em;
            }
            &:after {
                background-color: var(--#{$prefix}-primary);
                box-shadow: 0 0 1px var(--#{$prefix}-primary);
            }
        }
    }
}
</style>

