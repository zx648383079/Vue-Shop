<template>
    <div>
        <BackHeader title="发票管理"/>
        <div class="has-header">
            <div class="account-header">
                <p>可开发票总金额(元)</p>
                <div class="money">{{ subtotal.remain || 0 }}</div>
            </div>

            <div class="menu-list">
                <a @click="$router.push('/invoice/apply')">
                    <i class="iconfont fa-money-check-alt" aria-hidden="true"></i>
                    申请开票
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/invoice/title')">
                    <i class="iconfont fa-wallet" aria-hidden="true"></i>
                    发票抬头
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/invoice/log')">
                    <i class="iconfont fa-bookmark" aria-hidden="true"></i>
                    近期开票
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import type { ISubtotal } from '../../api/model';
import { getSubtotal } from '../../api/invoice';
import { ref } from 'vue';

const subtotal = ref<ISubtotal>({});


getSubtotal().then(res => {
    subtotal.value = res;
});
</script>
<style lang="scss" scoped>

</style>
