<template>
    <div>
        <div class="logo">
            <img :src="props.logo" alt="">
        </div>
        <div class="phone-password">
            <div class="input-box">
                <MobileInput V-model="input.mobile"/>
            </div>
            <div class="input-box">
                <input type="password" v-model="input.password">
            </div>
            <div class="unlogin">
                <a href="">忘记密码</a>
                <a @click="tapChange(1)">使用短信验证登录</a>
            </div>
            <button class="btn btn-danger" @click="tapLogin">登录</button>
            <a @click="tapChange(0)" class="btn btn-outline-danger">其他登录方式</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import MobileInput from './MobileInput.vue';
import { isEmpty, isMobile } from '../../../utils/validate';
import { reactive } from 'vue';
import { useDialog } from '../../../components/Dialog/plugin';
import { useAuth } from '../../../services';

const auth = useAuth();
const toast = useDialog();
const emit = defineEmits(['toggle', 'back']);
const props = defineProps<{
    logo: string
}>();
const input = reactive({
    mobile: '',
    password: '',
});

function tapChange(mode: number) {
    emit('toggle', mode);
}

function tapLogin() {
    const mobile = input.mobile;
    const password = input.password;
    if (isEmpty(mobile) || !isMobile(mobile)) {
        toast.warning('请输入手机号');
        return;
    }
    if (!password || password.length < 4) {
        toast.warning('请输入密码');
        return;
    }
    auth.login({mobile, password}).then(() => {
        emit('back');
    });
}
</script>
<style lang="scss" scoped>

</style>
