<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header has-footer">
            <div class="tab-header">
                <div class="tab-item" v-for="(item, index) in statusList" :key="index" :class="{active: index == status}" @click="tapStatus(index)">{{ item }}</div>
            </div>

            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="my-coupon-item" v-for="(item, index) in items" :key="index" :calss="{expired: item.expired}">
                    <div class="price">
                        <em>{{ item.money | price }}</em>
                        <p>满{{ item.min_money }}可用</p>
                    </div>
                    <div class="info">
                        <p>{{ item.name }}</p>
                        <div class="time">
                            <span>{{ item.start_at | time }}-{{ item.end_at | time}}</span>
                            <a href="" v-if="!item.expired">立即使用</a>
                        </div>
                    </div>
                </div>
            </PullToRefresh>
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
import PullToRefresh from '@/components/PullToRefresh.vue';
import { getMyCoupon } from '../../api/coupon';
import { ICoupon } from '../../api/model';

@Component({
    components: {
        BackHeader,
        PullToRefresh,
    },
})
export default class My extends Vue {

    public statusList = [
        '未使用',
        '使用记录',
        '已过期',
    ];

    public status: number = 0;
    public items: ICoupon[] = [];
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        this.tapRefresh();
    }

    /**
     * tapStatus
     */
    public tapStatus(index: number) {
        this.status = index;
        this.tapRefresh();
    }

    public tapRefresh() {
        this.goPage(1);
    }

    public tapMore() {
        if (!this.hasMore) {
            return;
        }
        this.goPage(this.page + 1);
    }

    public goPage(page: number) {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        getMyCoupon({
            status: this.status,
            page,
        }).then(res => {
            this.page = page;
            this.isLoading = false;
            if (!res.data) {
                return;
            }
            if (this.page < 2) {
                this.items = res.data;
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
