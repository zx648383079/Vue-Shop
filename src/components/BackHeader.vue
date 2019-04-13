<template>
    <header class="top" :class="{fixed: !this.fixed}">
        <a class="back" @click="tapBack">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
        <span class="title">
            {{ title }}
        </span>
        <slot></slot>
    </header>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class BackHeader extends Vue {
    @Prop(String) public readonly title!: string;
    @Prop({type: Boolean, default: true}) public readonly fixed!: boolean;

    public tapBack() {
        if (window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }
}
</script>
<style lang="scss" scoped>
header {
    width: 100%;
    height: 2.75rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #05a6b1;
    color: #fff;
    text-align: center;
    z-index: 99;
    border: 0;
    .back {
        top: 50%;
        margin-top: -1rem;
        font-size: 1.5625rem;
        position: absolute;
        left: 0.625rem;
    }
    .title {
        line-height: 2.75rem;
    }
}
</style>

