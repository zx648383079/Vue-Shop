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
                <RechargePanel/>
                <WithdrawPanel/>
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

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import WithdrawPanel from './Child/WithdrawPanel.vue';
import RechargePanel from './Child/RechargePanel.vue'

@Component({
    components: {
        BackHeader,
        WithdrawPanel,
        RechargePanel,
    },
})
export default class Index extends Vue {
    public mode: number = 0;
}
</script>
<style lang="scss" scoped>
</style>
