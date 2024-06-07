<template>
    <div>
        <div class="logo">
            <img :src="props.logo" alt="">
        </div>
        <div class="email-password">
            <div class="input-box">
                <input type="email" name="email" required autocomplete="off" v-model="input.email" placeholder="请输入账号">
            </div>
            <div class="input-box">
                <input type="password" name="password" required autocomplete="off" @keyup="tapKey" v-model="input.password" placeholder="请输入密码">
            </div>
            <CaptchaInput :token="input.captchaToken" v-model="input.captcha" @finish="onCaptchaFinish"/>
            <div class="unlogin">
                <a @click="tapChange(4)">注册账号</a>
                <a href="">忘记密码</a>
            </div>
            <ActionButton class="btn btn-danger" @tapped="tapLogin">登录</ActionButton>
            <a @click="tapChange(0)" class="btn btn-outline-danger">其他登录方式</a>
        </div>
        <TwoFactor/>
    </div>
</template>
<script setup lang="ts">
import CaptchaInput from './CaptchaInput.vue';
import TwoFactor from './TwoFactor.vue';
import ActionButton from '../../../components/ActionButton.vue';
import { isEmpty, isEmail } from '../../../utils/validate';
import { reactive } from 'vue';
import { useDialog } from '../../../components/Dialog/plugin';
import { useAuth } from '../../../services';
import type { IErrorResponse, ILogin } from '../../../api/model';
import type { ButtonEvent } from '../../../components/types';

const auth = useAuth();
const toast = useDialog();
const emit = defineEmits(['toggle', 'back']);
const props = defineProps<{
    logo: string
}>();
const input = reactive<{
    email: string,
    password: string,
    captchaToken: string,
    captcha: any
}>({
    email: '',
    password: '',
    captchaToken: '',
    captcha: ''
});

function tapKey(e: KeyboardEvent) {
    if (e.code !== 'Enter') {
        return;
    }
    tapLogin();
}

function tapChange(mode: number) {
    emit('toggle', mode);
}

function onCaptchaFinish(data: any) {
    submitLogin({
        email: input.email, 
        password: input.password,
        captcha_token: input.captchaToken,
        captcha: data
    });
}

function tapLogin(e?: ButtonEvent) {
    const email = input.email;
    const password = input.password;
    if (isEmpty(email) || !isEmail(email)) {
        toast.warning('请输入账号');
        return;
    }
    if (!password || password.length < 4) {
        toast.warning('请输入密码');
        return;
    }
    const data: ILogin = {email, password};
    if (input.captchaToken) {
        data.captcha_token = input.captchaToken;
        data.captcha = input.captcha;
    }
    submitLogin(data, e);
}

function submitLogin(data: ILogin, e?: ButtonEvent) {
    e?.enter();
    auth.login(data).then(() => {
        e?.reset();
        emit('back');
    }).catch(err => {
        e?.reset();
        const res = err.response?.data as IErrorResponse;
        if (res.captcha_token) {
            input.captchaToken = res.captcha_token;
        }
        // this.tapCaptcha();
        // if (res.code === 1015) {
        //     this.mode = 8;
        // }
    });
}
</script>
<style lang="scss" scoped>

</style>
