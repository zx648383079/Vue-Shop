<template>
    <div>
        <div class="title">
            <span>邮箱注册</span>
        </div>
        <div class="input-box">
            <input type="text" name="name" required autocomplete="off" v-model="input.name" placeholder="请输入昵称">
        </div>
        <div class="input-box">
            <input type="email" name="email" required autocomplete="off" v-model="input.email" placeholder="请输入账号">
        </div>
        <div class="input-box">
            <input type="password" name="password" required autocomplete="off" v-model="input.password" placeholder="请输入密码">
        </div>
        <div class="input-box">
            <input type="password" name="confirm_password" required autocomplete="off" @keyup="tapKey" v-model="input.confirmPassword" placeholder="请确认密码">
        </div>
        <button class="btn btn-danger" @click="tapRegister">注册</button>
        <div class="input-group">
            <div class="checkbox" @click="input.agree = !input.agree">
                <i :class="['iconfont', input.agree ? 'icon-check-circle' : 'icon-circle']"></i>
            </div>
            <i18n-t keypath="agreement_tip" tag="span">
                <template #link>
                    <AgreementDialog @confirm="input.agree = true">{{ $t('agreement_name') }}</AgreementDialog>
                </template>
            </i18n-t>
            
        </div>
    </div>
</template>
<script setup lang="ts">
import AgreementDialog from './AgreementDialog.vue';
import { reactive } from 'vue';
import { isEmpty, isEmail } from '../../../utils/validate';
import { useDialog } from '../../../components/Dialog/plugin';
import { useAuth } from '../../../services';

const toast = useDialog();
const auth = useAuth();
const input = reactive({
    name: '',
    email: '',
    confirmPassword: '',
    password: '',
    agree: false
});

function tapKey(e: KeyboardEvent) {
    if (e.key !== 'Enter') {
        return;
    }
}

function tapRegister() {
    const name = input.name;
    const email = input.email;
    const password = input.password;
    if (isEmpty(name)) {
        toast.warning('请输入昵称');
        return;
    }
    if (isEmpty(email) || !isEmail(email)) {
        toast.warning('请输入邮箱');
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
    auth.register({name, email, password, confirm_password: input.confirmPassword, agree: input.agree}).then(res => {

    });
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
</style>
