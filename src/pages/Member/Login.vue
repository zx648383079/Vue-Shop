<template>
    <div>
        <header class="top main-header-box">
            <a class="home-btn" @click="tapHome">
                <i class="fa fa-home"></i>
            </a>
            <a @click="tapHome" class="logo">
                <img :src="'/assets/images/wap_logo.png' | assets" alt="">
            </a>
            <a class="search-btn" @click="$router.push('/search')">
                <i class="fa fa-search"></i>
            </a>
            <a @click="$router.push('/cart')" class="top-cart">
                <i class="fa fa-shopping-cart"></i>
                <!-- <i class="tip">1</i> -->
            </a>
        </header>
        <div class="has-header">
            <div class="login-type-box" v-if="mode < 1">
                <div class="logo">
                    <img :src="'/assets/images/wap_logo.png' | assets" alt="">
                </div>
                <a @click="mode = 1" class="btn">手机号登录</a>
                <a @click="mode = 3" class="btn btn-none">邮箱登录</a>
                <a @click="mode = 4">手机号快捷注册</a>

                <div class="login-oauth-box">
                    <a ><i class="fab fa-qq"></i></a>
                    <a ><i class="fab fa-weixin"></i></a>
                    <a ><i class="fab fa-weibo"></i></a>
                    <a ><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="login-box" v-if="mode > 0 && mode < 4">
                <div class="logo">
                    <img :src="'/assets/images/wap_logo.png' | assets" alt="">
                </div>
                <div class="phone-code" v-if="mode == 1">
                    <div class="input-box">
                        <input type="text">
                    </div>
                    <div class="code-input">
                        <input type="text">
                        <a href="">获取验证码</a>
                    </div>
                    <div class="unlogin">
                        <a href="">遇到问题？</a>
                        <a @click="mode = 2">使用密码验证登录</a>
                    </div>
                    <button>登录</button>
                    <a @click="mode = 0" class="btn btn-none">其他登录方式</a>
                </div>
                <div class="phone-password" v-if="mode == 2">
                    <div class="input-box">
                        <input type="text">
                    </div>
                    <div class="input-box">
                        <input type="password">
                    </div>
                    <div class="unlogin">
                        <a href="">忘记密码</a>
                        <a @click="mode = 1">使用短信验证登录</a>
                    </div>
                    <button>登录</button>
                    <a @click="mode = 0" class="btn btn-none">其他登录方式</a>
                </div>
                <div class="email-password" v-if="mode == 3">
                    <form data-type="ajax" action="<?= $this->url('/auth/login') ?>" method="POST">
                        <div class="input-box">
                            <input type="email" name="email" required autocomplete="off" placeholder="请输入账号">
                        </div>
                        <div class="input-box">
                            <input type="password" name="password" required autocomplete="off" placeholder="请输入密码">
                        </div>
                        <div class="unlogin">
                            <a @click="mode = 4">注册账号</a>
                            <a href="">忘记密码</a>
                        </div>
                        <button>登录</button>
                    </form>
                    <a @click="mode = 0" class="btn btn-none">其他登录方式</a>
                </div>
            </div>
            <div class="register-box" v-if="mode == 4">
                <div class="input-box">
                    <input type="text">
                </div>
                <div class="code-input">
                    <input type="text">
                    <a href="">获取验证码</a>
                </div>
                <div class="input-box">
                    <input type="password">
                </div>
                <button>注册</button>
                <div class="input-group">
                    <div class="checkbox">
                        <input type="checkbox" name="agree" value="1" id="checkboxInput"/>
                        <label for="checkboxInput"></label>
                    </div>
                    同意本站协议
                </div>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IUser } from '@/api/model';
import { dispatchUser } from '@/store/dispatches';

@Component
export default class Login extends Vue {

    mode: number = 0;

    tapHome() {
        this.$router.push('/');
    }
}
</script>
<style lang="scss" scoped>

</style>
