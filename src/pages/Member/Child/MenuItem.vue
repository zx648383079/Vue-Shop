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
    @Prop(String) readonly title!: string;
    @Prop(String) readonly icon!: string;
    @Prop(String) readonly uri!: string;

    public tapGo() {
        if (this.uri) {
            this.$router.push(this.uri);
            return;
        }
        this.$emit('click');
    }
}
</script>