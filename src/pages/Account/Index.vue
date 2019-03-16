<template>
    <div>
        <BackHeader title="我的余额">
            <a class="right-text"  @click="$router.push('/account/log')">
                明细
            </a>
        </BackHeader>
        <div class="has-header">
            <div class="account-header">
                <p>余额账户(元)</p>
                <div class="money">0.00</div>
            </div>

            <div class="menu-list">
                <a @click="mode = 1">
                    <i class="fa fa-money-check-alt" aria-hidden="true"></i>
                    充值
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="mode = 2">
                    <i class="fa fa-wallet" aria-hidden="true"></i>
                    提现
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/account/card')">
                    <i class="fa fa-credit-card" aria-hidden="true"></i>
                    银行卡
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/invoice')">
                    <i class="fa fa-bookmark" aria-hidden="true"></i>
                    发票管理
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>

        <div id="recharge" class="dialog dialog-content" v-if="mode == 1">
            <div class="dialog-header">
                <div class="dialog-title">充值</div>
                <i class="fa fa-close dialog-close" @click="mode = 0"></i>
            </div>
            <div class="dialog-body">
                <p>充值金额</p>
                <div class="money-input">
                    <em>￥</em>
                    <input type="text" placeholder="0.00">
                </div>
            </div>
            <div class="dialog-footer">
                <button class="dialog-yes">下一步</button>
            </div>
        </div>

        <div id="withdraw" class="dialog dialog-content"  v-if="mode == 2">
            <div class="dialog-header">
                <div class="dialog-title">提现</div>
                <i class="fa fa-close dialog-close" @click="mode = 0"></i>
            </div>
            <div class="dialog-body">
                <p>充值金额</p>
                <div class="money-input">
                    <em>￥</em>
                    <input type="text" placeholder="0.00">
                </div>
                <p>提现到账户</p>
                <div class="row-input">
                    <select name="" id="">
                        <option value="1">支付宝</option>
                        <option value="2">微信</option>
                        <option value="3">工商</option>
                    </select>
                </div>
                <div class="row-input">
                    <input type="text" placeholder="卡号/账号">
                </div>
                <div class="row-input">
                    <input type="text" placeholder="姓名">
                </div>
            </div>
            <div class="dialog-footer">
                <button class="dialog-yes">提交提现申请</button>
            </div>
        </div>
        <div class="dialog-bg" v-if="mode > 0"></div>
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
export default class Index extends Vue {
    mode: number = 0;
}
</script>
<style lang="scss" scoped>
</style>
