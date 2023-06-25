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
            <div class="unlogin">
                <a @click="tapChange(4)">注册账号</a>
                <a href="">忘记密码</a>
            </div>
            <button @click="tapLogin">登录</button>
            <a @click="tapChange(0)" class="btn btn-none">其他登录方式</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import Toast from '@/components/toast';
import { isEmpty, isEmail } from '../../../utils/validate';
import { reactive } from 'vue';
import { useAuthStore } from '../../../stores/auth';

const authStore = useAuthStore();
const emit = defineEmits(['click', 'back']);
const props = defineProps<{
    logo: string
}>();
const input = reactive({
    email: '',
    password: '',
});

function tapKey(e: KeyboardEvent) {
    if (e.code !== 'Enter') {
        return;
    }
    tapLogin();
}

function tapChange(mode: number) {
    emit('click', mode);
}

function tapLogin() {
    const email = input.email;
    const password = input.password;
    if (isEmpty(email) || !isEmail(email)) {
        Toast('请输入账号');
        return;
    }
    if (!password || password.length < 4) {
        Toast('请输入密码');
        return;
    }
    authStore.loginUser({email, password}).then(() => {
        emit('back');
    });
}
</script>
<style lang="scss" scoped>

</style>
