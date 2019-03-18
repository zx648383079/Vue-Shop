<template>
    <div class="pull-to-refresh-scroll" 
        ref="pullScroll"
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd">
        <div class="scroll-top" :style="{height: topHeight + 'px'}">
            <slot name="top">
                <div v-if="state == ESTATE.PULL">
                    <i class="fa fa-arrow-down"></i>
                    下拉刷新
                </div>
                 <div v-if="state == ESTATE.PULLED">
                    <i class="fa fa-arrow-up"></i>
                    松开刷新
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
    @Prop({type: Number, default: 100}) readonly maxHeight!: number;

    ESTATE = ESTATE;
    state: ESTATE = ESTATE.NONE;
    startY: number = 0;
    box: HTMLDivElement | null = null;
    scrollTop: number = 0;
    topHeight = 0;

    mounted() {
        this.box = this.$refs.pullScroll as HTMLDivElement;
        window.addEventListener('scroll', this.onScroll)
    }

    @Watch('state')
    onStateChanged(val: ESTATE, oldVal: ESTATE) {
        this.$emit('change', val, oldVal);
    }

    @Watch('loading')
    onLoadingChanged(val: number, oldVal: number) {
        if (val && !oldVal) {
            if (this.state == ESTATE.PULLED) {
                this.state =  ESTATE.REFRESHING;
                return;
            }
            if (this.state == ESTATE.MORE) {
                this.state =  ESTATE.LOADING;
                return;
            }
        }
        
        if (oldVal && !val) {
            if (this.state == ESTATE.LOADING) {
                this.state = ESTATE.LOADED;
                this.reset();
                return;
            }
            if (this.state == ESTATE.REFRESHING) {
                this.state = ESTATE.REFRESHED;
                this.reset();
                return;
            }
            if (this.state == ESTATE.MORE) {
                this.state =  ESTATE.NONE;
                return;
            }
        }
    }

    onScroll(event: any) {
        if (!this.more) {
            return;
        }
        if (this.getScrollBottomHeight() > this.distance) {
            return;
        }
        this.state = ESTATE.MORE;
        this.$emit('more');
    }

    touchStart(event: TouchEvent) {
        if (this.scrollTop > 0) {
            return;
        }
        this.startY = event.targetTouches[0].pageY;
    }

    touchMove(event: TouchEvent) {
        if (this.scrollTop > 0 && this.state == ESTATE.NONE) {
            return;
        }
        const diff = event.changedTouches[0].pageY - this.startY;
        if (this.state == ESTATE.NONE && diff > 0) {
            this.state = ESTATE.PULL;
        }
        if (this.state == ESTATE.PULL && diff >= this.maxHeight) {
            this.state = ESTATE.PULLED;
        }
        if (this.state == ESTATE.PULLED && diff < this.maxHeight) {
            this.state = ESTATE.CANCEL;
        }
        if (this.state == ESTATE.PULL) {
            this.topHeight = diff;
        }
    }

    touchEnd(event: TouchEvent) {
        if (this.scrollTop > 0) {
            return;
        }
        const diff = event.changedTouches[0].pageY - this.startY;
        if (this.state == ESTATE.PULL || this.state == ESTATE.CANCEL) {
            this.state = ESTATE.NONE;
            return;
        }
        if (this.state == ESTATE.PULLED) {
            this.$emit('refresh');
            return;
        }
    }

    animation(
        start: number, end: number, endHandle?: Function) {
        const diff = start > end ? -1 : 1;
        let step = 1;
        let handle = setInterval(() => {
            start += (step ++) * diff;
            if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
                clearInterval(handle);
                this.topHeight = end;
                endHandle && endHandle();
                return;
            }
            this.topHeight = start;
        }, 16);
    }

    reset() {
        this.animation(this.topHeight, 0, () => {
            this.state = ESTATE.NONE;
        });
    }

    //滚动条到底部的距离
    getScrollBottomHeight() {
        this.scrollTop = this.getScrollTop();
        return this.getPageHeight() - this.scrollTop - this.getWindowHeight();
    }

    //页面高度
    getPageHeight() {
        return document.querySelector("html").scrollHeight
    }

    //滚动条顶 高度
    getScrollTop() {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }

    getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
}
</script>
<style lang="scss">
.pull-to-refresh-scroll {
    min-height: 300px;
    .scroll-bottom,
    .scroll-top {
        text-align: center;
    }
    .scroll-top {
        position: relative;
        div {
            position: absolute;
            bottom: 10px;
            width: 100%;
        }
    }
}

</style>
