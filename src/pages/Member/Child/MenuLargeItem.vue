<template>
    <a @click="tapGo" class="item">
        <i :class="['fa', icon]" aria-hidden="true"></i>
        <span>{{ title }}</span>
        <i class="tip" v-if="count && count > 0">{{ count }}</i>
    </a>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class MenuLargeItem extends Vue {
    @Prop(String) readonly title!: string;
    @Prop(String) readonly icon!: string;
    @Prop(String) readonly uri!: string;
    @Prop(Number) readonly count!: number;

    public tapGo() {
        if (this.uri) {
            this.$router.push(this.uri);
            return;
        }
        this.$emit('click');
    }
}
</script>