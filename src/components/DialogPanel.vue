<template>
    <div class="dialog-panel-box">
        <div @click="showCalendar" class="dialog-panel__input-container">
            <slot></slot>
        </div>
        <div class="dialog dialog-content" v-if="calendarVisible">
            <div class="dialog-header">
                <slot name="header">
                    <div class="dialog-title">{{ title }}</div>
                    <i class="iconfont fa-close dialog-close" @click="hideCalerdar"></i>
                </slot>
            </div>
            <div class="dialog-body">
                <slot name="panel"></slot>
            </div>
            <div class="dialog-footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="dialog-bg" v-if="calendarVisible" @click="hideCalerdar"/>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Watch } from 'vue-property-decorator';

export default class DialogPanel extends Vue {
    @Prop(String) public readonly title!: string;
    @Prop(Boolean) public readonly hide!: boolean;

    public calendarVisible = false;

    @Watch('calendarVisible')
    public onVisibleChanged(val: boolean) {
        this.$emit('toggle', val);
    }

    @Watch('hide')
    public onHideChanged(val: boolean) {
        if (this.calendarVisible === !val) {
            return;
        }
        this.calendarVisible = !val;
    }

    public showCalendar() {
        this.calendarVisible = true;
    }

    public hideCalerdar() {
       this.calendarVisible = false;
    }
}
</script>
<style lang="scss" scoped>
.dialog.dialog-content {
    bottom: 0px;
    top: 38%;
    animation: fadeInUp 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>