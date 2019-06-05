<template>
    <div>
        <div class="logo">
            <img :src="'/assets/images/wap_logo.png' | assets" alt="">
        </div>
        <div class="phone-password">
            <div class="input-box">
                <input type="text" v-model="mobile">
            </div>
            <div class="input-box">
                <input type="password" v-model="password">
            </div>
            <div class="unlogin">
                <a href="">忘记密码</a>
                <a @click="tapChange(1)">使用短信验证登录</a>
            </div>
            <button>登录</button>
            <a @click="tapChange(0)" class="btn btn-none">其他登录方式</a>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Toast } from 'mint-ui';
import { IUser } from '../../../api/model';
import { dispatchLogin } from '../../../store/dispatches';

@Component
export default class MobileLogin extends Vue {

    public mobile: string = '';
    public password: string = '';

    public tapChange(mode: number) {
        this.$emit('click', mode);
    }

    public tapLogin() {
        const mobile = this.mobile;
        const password = this.password;
        if (!mobile && /^1\d{10}$/.test(mobile)) {
            Toast('请输入手机号');
            return;
        }
        if (!password || password.length < 4) {
            Toast('请输入密码');
            return;
        }
        dispatchLogin({mobile, password}).then((res: IUser) => {
            this.$emit('back');
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
