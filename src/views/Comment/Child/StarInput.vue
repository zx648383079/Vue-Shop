<template>
    <div class="score">
        <i class="iconfont icon-star" v-for="(i, j) in starList" :key="j" :class="{active: i * 2 <= model}" @click="tapStar(i)"></i>
    </div>
</template>
<script setup lang="ts">

const model = defineModel<number>({default: 0});
const starList = [1, 2, 3, 4, 5];

function tapStar(i: number) {
    model.value = i * 2;
}
</script>
<style lang="scss" scoped>

</style>
