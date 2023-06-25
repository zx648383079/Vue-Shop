<template>
    <div class="pull-to-refresh-scroll" 
        ref="pullScroll"
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd">
        <div class="scroll-top" :style="{height: topHeight + 'px'}">
            <slot name="top">
                <div v-if="state == ESTATE.PULL">
                    <i class="iconfont fa-arrow-down"></i>
                    下拉刷新
                </div>
                 <div v-if="state == ESTATE.PULLED">
                    <i class="iconfont fa-arrow-up"></i>
                    松开刷新
                </div>
                <div v-if="state == ESTATE.REFRESHING">
                    <i class="iconfont fa-retweet"></i>
                    刷新中
                </div>
                 <div v-if="state == ESTATE.REFRESHED">
                    <i class="iconfont fa-check"></i>
                    刷新完成
                </div>
                <div v-if="state == ESTATE.CANCEL">
                    <i class="iconfont fa-arrow-up"></i>
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
                    <i class="iconfont fa-retweet"></i>
                    加载更多
                </div>
                 <div v-if="state == ESTATE.LOADING">
                    <i class="iconfont fa-check"></i>
                    加载中
                </div>
                <div v-if="state == ESTATE.LOADED">
                    <i class="iconfont fa-arrow-up"></i>
                    加载完成
                </div>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

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

export default defineComponent({
    props: {
        refresh: {type: Boolean, default: true},
        more: {type: Boolean, default: true},
        loading: {type: Boolean, default: false},
        distance: {type: Number, default: 10},
        maxHeight: {type: Number, default: 100},
    },
    data() {
        return {
            ESTATE: ESTATE,
            state: ESTATE.NONE,
            startY: 0,
            startUp: EDIRECTION.NONE, // 一开始滑动的方向
            scrollTop: 0,
            topHeight: 0,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    },
    computed: {
        box(): HTMLDivElement {
            return this.$refs.pullScroll as any;
        }
    },
    watch: {
        state(val: ESTATE, oldVal: ESTATE) {
            this.$emit('change', val, oldVal);
        },
        more(val: boolean) {
            if (!val && this.state === ESTATE.MORE) {
                this.state = ESTATE.NONE;
            }
        },
        topHeight(val: number, oldVal: number) {
            this.$emit('top.height.change', val, oldVal);
        },
        loading(val: number, oldVal: number) {
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
    },
    methods: {
        onScroll() {
            if (!this.more) {
                return;
            }
            if (this.getScrollBottomHeight() > this.distance) {
                return;
            }
            this.state = ESTATE.MORE;
            this.$emit('more');
        },
        touchStart(event: TouchEvent) {
            if (this.scrollTop > 0) {
                return;
            }
            this.startY = event.targetTouches[0].pageY;
            this.startUp = EDIRECTION.NONE;
        },
        touchMove(event: TouchEvent) {
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
        },
        touchEnd() {
            if (this.scrollTop > 0) {
                return;
            }
            // const diff = event.changedTouches[0].pageY - this.startY;
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
        },
        animation(
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
        },
        reset() {
            this.animation(this.topHeight, 0, () => {
                this.state = ESTATE.NONE;
            });
        },
        // 滚动条到底部的距离
        getScrollBottomHeight() {
            this.scrollTop = this.getScrollTop();
            return this.getPageHeight() - this.scrollTop - this.getWindowHeight();
        },
        // 页面高度
        getPageHeight() {
            const box = document.querySelector('html');
            if (!box) {
                return 0;
            }
            return box.scrollHeight
        },
        // 滚动条顶 高度
        getScrollTop() {
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
        },
        getWindowHeight() {
            let windowHeight = 0;
            if (document.compatMode === 'CSS1Compat') {
                windowHeight = document.documentElement.clientHeight;
            } else {
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
        }
    }
});
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
