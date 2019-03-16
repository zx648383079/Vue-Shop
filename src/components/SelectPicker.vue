<template>
    <div class="select-picker">
        <div @click="showSelect" class="select-picker__input-container">
            <slot></slot>
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class SelectPicker extends Vue {
    @Prop(Number) readonly column: number = 1;
    @Prop(String) readonly title: string = '请选择';
    @Prop(String) readonly textTag: string = 'value';
    @Prop(String) readonly valueTag: string = 'id';
    @Prop(String) readonly childrenTag: string = 'children';
    @Prop(Number) readonly lineHeight: number = 30;

    items: any | null = null;

    @Watch('url')
    onUrlChange(val: string, oldVal: string) {
        
    }
}
</script>
<style lang="scss" scoped>

</style>

