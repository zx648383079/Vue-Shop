<template>
    <a @click="tapGo">
        <i :class="['fa', icon]" aria-hidden="true"></i>
        {{ title }}
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </a>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
    @Prop(String) public readonly title!: string;
    @Prop(String) public readonly icon!: string;
    @Prop(String) public readonly uri!: string;

    public tapGo() {
        if (this.uri) {
            this.$router.push(this.uri);
            return;
        }
        this.$emit('click');
    }
}
</script>