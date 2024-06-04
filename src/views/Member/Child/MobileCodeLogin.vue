<template>
    <div>
        <div class="logo">
            <img :src="props.logo" alt="">
        </div>
        <div class="phone-code">
            <div class="input-box">
                <input type="text" v-model="input.mobile">
            </div>
            <div class="code-input">
                <input type="text" v-model="input.code">
                <CountDownButton @click="tapSend"/>
            </div>
            <div class="unlogin">
                <a href="">遇到问题？</a>
                <a @click="tapChange(2)">使用密码验证登录</a>
            </div>
            <button @click="tapLogin">登录</button>
            <a @click="tapChange(0)" class="btn btn-none">其他登录方式</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import CountDownButton from '@/components/CountDownButton.vue';
import { sendMobileCode } from '../../../api/user';
import { isEmpty, isMobile } from '../../../utils/validate';
import { reactive } from 'vue';
import { useAuthStore } from '../../../stores/auth';
import { useDialog } from '../../../components/Dialog/plugin';

const authStore = useAuthStore();
const toast = useDialog();
const emit = defineEmits(['click', 'back']);
const props = defineProps<{
    logo: string
}>();
const input = reactive({
    mobile: '',
    code: '',
});

function tapChange(mode: number) {
    emit('click', mode);
}

function tapSend(btn: typeof CountDown) {
    if (!verifyMobile()) {
        toast.warning('请输入手机号');
        return;
    }
    sendMobileCode(input.mobile, 'login').then(res => {
        btn.start();
    });
}

function tapLogin() {
    if (!verifyMobile()) {
        toast.warning('请输入手机号');
        return;
    }
    if (!input.code && input.code.length < 4) {
        toast.warning('请输入验证码');
        return;
    }
    authStore.loginUser({mobile: input.mobile, code: input.code})
        .then(() => {
        emit('back');
    });
}


function verifyMobile() {
    return !isEmpty(input.mobile) && isMobile(input.mobile);
}
</script>
<style lang="scss" scoped>

</style>
