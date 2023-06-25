<template>
    <div>
        <div class="title">
            <span>手机号注册</span>
        </div>
        <div class="input-box">
            <input type="text" name="name" required autocomplete="off" v-model="input.name" placeholder="请输入昵称">
        </div>
        <div class="input-box">
            <input type="text" v-model="input.mobile" placeholder="请输入手机号">
        </div>
        <div class="code-input">
            <input type="text" v-model="input.code" placeholder="请输入短信验证码">
            <CountDown @click="tapSend"/>
        </div>
        <div class="input-box">
            <input type="password" v-model="input.password" placeholder="请输入密码">
        </div>
        <div class="input-box">
            <input type="password" name="confirm_password" required autocomplete="off" v-model="input.confirmPassword" placeholder="请确认密码">
        </div>
        <button  @click="tapRegister">注册</button>
        <div class="input-group">
            <div class="checkbox" @click="input.agree = !input.agree">
                <i :class="['iconfont', input.agree ? 'fa-check-circle' : 'fa-circle']"></i>
            </div>
            同意本站协议
        </div>

        <a class="footer-btn" @click="tapChange(5)">邮箱帐号注册
            <i class="iconfont fa-angle-right"></i>
        </a>
    </div>
</template>
<script setup lang="ts">
import CountDown from '@/components/CountDown.vue';
import { sendMobileCode } from '../../../api/user';
import Toast from '@/components/toast';
import { isMobile, isEmpty } from '../../../utils/validate';
import { reactive } from 'vue';

const emit = defineEmits(['click', 'back']);
const input = reactive({
    name: '',
    mobile: '',
    code: '',
    confirmPassword: '',
    password: '',
    agree: true
});
function tapChange(mode: number) {
    emit('click', mode);
}

function tapSend(btn: typeof CountDown) {
    if (!verifyMobile()) {
        Toast('请输入手机号');
        return;
    }
    sendMobileCode(input.mobile, 'register').then(res => {
        btn.start();
    });
}

function tapRegister() {
    const name = input.name;
    // const mobile = mobile;
    const password = input.password;
    if (isEmpty(name)) {
        Toast('请输入昵称');
        return;
    }
    if (!verifyMobile()) {
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
    if (input.confirmPassword !== password) {
        Toast('请两次密码不一致');
        return;
    }

}

function verifyMobile() {
    return !isEmpty(input.mobile) && isMobile(input.mobile);
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
