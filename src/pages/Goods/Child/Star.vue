<template>
    <div class="score">
        <i class="iconfont fa-star" v-for="(i, j) in starList" :key="j" v-show="i * 2 <= star"></i>
    </div>
</template>
<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class Star extends Vue {
    @Prop(Number) public readonly star!: number;
    public starList = [1, 2, 3, 4, 5];
}
</script>
<style lang="scss" scoped>

</style>
