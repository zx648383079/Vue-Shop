<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header has-footer">
            <div :class="['scroll-nav', queries.isExpand ? 'unfold' : '']">
                <ul>
                    <li v-for="(item, index) in categories" :key="index" :class="{active: queries.category == item.id}">
                            <a @click="tapCategory(item)">{{ item.name }}</a>
                    </li>
                </ul>
                <a @click="queries.isExpand = !queries.isExpand" class="fa nav-arrow"></a>
            </div>

            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
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
                <i class="iconfont icon-gift" aria-hidden="true"></i>
                领券
            </a>
            <a @click="$router.replace('/coupon/my')">
                <i class="iconfont icon-user" aria-hidden="true"></i>
                我的优惠券
            </a>
        </footer>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import type { ICategory, ICoupon } from '@/api/model';
import {getCouponList, receiveCoupon} from '@/api/coupon';
import { reactive, ref } from 'vue';
import { useShopStore } from '../../stores/shop';
import { useDialog } from '../../components/Dialog/plugin';

const shopStore = useShopStore();
const toast = useDialog();
const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
    category: 0,
    isExpand: false,
});
const items = ref<ICoupon[]>([]);
const categories = ref<ICategory[]>([]);

function tapRecieve(item: ICoupon) {
    if (!item.can_receive) {
        return;
    }
    receiveCoupon(item.id).then(res => {
        if (res.data) {
            toast.warning('领取成功');
            item.can_receive = false;
        }
    });
}

function tapCategory(item: ICategory) {
    queries.category = item.id;
    tapRefresh();
}

function tapRefresh() {
    goPage(1);
}

function tapMore() {
    if (!queries.hasMore) {
        return;
    }
    goPage(queries.page + 1);
}

function goPage(page: number) {
    if (queries.isLoading) {
        return;
    }
    queries.isLoading = true;
    getCouponList({
        category: queries.category,
        page,
    }).then(res => {
        queries.page = page;
        queries.isLoading = false;
        if (!res.data) {
            return;
        }
        if (page < 2) {
            items.value = res.data;
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}


shopStore.getCategories().then(res => {
    categories.value = res;
});
tapRefresh();
</script>
<style lang="scss" scoped>

</style>
