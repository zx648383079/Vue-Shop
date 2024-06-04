<template>
    <div>
        <BackHeader :title="$route.meta.title as string">
            <a class="right" @click="$router.push('/account/card/create')">
                <i class="iconfont icon-plus"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="card-item" v-for="(item, index) in items" :key="index">
                    <div class="icon">
                        <img :src="item.icon" alt="">
                    </div>
                    <div class="info">
                        <div class="bank">
                            {{ item.bank }}
                            <em v-if="item.status == 1">快捷支付</em>
                        </div>
                        <div class="tag">
                            {{ item.type == 1 ? '信用卡' : '储蓄卡' }}
                        </div>
                        <div class="card-no">
                            {{ item.card_number }}
                        </div>
                    </div>
                </div>
            </PullToRefresh>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { getBankCardList } from '@/api/user';
import type { ICard } from '../../api/model';
import { reactive, ref } from 'vue';

const items = ref<ICard[]>([]);
const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false
});

function tapMore() {
    goPage(queries.page + 1);
}
function tapRefresh() {
    items.value = [];
    queries.isLoading = false;
    queries.hasMore = true;
    goPage(1);
}
function goPage(page: number) {
    if (queries.isLoading || !queries.hasMore) {
        return;
    }
    queries.isLoading = true;
    getBankCardList({
        page,
    }).then(res => {
        queries.page = page;
        queries.hasMore = res.paging.more;
        queries.isLoading = false;
        if (!res.data) {
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}

tapRefresh();
</script>
<style lang="scss" scoped>
.card-item {
    position: relative;
    background-color: #fff;
    height: 120px;
    padding-top: 10px;
    padding-left: 80px;
    margin: 10px 0;
    .icon {
        position: absolute;
        left: 10px;
        padding-top: 20px;
        img {
            width: 60px;
            height: 60px;
        }
    }
    .info {
        .bank {
            line-height: 30px;
            font-weight: 700;
            font-size: 20px;
            em {
                font-size: 14px;
                color: #f888;
            }
        }
        .tag {
            font-size: 14px;
            color: #767676;
        }
        .card-no {
            margin-top: 10px;
            line-height: 40px;
            font-weight: 600;
            font-size: 20px;
        }
    }
}
</style>
