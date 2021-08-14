<template>
  <transition name="toast-pop">
    <div class="toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <i class="toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class ToastBox extends Vue {
    @Prop(String) public readonly message!: string;
    @Prop({default: ''}) public readonly className!: string;
    @Prop({default: 'middle'}) public readonly position!: string;
    @Prop({default: 'middle'}) public readonly iconClass!: string;

    public visible = false;
    public closed = false;

    public get customClass() {
        const classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);

        return classes.join(' ');
    }

}
</script>

<style lang="scss">
.toast {
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;
    .toast-icon {
        display: block;
        text-align: center;
        font-size: 56px;
    }
    .toast-text {
        font-size: 14px;
        display: block;
        text-align: center;
    }
    &.is-placetop {
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    &.is-placemiddle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &.is-placebottom {
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    &.toast-pop-enter, 
    &.toast-pop-leave-active {
        opacity: 0;
    }
}

</style>