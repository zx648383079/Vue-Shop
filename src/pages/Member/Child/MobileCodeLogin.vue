<template>
    <div>
        <div class="logo">
            <img :src="'/assets/images/wap_logo.png' | assets" alt="">
        </div>
        <div class="phone-code">
            <div class="input-box">
                <input type="text" v-model="mobile">
            </div>
            <div class="code-input">
                <input type="text" v-model="code">
                <CountDown @click="tapSend"/>
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
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import CountDown from '@/components/CountDown.vue';
import { Toast } from 'mint-ui';
import { IUser } from '../../../api/model';
import { dispatchLogin } from '../../../store/dispatches';

@Component({
    components: {
        CountDown,
    },
})
export default class MobileCodeLogin extends Vue {

    public mobile: string = '';
    public code: string = '';

    public tapChange(mode: number) {
        this.$emit('click', mode);
    }

    public tapSend(btn: CountDown) {
        if (!this.verifyMobile()) {
            Toast('请输入手机号');
            return;
        }
        btn.start();
    }

    public tapLogin() {
        if (!this.verifyMobile()) {
            Toast('请输入手机号');
            return;
        }
        if (!this.code && this.code.length < 4) {
            Toast('请输入验证码');
            return;
        }
        dispatchLogin({mobile: this.mobile, code: this.code})
            .then((res: IUser) => {
            this.$emit('back');
        });
    }

    /**
     * verifyMobile
     */
    public verifyMobile() {
        return this.mobile && /^1\d{10}$/.test(this.mobile);
    }
}
</script>
<style lang="scss" scoped>

</style>
