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
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            oldLeft: 0,
            left: 0,
            startX: 0,
            isTouch: false,
        };
    },
    props: {
        name: String|Array,
        index: Number|String,
    },
    methods: {
        getLeftWidth(): number {
            return this.$refs.left.clientWidth || this.$refs.left.offsetWidth;
        },
        getRightWidth(): number {
            return this.$refs.right.clientWidth || this.$refs.right.offsetWidth;
        },
        tapRemove(item: any) {
            this.$emit('remove', item);
        },
        touchStart(e: TouchEvent) {
            this.resetOther();
            this.oldLeft = this.left;
            this.isTouch = false;
            this.startX = e.targetTouches[0].clientX;
        },
        touchMove(e: TouchEvent) {
            this.isTouch = true;
            const diff = e.targetTouches[0].clientX - this.startX;
            if (this.oldLeft == 0) {
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
        },
        touchEnd(e: TouchEvent) {
            if (!this.isTouch) {
                this.animation(this.left, 0);
                this.$emit('click');
                return;
            }
            //const diff = e.changedTouches[0].clientX - this.startX;
            if (this.left == 0) {
                return;
            }
            if (this.left > 0) {
                const width = this.getLeftWidth();
                this.animation(this.left, this.left * 3 > width ? width : 0);
                return;
            }
            const width = - this.getRightWidth();
            this.animation(this.left, this.left * 3 < width ? width : 0);
        },
        animation(
            start: number, end: number, endHandle?: Function) {
            const diff = start > end ? -1 : 1;
            let step = 1;
            let handle = setInterval(() => {
                start += (step ++) * diff;
                if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
                    clearInterval(handle);
                    this.left = end;
                    endHandle && endHandle();
                    return;
                }
                this.left = start;
            }, 16);
        },
        reset() {
            if (this.left === 0) {
                return;
            }
            this.animation(this.left, 0);
        },
        resetOther() {
            if (!this.index) {
                return;
            }
            if (!this.$parent.$refs.swiperow || this.$parent.$refs.swiperow.length < 1) {
                return;
            }
            for (let i = 0; i < this.$parent.$refs.swiperow.length; i++) {
                if (this.$parent.$refs.swiperow[i].index == this.index) {
                    continue;
                }
                this.$parent.$refs.swiperow[i].reset();
            }
        }
    }
})
</script>

