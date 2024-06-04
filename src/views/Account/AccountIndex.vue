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
                    <i class="iconfont icon-credit-card" aria-hidden="true"></i>
                    银行卡
                    <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/invoice')">
                    <i class="iconfont icon-bookmark" aria-hidden="true"></i>
                    发票管理
                    <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const mode = ref(0);

</script>
<style lang="scss" scoped>
</style>
