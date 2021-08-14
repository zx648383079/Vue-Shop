<template>
    <div>
        <div class="logo">
            <img :src="logo" alt="">
        </div>
        <div class="email-password">
            <div class="input-box">
                <input type="email" name="email" required autocomplete="off" v-model="email" placeholder="请输入账号">
            </div>
            <div class="input-box">
                <input type="password" name="password" required autocomplete="off" @keyup="tapKey" v-model="password" placeholder="请输入密码">
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
<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import Toast from '@/components/toast';
import { dispatchLogin } from '@/store/dispatches';
import { IUser } from '@/api/model';
import { isEmpty, isEmail } from '../../../utils/validate';

export default class EmailLogin extends Vue {

    public email = '';
    public password = '';
    @Prop(String) public readonly logo!: string;

    public tapKey(e: KeyboardEvent) {
        if (e.code !== 'Enter') {
            return;
        }
        this.tapLogin();
    }

    public tapChange(mode: number) {
        this.$emit('click', mode);
    }

    public tapLogin() {
        const email = this.email;
        const password = this.password;
        if (isEmpty(email) || !isEmail(email)) {
            Toast('请输入账号');
            return;
        }
        if (!password || password.length < 4) {
            Toast('请输入密码');
            return;
        }
        dispatchLogin({email, password}).then(() => {
            this.$emit('back');
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
