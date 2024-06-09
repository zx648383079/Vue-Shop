<template>
    <div>
        <header class="top main-header-box">
            <a class="home-btn" @click="tapHome">
                <i class="iconfont icon-home"></i>
            </a>
            <a @click="tapHome" class="logo">
                <img :src="logo" alt="">
            </a>
            <a class="search-btn" @click="$router.push('/search')">
                <i class="iconfont icon-search"></i>
            </a>
            <a @click="$router.push('/cart')" class="top-cart">
                <i class="iconfont icon-cart"></i>
                <!-- <i class="tip">1</i> -->
            </a>
        </header>
        <div class="has-header">
            <div class="login-type-box" v-if="mode < 1">
                <div class="logo">
                    <img :src="logo" alt="">
                </div>
                <a @click="mode = 1" class="btn btn-danger">手机号登录</a>
                <a @click="mode = 3" class="btn btn-outline-danger">邮箱登录</a>
                <a @click="mode = 4">手机号快捷注册</a>

                <div class="login-oauth-box">
                    <a @click="tapAuth('qq')"><i class="iconfont icon-qq"></i></a>
                    <a @click="tapAuth('wx')"><i class="iconfont icon-wechat"></i></a>
                    <a @click="tapAuth('weibo')"><i class="iconfont icon-weibo"></i></a>
                    <a @click="tapAuth('github')"><i class="iconfont icon-github"></i></a>
                    <a @click="tapAuth('zd')">
                        <i class="iconfont icon-handshake"></i>
                    </a>
                </div>
            </div>
            <div class="login-box" v-if="mode > 0 && mode < 4">
                <MobileLogin v-if="mode == 2" :logo="logo" @toggle="tapChange" @back="tapLoginBack"/>
                <MobileCodeLogin v-if="mode == 1" :logo="logo" @toggle="tapChange" @back="tapLoginBack"/>
                <EmailLogin v-if="mode == 3" :logo="logo" @toggle="tapChange" @back="tapLoginBack"/>
            </div>
            <div class="register-box" v-if="mode >= 4">
                <MobileRegister v-if="mode == 4" @toggle="tapChange" @back="tapLoginBack"/>
                <EmailRegister v-if="mode == 5" @toggle="tapChange" @back="tapLoginBack"/>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import MobileLogin from './Child/MobileLogin.vue';
import MobileCodeLogin from './Child/MobileCodeLogin.vue';
import MobileRegister from './Child/MobileRegister.vue';
import EmailLogin from './Child/EmailLogin.vue';
import EmailRegister from './Child/EmailRegister.vue';
import type { ISite } from '@/api/model';
import { assetsFilter } from '../../pipes';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth, useTheme } from '../../services';

const route = useRoute();
const router = useRouter();
const mode = ref(0);
const site = ref<ISite|null>(null);

const logo = computed(() => {
    return assetsFilter(site.value ? site.value.logo : '/assets/images/wap_logo.png');
});

function tapHome() {
    router.push('/');
}

function tapChange(m: number) {
    mode.value = m;
}

function tapLoginBack() {
    if (route.query.redirect_uri) {
        router.replace(route.query.redirect_uri + '');
        return;
    }
    router.replace('/');
}


function tapAuth(type: string) {
    window.location.href = useAuth().authUri(type,
    route.query.redirect_uri ? route.query.redirect_uri + '' : '');
}

useTheme().getInformation().then(res => {
    site.value = res;
});


</script>
<style lang="scss" scoped>

</style>
