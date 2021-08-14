<template>
    <div>
        <div class="dialog dialog-content" v-if="visible">
            <div class="title-bar">
                <span>一键登录解锁</span>
                <p class="small">选购优质商品，享受优质服务</p>
            </div>
            <a :class="['btn', agree ? '' : 'disabled']">微信授权登录</a>
            <a :class="['btn', 'btn-none', agree ? '' : 'disabled']">其他方式注册/登录</a>
            <div class="input-group">
                <div class="checkbox" @click="agree = !agree">
                    <i :class="['iconfont', agree ? 'fa-check-circle' : 'fa-circle']"></i>
                </div>
                我已阅读并同意
                <a href="">用户服务协议</a>
                及
                <a href="">隐私政策</a>
            </div>
        </div>
        <div class="dialog-bg" v-if="visible" @click="toggleVisible(false)"/>
    </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";


export default class LoginDialog extends Vue {
    @Prop(Boolean) public open!: boolean;
    public agree = true;
    public visible = !!this.open;

    @Watch('open')
    public onOpenChanged(val: boolean) {
        if (this.visible === val) {
            return;
        }
        this.toggleVisible(val);
    }

    public toggleVisible(visible = !this.visible) {
        this.visible = visible;
    }
}
</script>

<style lang="scss" scoped>
.dialog-content {
    top: auto;
    padding: 1.5rem 0 1rem;
}
.title-bar {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    .small {
        font-size: .8rem;
        margin-top: .5rem;
        color: #999;
    }
}
.btn {
    display: block;
    line-height: 2.5rem;
    height: 2.5rem;
    margin: 1rem 2rem;
    text-align: center;
    color: #fff;
    border: 1px solid #b4282d;
    background-color: #b4282d;
    cursor: pointer;
    &.btn-none {
        background-color: #fff;
        color: #b4282d;
    }
    &.disabled {
        cursor: not-allowed;
        opacity: .3;
    }
}
.input-group {
    text-align: center;
    font-size: .8rem;
    line-height: 2rem;
    user-select: none;
    .checkbox {
        display: inline-block;
        margin-right: .5rem;
        font-size: 1.5rem;
        vertical-align: middle;
        color: #999;
    }
    .fa-check-circle {
        color: #b4282d;
    }
}
</style>