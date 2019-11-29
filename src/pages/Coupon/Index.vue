<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header has-footer">
            <div :class="['scroll-nav', isExpand ? 'unfold' : '']">
                <ul>
                    <li v-for="(item, index) in categories" :key="index" :class="{active: category == item.id}">
                            <a @click="tapCategory(item)">{{ item.name }}</a>
                    </li>
                </ul>
                <a @click="isExpand = !isExpand" class="fa nav-arrow"></a>
            </div>

            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="coupon-item" v-for="(item, index) in items" :key="index">
                    <div class="thumb">
                        <img :src="item.thumb" alt="">
                    </div>
                    <div class="info">
                        <p>{{item.name }}</p>
                        <dl class="discount" v-if="item.type > 0">
                            <dd>8.8折</dd>
                            <dt>满168可用</dt>
                        </dl>
                        <div class="price" v-else>
                            <em>¥300</em>
                            满168可用
                        </div>
                    </div>
                    <div class="action">
                        <span v-if="item.can_receive && item.received >= item.send_value" class="status-icon status-close">已抢完</span>
                        <span v-if="item.received < item.send_value && item.can_receive" class="status-icon" @click="tapRecieve(item)">立即<br>领取</span>
                        <span v-if="!item.can_receive" class="status-icon status-received">已领</span>
                        <i v-if="item.received < item.send_value">剩余 {{ item.send_value > 0 ? 100 - Math.ceil(item.received * 100 / item.send_value) : 100 }} %</i>
                    </div>
                </div>
            </PullToRefresh>
        </div>

        <footer class="tab-bar">
            <a class="active">
                <i class="fa fa-gift" aria-hidden="true"></i>
                领券
            </a>
            <a @click="$router.replace('/coupon/my')">
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
import { ICategory, ICoupon } from '@/api/model';
import { dispatchCategories } from '@/store/dispatches';
import {getCouponList, receiveCoupon} from '@/api/coupon';
import Toast from '@/components/toast.ts';

@Component({
    components: {
        BackHeader,
        PullToRefresh,
    },
})
export default class Index extends Vue {
    public categories: ICategory[] = [];
    public category: number = 0;
    public items: ICoupon[] = [];
    public isExpand: boolean = false;
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        dispatchCategories().then(res => {
            this.categories = res;
        });
        this.tapRefresh();
    }

    /**
     * tapRecieve
     */
    public tapRecieve(item: ICoupon) {
        if (!item.can_receive) {
            return;
        }
        receiveCoupon(item.id).then(res => {
            if (res.data) {
                Toast('领取成功');
                item.can_receive = false;
            }
        });
    }

    /**
     * tapCategory
     */
    public tapCategory(item: ICategory) {
        this.category = item.id;
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
        getCouponList({
            category: this.category,
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
