<template>
    <div class="score">
        <i class="iconfont icon-star" v-for="(i, j) in starList" :key="j" v-show="i * 2 <= props.star"></i>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    star: number;
}>();
const starList = [1, 2, 3, 4, 5];

</script>
<style lang="scss" scoped>

</style>
