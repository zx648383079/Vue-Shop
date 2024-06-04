<template>
    <div class="score">
        <i class="iconfont icon-star" v-for="(i, j) in starList" :key="j" :class="{active: i * 2 <= props.modelValue}" @click="tapStar(i)"></i>
    </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
    modelValue: number
}>();
const starList = [1, 2, 3, 4, 5];

function tapStar(i: number) {
    emit('update:modelValue', i * 2);
}
</script>
<style lang="scss" scoped>

</style>
