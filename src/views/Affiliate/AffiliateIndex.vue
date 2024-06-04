<template>
    <div>
        <BackHeader :title="$route.meta.title as string">
            <a class="right-text" @click="$router.push('/affiliate/rule')">
                规则
            </a>
        </BackHeader>
      <div class="has-header">
            <div class="affiliate-header">
                <div>
                    <p>已推荐</p>
                    <div class="money">0.00</div>
                </div>
                <div>
                    <p>已分成</p>
                    <div class="money">0.00</div>
                </div>
            </div>

            <div class="menu-list">
                <a @click="$router.push('/affiliate/order')">
                    <i class="iconfont icon-coins" aria-hidden="true"></i>
                    推荐的订单
                    <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/affiliate/user')">
                    <i class="iconfont icon-users" aria-hidden="true"></i>
                    推荐的会员
                    <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/affiliate/share')">
                    <i class="iconfont icon-share" aria-hidden="true"></i>
                    我的分享
                    <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
</script>
<style lang="scss" scoped>

</style>
