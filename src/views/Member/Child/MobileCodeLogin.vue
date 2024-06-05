<template>
    <div>
        <div class="logo">
            <img :src="props.logo" alt="">
        </div>
        <div class="phone-code">
            <div class="input-box">
                <MobileInput V-model="input.mobile"/>
            </div>
            <div class="code-input">
                <input type="text" v-model="input.code">
                <CountDownButton @tapped="tapSend"/>
            </div>
            <div class="unlogin">
                <a href="#">遇到问题？</a>
                <a @click="tapChange(2)">使用密码验证登录</a>
            </div>
            <button class="btn btn-danger" @click="tapLogin">登录</button>
            <div class="input-group mb-1">
                <div class="checkbox" @click="input.agree = !input.agree">
                    <i :class="['iconfont', input.agree ? 'icon-check-circle' : 'icon-circle']"></i>
                </div>
                同意<AgreementDialog @confirm="input.agree = true">本站协议</AgreementDialog>
            </div>
            <a @click="tapChange(0)" class="btn btn-outline-danger">其他登录方式</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import CountDownButton from '@/components/CountDownButton.vue';
import MobileInput from './MobileInput.vue';
import AgreementDialog from './AgreementDialog.vue';
import { sendMobileCode } from '../../../api/user';
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
    code: '',
    agree: false,
});

function tapChange(mode: number) {
    emit('toggle', mode);
}

function tapSend(btn: typeof CountDownButton) {
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
    auth.login({mobile: input.mobile, code: input.code, agree: input.agree})
    .then(() => {
        emit('back');
    });
}


function verifyMobile() {
    return !isEmpty(input.mobile) && isMobile(input.mobile);
}
</script>
<style lang="scss" scoped>
.checkbox {
    display: inline-block;
}
</style>
