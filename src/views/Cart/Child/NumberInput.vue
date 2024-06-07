<template>
    <div class="number-box">
        <i class="iconfont icon-minus" :class="{disabled: !minusEnabled}" @click="tapMinus"></i>
        <input type="text" v-model="model">
        <i class="iconfont icon-plus" :class="{disabled: !plusEnabled}" @click="tapPlus"></i>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { parseNumber } from '../../../utils';
const model = defineModel<number>();
const props = withDefaults(defineProps<{
    min?: number,
    max?: number;
    step?: number
}>(), {
    min: 1,
    step: 1
});

const minusEnabled = computed(() => parseNumber(model.value) >= props.min + props.step);
const plusEnabled = computed(() => !props.max || parseNumber(model.value) < props.max - props.step);

function tapMinus() {
    if (!minusEnabled.value) {
        return;
    }
    model.value = parseNumber(model.value) - props.step;
}

function tapPlus() {
    if (!plusEnabled.value) {
        return;
    }
    model.value = parseNumber(model.value) + props.step;
}
</script>
<style lang="scss">

</style>