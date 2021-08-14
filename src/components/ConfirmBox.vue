<template>
  <div class="msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="msgbox" v-show="isVisible">
        <div class="msgbox-header" v-if="title !== ''">
          <div class="msgbox-title">{{ title }}</div>
        </div>
        <div class="msgbox-content" v-if="message !== ''">
          <div class="msgbox-message" v-html="message"></div>
        </div>
        <div class="msgbox-btns">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

type ConfirmEvent = (action: string) => void;

export default class ConfirmBox extends Vue {
    @Prop({default: true}) public readonly modal!: boolean;
    @Prop({default: true}) public readonly showClose!: boolean;
    @Prop({default: false}) public readonly lockScroll!: boolean;
    @Prop({default: true}) public readonly closeOnClickModal!: boolean;
    @Prop({default: true}) public readonly closeOnPressEscape!: boolean;
    @Prop({default: 'text'}) public readonly inputType!: boolean;

    public title = '提示';
    public isVisible = false;
    public message = '';
    public showConfirmButton = true;
    public showCancelButton = true;
    public confirmButtonText = '确认';
    public cancelButtonText = '删除';
    public confirmButtonClass = '';
    public confirmButtonDisabled = false;
    public cancelButtonClass = '';
    public callback: ConfirmEvent| null  = null;
    public cancelButtonHighlight = false;
    public confirmButtonHighlight = false;

    public get cancelButtonClasses(): string {
        let classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' msgbox-cancel-highlight';
        }
        return classes;
    }

    public get confirmButtonClasses(): string {
        let classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
            classes += ' msgbox-confirm-highlight';
        }
        return classes;
    }

    public handleAction(action: string): void {
        const callback = this.callback;
        this.isVisible = false;
        if (callback) {
            callback(action);
        }
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