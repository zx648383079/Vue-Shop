<template>
    <div class="count-down" :class="{disable: disable}" @click="tapClick">
        <span>{{ text }}</span>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class CountDown extends Vue {

    @Prop({type: Number, default: 60}) public readonly time!: number;

    public text: string = '获取验证码';

    public disable: boolean = false;

    public handle: number = 0;

    public tapClick() {
        if (this.disable) {
            return;
        }
        this.$emit('click', this);
    }

    public start(time: number = 0) {
        this.disable = true;
        if (time < 1) {
            time = this.time;
        }
        this.text = time.toString();
        this.handle = setInterval(() => {
            time --;
            if (time <= 0) {
                clearInterval(this.handle);
                this.disable = false;
                this.handle = 0;
                this.text = '重新获取';
                return;
            }
            this.text = time.toString();
        }, 1000);
    }

    public reset() {
        if (this.disable) {
            this.disable = true;
        }
        if (this.handle > 0) {
            clearInterval(this.handle);
        }
        this.handle = 0;
        this.text = '获取验证码';
    }

}
</script>
<style lang="scss" scoped>
.count-down {
    line-height: 40px;
    background-color: aquamarine;
    &.disable {
        background-color: #ccc;
    }
}
</style>