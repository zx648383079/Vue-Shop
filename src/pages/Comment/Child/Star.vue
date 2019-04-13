<template>
    <div class="score">
        <i class="fa fa-star" v-for="(i, j) in starList" :key="j" :class="{active: i * 2 <= value}" @click="tapStar(i)"></i>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Star extends Vue {
    @Prop(Number) public readonly value?: number;
    public starList = [1, 2, 3, 4, 5];

    public tapStar(i: number) {
        this.$emit('input', i * 2);
    }
}
</script>
<style lang="scss" scoped>

</style>
