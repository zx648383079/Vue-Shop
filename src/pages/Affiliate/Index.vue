<template>
    <div>
        <BackHeader :title="$route.meta.title">
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
                    <i class="iconfont fa-coins" aria-hidden="true"></i>
                    推荐的订单
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/affiliate/user')">
                    <i class="iconfont fa-users" aria-hidden="true"></i>
                    推荐的会员
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/affiliate/share')">
                    <i class="iconfont fa-share" aria-hidden="true"></i>
                    我的分享
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';

@Options({
    components: {
        BackHeader,
    },
})
export default class Index extends Vue {

}
</script>
<style lang="scss" scoped>

</style>
