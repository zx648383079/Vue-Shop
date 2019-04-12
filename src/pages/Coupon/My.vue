<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header has-footer">
            <div class="tab-header">
                <div class="tab-item active">未使用</div>
                <div class="tab-item">使用记录</div>
                <div class="tab-item">已过期</div>
            </div>

            <div>
                <div class="my-coupon-item" v-for="(item, index) in items" :key="index" :calss="{expired: item.expired}">
                    <div class="price">
                        <em>¥300</em>
                        <p>满168可用</p>
                    </div>
                    <div class="info">
                        <p>{{ item.name }}</p>
                        <div class="time">
                            <span>2018.12.01-2018.12.01</span>
                            <a href="" v-if="!item.expired">立即使用</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="tab-bar">
            <a @click="$router.replace('/coupon')">
                <i class="fa fa-gift" aria-hidden="true"></i>
                领券
            </a>
            <a class="active">
                <i class="fa fa-user" aria-hidden="true"></i>
                我的优惠券
            </a>
        </footer>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';

@Component({
    components: {
        BackHeader,
    },
})
export default class My extends Vue {
    public status: number = 0;
    public items = [];
    public has_more = true;
    public page = 1;
    public isLoading = false;
}
</script>
<style lang="scss" scoped>

</style>
