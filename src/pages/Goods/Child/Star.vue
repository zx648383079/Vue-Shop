<template>
    <div class="score">
        <i class="fa fa-star" v-for="(i, j) in star_list" :key="j" v-show="i * 2 <= star"></i>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Star extends Vue {
    @Prop(Number) readonly star?: number;
    star_list = [1, 2, 3, 4, 5];
}
</script>
<style lang="scss" scoped>

</style>
