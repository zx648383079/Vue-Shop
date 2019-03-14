<template>
    <div>
        <BackHeader title="账户安全"/>
        <div class="has-header">
            <div class="account-box">
                <div class="line-item">
                    <span><i class="fab fa-qq"></i>QQ</span>
                    <span>已绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span> <i class="fab fa-weixin"></i>微信</span>
                    <span>未绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span> <i class="fab fa-alipay"></i>支付宝</span>
                    <span>未绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span><i class="fab fa-weibo"></i>微博</span>
                    <span>未绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span><i class="fab fa-paypal"></i>PayPal</span>
                    <span>未绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span><i class="fab fa-github"></i>Github</span>
                    <span>未绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span><i class="fab fa-google"></i>Google</span>
                    <span>未绑定</span>
                    <i class="fa fa-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';

@Component({
    components: {
        BackHeader
    }
})
export default class Center extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
