<template>
    <div>
        <div class="title">
            <span>手机号注册</span>
        </div>
        <div class="input-box">
            <input type="text" name="name" required autocomplete="off" v-model="input.name" placeholder="请输入昵称">
        </div>
        <div class="input-box">
            <MobileInput V-model="input.mobile"/>
        </div>
        <div class="code-input">
            <input type="text" v-model="input.code" placeholder="请输入短信验证码">
            <CountDownButton @tapped="tapSend"/>
        </div>
        <div class="input-box">
            <input type="password" v-model="input.password" placeholder="请输入密码">
        </div>
        <div class="input-box">
            <input type="password" name="confirm_password" required autocomplete="off" v-model="input.confirmPassword" placeholder="请确认密码">
        </div>
        <button class="btn btn-danger" @click="tapRegister">注册</button>
        <div class="input-group">
            <div class="checkbox" @click="input.agree = !input.agree">
                <i :class="['iconfont', input.agree ? 'icon-check-circle' : 'icon-circle']"></i>
            </div>
            同意<AgreementDialog @confirm="input.agree = true">本站协议</AgreementDialog>
        </div>

        <a class="footer-btn btn btn-outline-primary" @click="tapChange(5)">邮箱帐号注册
            <i class="iconfont icon-chevron-right"></i>
        </a>
    </div>
</template>
<script setup lang="ts">
import MobileInput from './MobileInput.vue';
import CountDownButton from '@/components/CountDownButton.vue';
import AgreementDialog from './AgreementDialog.vue';
import { sendMobileCode } from '../../../api/user';
import { isMobile, isEmpty } from '../../../utils/validate';
import { reactive } from 'vue';
import { useDialog } from '../../../components/Dialog/plugin';
import { useAuth } from '../../../services';

const toast = useDialog();
const auth = useAuth();
const emit = defineEmits(['toggle', 'back']);
const input = reactive({
    name: '',
    mobile: '',
    code: '',
    confirmPassword: '',
    password: '',
    agree: false
});
function tapChange(mode: number) {
    emit('toggle', mode);
}

function tapSend(btn: typeof CountDownButton) {
    if (!verifyMobile()) {
        toast.warning('请输入手机号');
        return;
    }
    sendMobileCode(input.mobile, 'register').then(res => {
        btn.start();
    });
}

function tapRegister() {
    const name = input.name;
    const mobile = input.mobile;
    const password = input.password;
    if (isEmpty(name)) {
        toast.warning('请输入昵称');
        return;
    }
    if (!verifyMobile()) {
        toast.warning('请输入手机号');
        return;
    }
    if (isEmpty(password)) {
        toast.warning('请输入密码');
        return;
    }
    if (password.length < 4) {
        toast.warning('请密码长度必须大于4');
        return;
    }
    if (input.confirmPassword !== password) {
        toast.warning('请两次密码不一致');
        return;
    }
    auth.register({name, mobile, password, confirm_password: input.confirmPassword, agree: input.agree}).then(res => {
        
    });
}

function verifyMobile() {
    return !isEmpty(input.mobile) && isMobile(input.mobile);
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.title {
    font-size: 1.25rem;
    line-height: 5rem;
    color: var(--#{$prefix}-body-text);
    margin-bottom: 10vh;
}
.checkbox {
    display: inline-block;
}
.footer-btn {
    text-align: center;
    margin-top: 2.5rem;
    display: block;
}
</style>
