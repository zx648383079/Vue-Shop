<template>
    <div class="mobile-input-group">
        <div class="code-input" v-if="visible && data && data.type === 'code'">
            <input type="text" v-model="model">
            <a @click="tapRefresh" i18n-title title="Click refresh">
                <img :src="data.image" i18n-alt alt="Refresh and retry">
                <i class="iconfont icon-refresh code-refresh-btn"></i>
            </a>
        </div>

        <div class="dialog-mask" v-if="visible && data && data.type !== 'code'"></div>

        <div class="code-modal" v-if="visible && data && data.type === 'slide'">
            <div class="modal-body" :style="{width: data.width + 'px', height: data.height + 'px'}">
                <div class="slide-image" v-for="(item, index) in data.imageItems" :key="index" :style="{'background-image': 'url(\'' + data.image+ '\')', 'background-position': item.x + 'px '+ item.y + 'px', width: item.width + 'px', height: item.height + 'px'}"></div>
                <div class="slide-control" :style="{'background-image': 'url(\'' + data.control + '\')', width: data.controlWidth + 'px', height: data.controlHeight + 'px', top: data.controlY + 'px', left: input.value + 'px'}"></div>
                <a class=" code-refresh-btn" @click="tapRefresh" i18n-title title="Click refresh">
                    <i class="iconfont icon-refresh"></i>
                </a>
            </div>
            <div class="slider-bar" 
                    @touchmove='touchMove'
                    @touchend='touchEnd'>
                <i @touchstart="touchStart" :style="{left: input.x + 'px'}"></i>
            </div>
        </div>
        <div class="code-modal" v-if="visible && data && data.type === 'hint'">
            <div class="modal-body" @click="onHint">
                <img :src="data.image" alt="">
                <i class="hint-item" v-for="(item, index) in input.maskItems" :key="index" :style="{left: item.x + 'px', top: item.y + 'px'}"></i>
            </div>
            <div class="code-hint-bar">
                <label i18n>Click on</label>
                <a @click="tapRefresh" i18n-title title="Click refresh">
                    <img :src="data.control" i18n-alt alt="Refresh and retry">
                    <i class="iconfont icon-refresh code-refresh-btn"></i>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getCaptcha } from '../../../api/user';
import type { ICaptcha, IPoint } from '../../../api/model';

const model = defineModel<string>();
const emit = defineEmits<(e: 'finish', data: any) => void>();
const props = defineProps<{
    token: string;
}>();
const visible = ref(false);
const data = ref<ICaptcha|null>(null);
const input = reactive<{
    value: any;
    x: number;
    maskItems: IPoint[],
    startX: number;
    isTouch: boolean;
}>({
    value: '',
    x: 0,
    maskItems: [],
    isTouch: false,
    startX: 0,
});

watch(() => props.token, () => {
    tapRefresh();
});

function tapRefresh() {
    getCaptcha(props.token).then(res => {
        if (!res.type) {
            res.type = 'code';
        }
        visible.value = true;
        data.value = res;
    });
}

// function open() {
//     visible.value = true;
// }

function touchStart(e: TouchEvent) {
    input.x = 0;
    input.isTouch = false;
    input.startX = e.targetTouches[0].clientX;
}

function touchMove(e: TouchEvent) {
    input.isTouch = true;
    input.x = Math.max(e.targetTouches[0].clientX - input.startX);
}

function touchEnd() {
    emit('finish', input.x);
}

function onHint(e: MouseEvent) {
    input.maskItems.push({
        x: e.offsetX,
        y: e.offsetY
    });
    if (input.maskItems.length === data.value?.count) {
        emit('finish', input.maskItems);
        return;
    }
}


</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.code-input {
    display: inline-flex;
    input {
        width: 6rem;
        height: 2.25rem;
        border-width: 1px;
        border-radius: $formRadius 0 0 $formRadius;
        padding: 0 .375rem;
        outline-width: 1px;
    }
    img {
        height: 2.25rem;
    }
    .code-refresh-btn {
        justify-content: flex-end;
    }
    a {
        &:hover {
            .code-refresh-btn {
                display: flex;
            }
        }
    }
}

.code-refresh-btn {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
    background-color: rgba($color: #fff, $alpha: .5);
    display: none;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
    color: var(--#{$prefix}-danger);
}

.modal-body {
    position: relative;
    user-select: none;
    .code-refresh-btn {
        font-size: 2rem;
    }
    &:hover {
        .code-refresh-btn {
            display: flex;
        }
    }
}

.slide-image {
    float: left;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
}
.slide-control {
    position: absolute;
    background-repeat: no-repeat;
    z-index: 9;
    box-shadow: 0 2px 2px rgba($color: #000, $alpha: .1);
}

$controlSize: 1.5rem;

.slider-bar {
    display: block;
    height: $controlSize;
    background-color: var(--#{$prefix}-panel);
    position: relative;
    text-align: center;
    line-height: $controlSize;
    i {
        position: absolute;
        display: inline-block;
        z-index: 9;
        top: 0;
        left: 0;
        height: $controlSize;
        width: $controlSize;
        background-color: var(--#{$prefix}-panel);
        border: 1px solid var(--bs-primary);
    }
    &::before {
        content: '>>>';
        font-size: .8rem;
        color: var(--#{$prefix}-border);
    }
}

.hint-item {
    position: absolute;
    display: block;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    background-color: var(--#{$prefix}-primary);
    margin-top: -.4rem;
    margin-left: -.4rem;
}

.code-hint-bar {
    position: relative;
    label {
        margin-right: .4rem;
    }
    .code-refresh-btn {
        justify-content: flex-end;
    }
    &:hover {
        .code-refresh-btn {
            display: flex;
        }
    }
}

.code-modal {
    position: fixed;
    padding: .8rem;
    border-radius: .4rem;
    background-color: var(--#{$prefix}-panel);
    box-shadow: 0 0 20px var(--#{$prefix}-shadow);
    left: 50%;
    margin-left: -10rem;
    top: 50%;
    margin-top: -5rem;
    z-index: 1300;
}
</style>