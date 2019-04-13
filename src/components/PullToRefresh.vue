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
    LOADED = 8,
}

enum EDIRECTION {
    NONE = 0,
    DOWN = 1,
    UP = 2,
}

@Component
export default class PullToRefresh extends Vue {
    @Prop({type: Boolean, default: true}) public readonly refresh!: boolean;
    @Prop({type: Boolean, default: true}) public readonly more!: boolean;
    @Prop({type: Number, default: 10}) public readonly distance!: number;
    @Prop({type: Boolean, default: false}) public readonly loading!: boolean;
    @Prop({type: Number, default: 100}) public readonly maxHeight!: number;

    public ESTATE = ESTATE;
    public state: ESTATE = ESTATE.NONE;
    public startY: number = 0;
    public startUp: EDIRECTION = EDIRECTION.NONE; // 一开始滑动的方向
    public box: HTMLDivElement | null = null;
    public scrollTop: number = 0;
    public topHeight = 0;

    public mounted() {
        this.box = this.$refs.pullScroll as HTMLDivElement;
        window.addEventListener('scroll', this.onScroll)
    }

    public beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    }

    @Watch('state')
    public onStateChanged(val: ESTATE, oldVal: ESTATE) {
        this.$emit('change', val, oldVal);
    }

    @Watch('more')
    public onMoreChanged(val: boolean, oldVal: boolean) {
        if (!val && this.state === ESTATE.MORE) {
            this.state = ESTATE.NONE;
        }
    }

    @Watch('topHeight')
    public onToHeightChanged(val: number, oldVal: number) {
        this.$emit('top.height.change', val, oldVal);
    }

    @Watch('loading')
    public onLoadingChanged(val: number, oldVal: number) {
        if (val && !oldVal) {
            if (this.state === ESTATE.PULLED) {
                this.state =  ESTATE.REFRESHING;
                return;
            }
            if (this.state === ESTATE.MORE) {
                this.state =  ESTATE.LOADING;
                return;
            }
        }

        if (oldVal && !val) {
            if (this.state === ESTATE.LOADING) {
                this.state = ESTATE.LOADED;
                this.reset();
                return;
            }
            if (this.state === ESTATE.REFRESHING) {
                this.state = ESTATE.REFRESHED;
                this.reset();
                return;
            }
            if (this.state === ESTATE.MORE) {
                this.state =  ESTATE.NONE;
                return;
            }
        }
    }

    public onScroll(event: any) {
        if (!this.more) {
            return;
        }
        if (this.getScrollBottomHeight() > this.distance) {
            return;
        }
        this.state = ESTATE.MORE;
        this.$emit('more');
    }

    public touchStart(event: TouchEvent) {
        if (this.scrollTop > 0) {
            return;
        }
        this.startY = event.targetTouches[0].pageY;
        this.startUp = EDIRECTION.NONE;
    }

    public touchMove(event: TouchEvent) {
        if (this.scrollTop > 0 && this.state === ESTATE.NONE) {
            return;
        }
        const diff = event.changedTouches[0].pageY - this.startY;
        if (this.startUp === EDIRECTION.NONE) {
            this.startUp = diff > 0 ? EDIRECTION.DOWN : EDIRECTION.UP;
        }
        // 进行滑动操作
        if (this.startUp === EDIRECTION.DOWN) {
            if (this.state === ESTATE.NONE && diff > 0) {
                this.state = ESTATE.PULL;
            }
            if (this.state === ESTATE.PULL && diff >= this.maxHeight) {
                this.state = ESTATE.PULLED;
            }
            if (this.state === ESTATE.PULLED && diff < this.maxHeight) {
                this.state = ESTATE.CANCEL;
            }
            if (this.state === ESTATE.PULL) {
                this.topHeight = diff;
            }
        }
        // 上拉加载更多
        if (this.startUp === EDIRECTION.UP && this.more) {
            this.state = Math.abs(diff) > this.distance ? ESTATE.MORE : ESTATE.NONE;
        }
    }

    public touchEnd(event: TouchEvent) {
        if (this.scrollTop > 0) {
            return;
        }
        const diff = event.changedTouches[0].pageY - this.startY;
        if (this.state === ESTATE.PULL || this.state === ESTATE.CANCEL) {
            this.state = ESTATE.NONE;
            return;
        }
        if (this.state === ESTATE.PULLED) {
            this.$emit('refresh');
            return;
        }
        if (this.state === ESTATE.MORE) {
            this.$emit('more');
        }
    }

    public animation(
        start: number, end: number, endHandle?: () => void) {
        const diff = start > end ? -1 : 1;
        let step = 1;
        const handle = setInterval(() => {
            start += (step ++) * diff;
            if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
                clearInterval(handle);
                this.topHeight = end;
                if (endHandle) {
                    endHandle();
                }
                return;
            }
            this.topHeight = start;
        }, 16);
    }

    public reset() {
        this.animation(this.topHeight, 0, () => {
            this.state = ESTATE.NONE;
        });
    }

    // 滚动条到底部的距离
    public getScrollBottomHeight() {
        this.scrollTop = this.getScrollTop();
        return this.getPageHeight() - this.scrollTop - this.getWindowHeight();
    }

    // 页面高度
    public getPageHeight() {
        const box = document.querySelector('html');
        if (!box) {
            return 0;
        }
        return box.scrollHeight
    }

    // 滚动条顶 高度
    public getScrollTop() {
        let scrollTop = 0;
        let bodyScrollTop = 0;
        let documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }

    public getWindowHeight() {
        let windowHeight = 0;
        if (document.compatMode === 'CSS1Compat') {
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
