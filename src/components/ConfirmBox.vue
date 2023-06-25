<template>
  <div class="msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="msgbox" v-show="input.isVisible">
        <div class="msgbox-header" v-if="input.title !== ''">
          <div class="msgbox-title">{{ input.title }}</div>
        </div>
        <div class="msgbox-content" v-if="input.message !== ''">
          <div class="msgbox-message" v-html="input.message"></div>
        </div>
        <div class="msgbox-btns">
          <button :class="[ cancelButtonClasses ]" v-show="input.showCancelButton" @click="handleAction('cancel')">{{ input.cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]" v-show="input.showConfirmButton" @click="handleAction('confirm')">{{ input.confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

type ConfirmEvent = (action: string) => void;


const props = withDefaults(defineProps<{
    modal: boolean,
    showClose: boolean,
    lockScroll: boolean,
    closeOnClickModal: boolean,
    closeOnPressEscape: boolean,
    inputType: string,
}>(), {
    modal: true,
    showClose: true,
    lockScroll: false,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    inputType: 'text',
});

const callback = ref<ConfirmEvent| null>(null);

const input = reactive({
    title: '提示',
    isVisible: false,
    message: '',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '删除',
    confirmButtonClass: '',
    confirmButtonDisabled: false,
    cancelButtonClass: '',
    cancelButtonHighlight: false,
    confirmButtonHighlight: false,
});

const cancelButtonClasses = computed(() => {
    let classes = 'msgbox-btn msgbox-cancel ' + input.cancelButtonClass;
    if (input.cancelButtonHighlight) {
        classes += ' msgbox-cancel-highlight';
    }
    return classes;
});

const confirmButtonClasses = computed(() => {
    let classes = 'msgbox-btn msgbox-confirm ' + input.confirmButtonClass;
    if (input.confirmButtonHighlight) {
        classes += ' msgbox-confirm-highlight';
    }
    return classes;
});

function handleAction(action: string): void {
    input.isVisible = false;
    if (callback.value) {
        callback.value(action);
    }
}
</script>


<style lang="scss">
.msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    user-select: none;
    overflow: hidden;
    backface-visibility: hidden;
    transition: .2s;
    .msgbox-header {
        padding: 15px 0 0;
    }
    .msgbox-content {
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
    }
    .msgbox-input {
        padding-top: 15px;
        &input {
            border: 1px solid #dedede;
            border-radius: 5px;
            padding: 4px 5px;
            width: 100%;
            appearance: none;
            outline: none;
        }
        &input.invalid {
            border-color: #ff4949;
            &:focus {
                border-color: #ff4949;
            }
        }
    }
    .msgbox-errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
    }
    .msgbox-title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    .msgbox-message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
    }
    .msgbox-btns {
        display: flex;
        height: 40px;
        line-height: 40px;
    }
    .msgbox-btn {
        line-height: 35px;
        display: block;
        background-color: #fff;
        flex: 1;
        margin: 0;
        border: 0;

        &:focus {
            outline: none;
        }

        &:active {
            background-color: #fff;
        }
    }
    .msgbox-cancel {
        width: 50%;
        border-right: 1px solid #ddd;
        &:active {
            color: #000;
        }
    }
    .msgbox-confirm {
        color: #26a2ff;
        width: 50%;
        &:active {
            color: #26a2ff;
        }
    }
}

.msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>