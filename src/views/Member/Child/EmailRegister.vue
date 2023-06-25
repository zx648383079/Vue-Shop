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
        <button @click="tapRegister">注册</button>
        <div class="input-group">
            <div class="checkbox" @click="input.agree = !input.agree">
                <i :class="['iconfont', input.agree ? 'fa-check-circle' : 'fa-circle']"></i>
            </div>
            同意本站协议
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { isEmpty, isEmail } from '../../../utils/validate';
import Toast from '@/components/toast';

const input = reactive({
    name: '',
    email: '',
    confirmPassword: '',
    password: '',
    agree: true
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
        Toast('请输入昵称');
        return;
    }
    if (isEmpty(email) || !isEmail(email)) {
        Toast('请输入邮箱');
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
