<template>
    <div class="swipe-row" :style="{left: left + 'px'}">
        <div class="actions-left" ref="left">
            <slot name="left"></slot>
        </div>
        <div :class="['swipe-content', name]"  
            @touchstart='touchStart'
            @touchmove='touchMove'
            @touchend='touchEnd'>
            <slot></slot>
        </div>
        <div class="actions-right" ref="right">
            <slot name="right">
                <i class="fa fa-trash" @click="tapRemove"></i>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class SwipeRow extends Vue {
    @Prop([String, Array]) public readonly name!: string| string[];
    @Prop([Number, String]) public readonly index!: number|string;
    public oldLeft: number = 0;
    public left = 0;
    public startX = 0;
    public isTouch = false;
    public leftBox: HTMLDivElement | null = null;
    public rightBox: HTMLDivElement | null = null;

    public mounted() {
        this.leftBox = this.$refs.left as HTMLDivElement;
        this.rightBox = this.$refs.right as HTMLDivElement;
    }

    public getLeftWidth(): number {
        if (!this.leftBox) {
            return 0;
        }
        return this.leftBox.clientWidth || this.leftBox.offsetWidth;
    }

    public getRightWidth(): number {
        if (!this.rightBox) {
            return 0;
        }
        return this.rightBox.clientWidth || this.rightBox.offsetWidth;
    }

    public tapRemove(item: any) {
        this.$emit('remove', item);
    }

    public touchStart(e: TouchEvent) {
        this.resetOther();
        this.oldLeft = this.left;
        this.isTouch = false;
        this.startX = e.targetTouches[0].clientX;
    }

    public touchMove(e: TouchEvent) {
        this.isTouch = true;
        const diff = e.targetTouches[0].clientX - this.startX;
        if (this.oldLeft === 0) {
            if (diff < 0) {
                this.left = Math.max(diff, -this.getRightWidth());
                return;
            }
            this.left = Math.min(diff, this.getLeftWidth());
            return;
        }
        if (this.oldLeft > 0) {
            if (diff > 0) {
                return;
            }
            this.left =  Math.max(this.oldLeft + diff, 0);
            return;
        }
        if (diff < 0) {
            return;
        }
        this.left = Math.min(this.oldLeft + diff, 0);
    }

    public touchEnd(e: TouchEvent) {
        if (!this.isTouch) {
            this.animation(this.left, 0);
            this.$emit('click');
            return;
        }
        // const diff = e.changedTouches[0].clientX - this.startX;
        if (this.left === 0) {
            return;
        }
        if (this.left > 0) {
            const width = this.getLeftWidth();
            this.animation(this.left, this.left * 3 > width ? width : 0);
            return;
        }
        const w = - this.getRightWidth();
        this.animation(this.left, this.left * 3 < w ? w : 0);
    }

    public animation(
        start: number, end: number, endHandle?: () => void) {
        const diff = start > end ? -1 : 1;
        let step = 1;
        const handle = setInterval(() => {
            start += (step ++) * diff;
            if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
                clearInterval(handle);
                this.left = end;
                if (typeof endHandle === 'function') {
                    endHandle();
                }
                return;
            }
            this.left = start;
        }, 16);
    }

    public reset() {
        if (this.left === 0) {
            return;
        }
        this.animation(this.left, 0);
    }

    public resetOther() {
        if (typeof this.index === 'undefined') {
            return;
        }
        const items: SwipeRow[] = this.$parent.$refs.swiperow as SwipeRow[];
        if (!items || items.length < 1) {
            return;
        }
        for (const item of items) {
            if (item.index === this.index) {
                continue;
            }
            item.reset();
        }
    }
}
</script>

<style lang="scss">
$white: #fff;
$primary: rgb(0, 187, 72);
$danger: #BB0000;
.swipe-row {
    width: 100%;
    position: relative;
    height: 5rem; 
    padding: 0;
    margin: 0;
    transition: left .5s;
    .swipe-content {
        width: 100%;
        display: block;
        height: 5rem;
    }
    .actions-left,
    .actions-right {
        position: absolute;
        height: 5rem; 
        min-height: 5rem;
        max-height: 5rem;
        text-align: center;
        font-size: 1.375rem;
        top: 0;
        white-space: nowrap;
        .fa {
            font-size: 1.875rem;
            padding: 1.5625rem 0.9375rem;
        }
        a {
            color: $white;
            text-decoration: none;
        }
    }
    .actions-left {
        color: $white;
        background-color: $primary;
        right: 100%;
    }
    .actions-right {
        color: $white;
        background-color: $danger;
        left: 100%;
    }
}
</style>


