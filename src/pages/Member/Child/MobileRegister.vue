<template>
    <div>
        <div class="title">
            <span>手机号注册</span>
        </div>
        <div class="input-box">
            <input type="text" name="name" required autocomplete="off" v-model="name" placeholder="请输入昵称">
        </div>
        <div class="input-box">
            <input type="text" v-model="mobile" placeholder="请输入手机号">
        </div>
        <div class="code-input">
            <input type="text" v-model="code" placeholder="请输入短信验证码">
            <CountDown @click="tapSend"/>
        </div>
        <div class="input-box">
            <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="input-box">
            <input type="password" name="confirm_password" required autocomplete="off" v-model="confirmPassword" placeholder="请确认密码">
        </div>
        <button  @click="tapRegister">注册</button>
        <div class="input-group">
            <div class="checkbox" @click="agree = !agree">
                <i :class="['far', agree ? 'fa-check-square' : 'fa-square']"></i>
            </div>
            同意本站协议
        </div>

        <a class="footer-btn" @click="tapChange(5)">邮箱帐号注册
            <i class="fa fa-angle-right"></i>
        </a>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import CountDown from '@/components/CountDown.vue';
import { sendCode } from '../../../api/user';
import Toast from '@/components/toast.ts';
import { isMobile, isEmpty } from '../../../utils/validate';

@Component({
    components: {
        CountDown,
    },
})
export default class MobileRegister extends Vue {
    public agree = true;
    public name: string = '';
    public mobile: string = '';
    public code: string = '';
    public password: string = '';
    public confirmPassword: string = '';

    public tapChange(mode: number) {
        this.$emit('click', mode);
    }

    public tapSend(btn: CountDown) {
        if (!this.verifyMobile()) {
            Toast('请输入手机号');
            return;
        }
        sendCode({
            mobile: this.mobile,
            scene: 'register',
        }).then(res => {
            btn.start();
        });
    }

    public tapRegister() {
        const name = this.name;
        const mobile = this.mobile;
        const password = this.password;
        if (isEmpty(name)) {
            Toast('请输入昵称');
            return;
        }
        if (!this.verifyMobile()) {
            Toast('请输入手机号');
            return;
        }
        if (isEmpty(password)) {
            Toast('请输入密码');
            return;
        }
        if (password.length < 4) {
            Toast('请密码长度必须大于4');
            return;
        }
        if (this.confirmPassword !== password) {
            Toast('请两次密码不一致');
            return;
        }

    }

    public verifyMobile() {
        return !isEmpty(this.mobile) && isMobile(this.mobile);
    }

}
</script>
<style lang="scss" scoped>
.title {
    font-size: 20px;
    line-height: 80px;
    color: #333;
    margin-bottom: 10vh;
}
.checkbox {
    display: inline-block;
}
.footer-btn {
    text-align: center;
    line-height: 30px;
    margin-top: 40px;
    display: block;
}
</style>
