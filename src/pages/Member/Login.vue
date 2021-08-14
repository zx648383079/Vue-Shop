<template>
    <div>
        <header class="top main-header-box">
            <a class="home-btn" @click="tapHome">
                <i class="iconfont fa-home"></i>
            </a>
            <a @click="tapHome" class="logo">
                <img :src="logo" alt="">
            </a>
            <a class="search-btn" @click="$router.push('/search')">
                <i class="iconfont fa-search"></i>
            </a>
            <a @click="$router.push('/cart')" class="top-cart">
                <i class="iconfont fa-shopping-cart"></i>
                <!-- <i class="tip">1</i> -->
            </a>
        </header>
        <div class="has-header">
            <div class="login-type-box" v-if="mode < 1">
                <div class="logo">
                    <img :src="logo" alt="">
                </div>
                <a @click="mode = 1" class="btn">手机号登录</a>
                <a @click="mode = 3" class="btn btn-none">邮箱登录</a>
                <a @click="mode = 4">手机号快捷注册</a>

                <div class="login-oauth-box">
                    <a @click="tapAuth('qq')"><i class="iconfont fa-qq"></i></a>
                    <a @click="tapAuth('wx')"><i class="iconfont fa-weixin"></i></a>
                    <a @click="tapAuth('weibo')"><i class="iconfont fa-weibo"></i></a>
                    <a @click="tapAuth('github')"><i class="iconfont fa-github"></i></a>
                    <a @click="tapAuth('zd')">
                        <i class="iconfont fa-handshake"></i>
                    </a>
                </div>
            </div>
            <div class="login-box" v-if="mode > 0 && mode < 4">
                <MobileLogin v-if="mode == 2" :logo="logo" @click="tapChange" @back="tapLoginBack"/>
                <MobileCodeLogin v-if="mode == 1" :logo="logo" @click="tapChange" @back="tapLoginBack"/>
                <EmailLogin v-if="mode == 3" :logo="logo" @click="tapChange" @back="tapLoginBack"/>
            </div>
            <div class="register-box" v-if="mode >= 4">
                <MobileRegister v-if="mode == 4" @click="tapChange" @back="tapLoginBack"/>
                <EmailRegister v-if="mode == 5" @click="tapChange" @back="tapLoginBack"/>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import MobileLogin from './Child/MobileLogin.vue';
import MobileCodeLogin from './Child/MobileCodeLogin.vue';
import MobileRegister from './Child/MobileRegister.vue';
import EmailLogin from './Child/EmailLogin.vue';
import EmailRegister from './Child/EmailRegister.vue';
import { getAuthUri } from '@/utils';
import { dispatchSite } from '@/store/dispatches';
import { ISite } from '@/api/model';
import { assetsFilter } from '../../pipes';

@Options({
    components: {
        MobileLogin,
        MobileCodeLogin,
        MobileRegister,
        EmailLogin,
        EmailRegister,
    },
})
export default class Login extends Vue {

    public mode = 0;
    public site: ISite | null = null;

    public created() {
        dispatchSite().then(res => {
            this.site = res;
        });
    }

    public get logo(): string {
        return assetsFilter(this.site ? this.site.logo : '/assets/images/wap_logo.png');
    }

    public tapHome() {
        this.$router.push('/');
    }

    public tapChange(mode: number) {
        this.mode = mode;
    }

    public tapLoginBack() {
        if (this.$route.query.redirect_uri) {
            this.$router.replace(this.$route.query.redirect_uri + '');
            return;
        }
        this.$router.replace('/');
    }

    /**
     * tapAuth
     */
    public tapAuth(type: string) {
        window.location.href = getAuthUri(type,
        this.$route.query.redirect_uri ? this.$route.query.redirect_uri + '' : '');
    }
}
</script>
<style lang="scss" scoped>

</style>
