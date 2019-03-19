<template>
    <div>
        <div class="logo">
            <img :src="'/assets/images/wap_logo.png' | assets" alt="">
        </div>
        <div class="phone-password">
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
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class MobileLogin extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
