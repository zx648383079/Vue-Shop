<template>
    <div class="pull-to-refresh-scroll" 
        ref="pullScroll"
        @scroll.passive="onScroll" 
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd">
        <div class="scroll-top">
            <slot name="top">
                <div v-if="state == ESTATE.PULL">
                    <i class="fa fa-arrow-down"></i>
                    下拉刷新
                </div>
                 <div v-if="state == ESTATE.PULLED">
                    <i class="fa fa-arrow-up"></i>
                    释放刷新
                </div>
                <div v-if="state == ESTATE.REFRESHING">
                    <i class="fa fa-retweet"></i>
                    刷新中
                </div>
                 <div v-if="state == ESTATE.REFRESHED">
                    <i class="fa fa-check"></i>
                    刷新完成
                </div>
                <div v-if="state == ESTATE.CANCEL">
                    <i class="fa fa-arrow-up"></i>
                    停止刷新
                </div>
            </slot>
        </div>
        <div class="scroll-body">
            <slot></slot>
        </div>
        <div class="scroll-bottom">
            <slot name="bottom">
                <div v-if="state == ESTATE.MORE">
                    <i class="fa fa-retweet"></i>
                    加载更多
                </div>
                 <div v-if="state == ESTATE.LOADING">
                    <i class="fa fa-check"></i>
                    加载中
                </div>
                <div v-if="state == ESTATE.LOADED">
                    <i class="fa fa-arrow-up"></i>
                    加载完成
                </div>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

export enum ESTATE {
    NONE = 0,
    PULL = 1,
    PULLED = 2,
    CANCEL = 3,
    REFRESHING = 4,
    REFRESHED = 5,
    MORE = 6,
    LOADING = 7,
    LOADED = 8
}

@Component
export default class PullToRefresh extends Vue {
    @Prop({type: Boolean, default: true}) readonly refresh!: boolean;
    @Prop({type: Boolean, default: true}) readonly more!: boolean;
    @Prop({type: Number, default: 10}) readonly distance!: number;
    @Prop({type: Boolean, default: false}) readonly loading!: boolean;

    ESTATE = ESTATE;
    state: ESTATE = ESTATE.NONE;
    startY: number = 0;
    box: HTMLDivElement | null = null;

    mounted() {
        this.box = this.$refs.pullScroll as HTMLDivElement;
    }

    @Watch('state')
    onStateChanged(val: ESTATE, oldVal: ESTATE) {
        this.$emit('change', val, oldVal);
    }

    @Watch('loading')
    onLoadingChanged(val: number, oldVal: number) {
        if (val && !oldVal) {
            this.state = this.state == ESTATE.PULL ? ESTATE.REFRESHING : ESTATE.LOADING;
            return;
        }
        if (oldVal && !val) {
            this.state = this.state == ESTATE.PULL ? ESTATE.REFRESHING : ESTATE.LOADING;
        }
    }

    onScroll(event: any) {
        console.log(event);
    }

    touchStart(event: TouchEvent) {
        this.startY = event.targetTouches[0].pageY;
    }

    touchMove(event: TouchEvent) {
        
    }

    touchEnd(event: TouchEvent) {

    }
}
</script>
<style lang="scss" scoped>
.pull-to-refresh-scroll {
    min-height: 300px;
}
</style>
