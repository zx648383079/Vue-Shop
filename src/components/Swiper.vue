<template>
  <div class="swiper">
    <div class="swiper-items-wrap" ref="wrap">
      <slot></slot>
    </div>
    <div class="swiper-indicators" v-show="showIndicators">
      <div class="swiper-indicator"
        v-for="(page, $index) in pages"
        :class="{ 'is-active': $index === index }" :key="$index"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

export const on = (() => {
    if (!Vue.prototype.$isServer && document.addEventListener) {
        return (element: HTMLElement, event: string, handler: any) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return (element: any, event: string, handler: any) => {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (() => {
    if (!Vue.prototype.$isServer && document.removeEventListener) {
        return (element: HTMLElement, event: string, handler: any) => {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return (element: any, event: string, handler: any) => {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const once = (el: HTMLElement, event: string, fn: any) => {
    const listener = function(this: any) {
        if (fn) {
            fn.apply(this, arguments);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};

@Component
export default class Swiper extends Vue {

    @Prop({default: 300}) public readonly speed!: number;
    @Prop({default: 0}) public readonly defaultIndex!: number;
    @Prop({default: 3000}) public readonly auto!: number;
    @Prop({default: true}) public readonly continuous!: boolean;
    @Prop({default: true}) public readonly showIndicators!: boolean;
    @Prop({default: true}) public readonly noDragWhenSingle!: boolean;
    @Prop({default: false}) public readonly prevent!: boolean;
    @Prop({default: false}) public readonly stopPropagation!: boolean;

    public ready = false;
    public dragging = false;
    public userScrolling = false;
    public animating = false;
    public index = 0;
    public pages: HTMLElement[] = [];
    public timer: number = 0;
    public reInitTimer: number = 0;
    public noDrag = false;
    public isDone = false;
    public dragState: any = {};

    public created() {
        this.dragState = {};
    }

    @Watch('index')
    public onIndex(newIndex: number) {
        this.$emit('change', newIndex);
    }

    public swiperItemCreated(item: any) {
        if (!this.ready) {
            return;
        }
        clearTimeout(this.reInitTimer);
        this.reInitTimer = window.setTimeout(() => {
            this.reInitPages();
        }, 100);
      }

    public swiperItemDestroyed(item: any) {
        if (!this.ready) {
            return;
        }
        clearTimeout(this.reInitTimer);
        this.reInitTimer = window.setTimeout(() => {
            this.reInitPages();
        }, 100);
    }

    public rafTranslate(
        element: HTMLElement, initOffset: number, offset: number, callback: () => void, nextElement?: HTMLElement) {
        const alpha = 0.88;
        this.animating = true;
        let offset1 = initOffset;
        let raf = 0;

        function animationLoop(this: Swiper) {
            if (Math.abs(offset1 - offset) < 0.5) {
                this.animating = false;
                offset1 = offset;
                element.style.transform = '';
                if (nextElement) {
                    nextElement.style.transform = '';
                }
                cancelAnimationFrame(raf);

                if (callback) {
                    callback();
                }

                return;
            }

            offset1 = alpha * offset1 + (1.0 - alpha) * offset;
            element.style.transform = `translate3d(${offset1}px, 0, 0)`;

            if (nextElement) {
                nextElement.style.transform = `translate3d(${offset1 - offset}px, 0, 0)`;
            }

            raf = requestAnimationFrame(animationLoop.bind(this));
        }

        animationLoop.call(this);
    }

    public translate(element: HTMLElement, offset: number, speed?: number, callback?: (...args: any[]) => void) {
        if (speed) {
            this.animating = true;
            element.style.transition = 'transform ' + speed + 'ms ease-in-out';
            setTimeout(() => {
                element.style.transform = `translate3d(${offset}px, 0, 0)`;
            }, 50);

            let called = false;

            const transitionEndCallback = (...args: any[]) => {
                if (called) {
                    return;
                }
                called = true;
                this.animating = false;
                element.style.transition = '';
                element.style.transform = '';
                if (callback) {
                    callback.apply(this, args);
                }
            };

            once(element, 'transitionEnd', transitionEndCallback);
            setTimeout(transitionEndCallback, speed + 100);
            // webkitTransitionEnd maybe not fire on lower version android.
        } else {
            element.style.transition = '';
            element.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
    }

    public reInitPages() {
        const children = this.$children;
        this.noDrag = children.length === 1 && this.noDragWhenSingle;

        const pages: HTMLElement[] = [];
        const intDefaultIndex = Math.floor(this.defaultIndex);
        const defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0;
        this.index = defaultIndex;

        children.forEach((child, index) => {
            pages.push(child.$el as HTMLElement);

            child.$el.classList.remove('is-active');

            if (index === defaultIndex) {
                child.$el.classList.add('is-active');
            }
        });

        this.pages = pages;
      }

    public doAnimate(towards: string| null, options?: any) {
        if (this.$children.length === 0) {
            return;
        }
        if (!options && this.$children.length < 2) {
            return;
        }
        let prevPage: HTMLElement;
        let nextPage: HTMLElement;
        let currentPage: HTMLElement;
        let pageWidth: number;
        let offsetLeft: number;
        let speedX: number;
        const speed = this.speed || 300;
        const index = this.index;
        const pages = this.pages;
        const pageCount = pages.length;

        if (!options) {
            pageWidth = this.$el.clientWidth;
            currentPage = pages[index];
            prevPage = pages[index - 1];
            nextPage = pages[index + 1];
            if (this.continuous && pages.length > 1) {
                if (!prevPage) {
                    prevPage = pages[pages.length - 1];
                }
                if (!nextPage) {
                    nextPage = pages[0];
                }
            }
            if (prevPage) {
                prevPage.style.display = 'block';
                this.translate(prevPage, -pageWidth);
            }
            if (nextPage) {
                nextPage.style.display = 'block';
                this.translate(nextPage, pageWidth);
            }
        } else {
            prevPage = options.prevPage;
            currentPage = options.currentPage;
            nextPage = options.nextPage;
            pageWidth = options.pageWidth;
            offsetLeft = options.offsetLeft;
            speedX = options.speedX;
        }

        let newIndex: number;

        const oldPage = this.$children[index].$el;

        if (towards === 'prev') {
            if (index > 0) {
                newIndex = index - 1;
            }
            if (this.continuous && index === 0) {
                newIndex = pageCount - 1;
            }
        } else if (towards === 'next') {
            if (index < pageCount - 1) {
                newIndex = index + 1;
            }
            if (this.continuous && index === pageCount - 1) {
                newIndex = 0;
            }
        }

        const callback = () => {
            if (newIndex !== undefined) {
                const newPage = this.$children[newIndex].$el;
                oldPage.classList.remove('is-active');
                newPage.classList.add('is-active');

                this.index = newIndex;
            }
            if (this.isDone) {
                this.end();
            }

            if (prevPage) {
                prevPage.style.display = '';
            }

            if (nextPage) {
                nextPage.style.display = '';
            }
        };

        setTimeout(() => {
            if (towards === 'next') {
                this.isDone = true;
                this.before(currentPage);
                if (speedX) {
                    this.rafTranslate(currentPage, offsetLeft, -pageWidth, callback, nextPage);
                } else {
                    this.translate(currentPage, -pageWidth, speed, callback);
                    if (nextPage) {
                        this.translate(nextPage, 0, speed);
                    }
                }
            } else if (towards === 'prev') {
                this.isDone = true;
                this.before(currentPage);
                if (speedX) {
                    this.rafTranslate(currentPage, offsetLeft, pageWidth, callback, prevPage);
                } else {
                    this.translate(currentPage, pageWidth, speed, callback);
                    if (prevPage) {
                        this.translate(prevPage, 0, speed);
                    }
                }
            } else {
                this.isDone = false;
                this.translate(currentPage, 0, speed, callback);
                if (typeof offsetLeft !== 'undefined') {
                    if (prevPage && offsetLeft > 0) {
                        this.translate(prevPage, pageWidth * -1, speed);
                    }
                    if (nextPage && offsetLeft < 0) {
                        this.translate(nextPage, pageWidth, speed);
                    }
                } else {
                    if (prevPage) {
                        this.translate(prevPage, pageWidth * -1, speed);
                    }
                    if (nextPage) {
                        this.translate(nextPage, pageWidth, speed);
                    }
                }
            }
        }, 10);
    }

    public next() {
        this.doAnimate('next');
    }

    public prev() {
        this.doAnimate('prev');
    }

    public before(ele: HTMLElement) {
        this.$emit('before', this.index);
    }

    public end() {
        this.$emit('end', this.index);
    }

    public doOnTouchStart(event: TouchEvent) {
        if (this.noDrag) {
            return;
        }
        const element: HTMLElement = this.$el as HTMLElement;
        const dragState = this.dragState;
        const touch = event.touches[0];

        dragState.startTime = new Date();
        dragState.startLeft = touch.pageX;
        dragState.startTop = touch.pageY;
        dragState.startTopAbsolute = touch.clientY;

        dragState.pageWidth = element.offsetWidth;
        dragState.pageHeight = element.offsetHeight;

        let prevPage = this.$children[this.index - 1];
        const dragPage = this.$children[this.index];
        let nextPage = this.$children[this.index + 1];

        if (this.continuous && this.pages.length > 1) {
            if (!prevPage) {
                prevPage = this.$children[this.$children.length - 1];
            }
            if (!nextPage) {
                nextPage = this.$children[0];
            }
        }

        dragState.prevPage = prevPage ? prevPage.$el : null;
        dragState.dragPage = dragPage ? dragPage.$el : null;
        dragState.nextPage = nextPage ? nextPage.$el : null;

        if (dragState.prevPage) {
            dragState.prevPage.style.display = 'block';
        }

        if (dragState.nextPage) {
            dragState.nextPage.style.display = 'block';
        }
    }

    public doOnTouchMove(event: TouchEvent) {
        if (this.noDrag) {
            return;
        }
        const dragState = this.dragState;
        const touch = event.touches[0];

        dragState.speedX = touch.pageX - dragState.currentLeft;
        dragState.currentLeft = touch.pageX;
        dragState.currentTop = touch.pageY;
        dragState.currentTopAbsolute = touch.clientY;

        let offsetLeft = dragState.currentLeft - dragState.startLeft;
        const offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

        const distanceX = Math.abs(offsetLeft);
        const distanceY = Math.abs(offsetTop);
        if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
            this.userScrolling = true;
            return;
        } else {
            this.userScrolling = false;
            event.preventDefault();
        }
        offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);

        const towards = offsetLeft < 0 ? 'next' : 'prev';

        if (dragState.prevPage && towards === 'prev') {
            this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
        }
        this.translate(dragState.dragPage, offsetLeft);
        if (dragState.nextPage && towards === 'next') {
            this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
        }
    }

    public doOnTouchEnd(event: TouchEvent) {
        if (this.noDrag) {
            return;
        }
        const dragState = this.dragState;

        const dragDuration = new Date().getTime() - dragState.startTime;
        let towards = null;

        const offsetLeft = dragState.currentLeft - dragState.startLeft;
        const offsetTop = dragState.currentTop - dragState.startTop;
        const pageWidth = dragState.pageWidth;
        const index = this.index;
        const pageCount = this.pages.length;

        if (dragDuration < 300) {
            let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
            if (isNaN(offsetLeft) || isNaN(offsetTop)) {
                fireTap = true;
            }
            if (fireTap) {
                this.$children[this.index].$emit('tap');
            }
        }

        if (dragDuration < 300 && dragState.currentLeft === undefined) {
            return;
        }
        if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
            towards = offsetLeft < 0 ? 'next' : 'prev';
        }

        if (!this.continuous) {
            if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
                towards = null;
            }
        }

        if (this.$children.length < 2) {
            towards = null;
        }

        this.doAnimate(towards, {
            offsetLeft,
            pageWidth: dragState.pageWidth,
            prevPage: dragState.prevPage,
            currentPage: dragState.dragPage,
            nextPage: dragState.nextPage,
            speedX: dragState.speedX,
        });

        this.dragState = {};
    }

    public initTimer() {
        if (this.auto > 0 && !this.timer) {
            this.timer = window.setInterval(() => {
                if (!this.continuous && (this.index >= this.pages.length - 1)) {
                    return this.clearTimer();
                }
                if (!this.dragging && !this.animating) {
                    this.next();
                }
            }, this.auto);
        }
    }

    public clearTimer() {
        clearInterval(this.timer);
        this.timer = 0;
    }

    public destroyed() {
        if (this.timer > 0) {
            this.clearTimer();
        }
        if (this.reInitTimer > 0) {
            clearTimeout(this.reInitTimer);
            this.reInitTimer = 0;
        }
    }

    public mounted() {
        this.ready = true;

        this.initTimer();

        this.reInitPages();

        const element = this.$el;

        element.addEventListener('touchstart', (event: any) => {
            if (this.prevent) {
                event.preventDefault();
            }
            if (this.stopPropagation) {
                event.stopPropagation();
            }
            if (this.animating) {
                return;
            }
            this.dragging = true;
            this.userScrolling = false;
            this.doOnTouchStart(event);
        });

        element.addEventListener('touchmove', (event: any) => {
            if (!this.dragging) {
                return;
            }
            if (this.timer) {
                this.clearTimer();
            }
            this.doOnTouchMove(event);
        });

        element.addEventListener('touchend', (event: any) => {
            if (this.userScrolling) {
                this.dragging = false;
                this.dragState = {};
                return;
            }
            if (!this.dragging) {
                return;
            }
            this.initTimer();
            this.doOnTouchEnd(event);
            this.dragging = false;
        });
    }
}
</script>

<style lang="scss">
.swiper {
    overflow: hidden;
    position: relative;
    height: 100%;
    .swiper-items-wrap {
        position: relative;
        overflow: hidden;
        height: 100%;

        > div {
            position: absolute;
            transform: translateX(-100%);
            width: 100%;
            height: 100%;
            display: none;

            &.is-active {
                display: block;
                transform: none;
            }
        }
    }
    .swiper-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .swiper-indicator {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: 0.2;
        margin: 0 3px;

        &.is-active {
            background: #fff;
        }
    }
}
</style>