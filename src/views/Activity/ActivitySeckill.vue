<template>
    <div>
        <BackHeader title="秒杀"/>
        <div class="has-header">
            <div class="tab-bar time-header">
                <a v-for="(item, index) in timeList" :key="index" @click="tapTime(item)" :class="selected.start_at == item.start_at ? 'active' : ''">
                    <span>{{ item.title }}</span>
                    <em>{{ getStatus(item) }}</em>
                </a>
            </div>
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="panel">
                    <div class="panel-header">
                        <span>{{ getStatus(selected) }}，先下单先得哦</span>
                        <div class="time-tip">
                            <TimeTip :start="selected.start_at" :end="selected.end_at"/>
                        </div>
                    </div>
                    <div class="panel-body">
                         <div class="goods-item" v-for="(goods, index) in items" :key="index">
                            <div class="goods-img">
                                <img :src="goods.goods.thumb" alt="">
                            </div>
                            <div class="goods-info">
                                <h4>{{ goods.goods.name }}</h4>
                                <span class="item-price">{{ goods.price }}</span>
                                <span class="old-price">{{ goods.goods.price }}</span>
                            </div>
                            <div class="goods-actions">
                                <a class="btn btn-buy" v-if="goods.status == 1">立即抢购</a>
                                <a class="btn btn-primary" v-if="goods.status == 2">提醒我</a>
                                <a class="btn btn-disable"  v-if="goods.status == 0">已抢完</a>
                            </div>
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
import type { IActivityTime, ISeckillGoods } from '../../api/model';
import { getTimes, getSeckill } from '../../api/activity';
import TimeTip from './Child/TimeTip.vue';
import { parseDate } from '@/utils';
import { reactive, ref } from 'vue';

const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
});
const items = ref<ISeckillGoods[]>([]);
const timeList = ref<IActivityTime[]>([]);
const selected = ref<IActivityTime>({
    title: '',
    start_at: '',
    end_at: '',
});

function getStatus(item: IActivityTime): string {
    const now = new Date();
    if (parseDate(item.end_at) < now) {
        return '已结束';
    }
    if (parseDate(item.start_at) > now) {
        return '即将开始';
    }
    return '抢购中';
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
    if (!selected.value || queries.isLoading) {
        return;
    }
    queries.isLoading = true;
    getSeckill({
        time: selected.value.start_at,
        page,
    }).then(res => {
        queries.page = page;
        queries.hasMore = res.paging.more;
        queries.isLoading = false;
        if (page < 2) {
            items.value = res.data as never[];
            return;
        }
        items.value = [].concat(items.value as never[], res.data as never[]);
    });
}

function tapTime(item: IActivityTime) {
    if (selected.value && item.start_at === selected.value.start_at) {
        return;
    }
    selected.value = item;
    tapRefresh();
}


getTimes().then(res => {
    if (!res || !res.data || res.data.length < 1) {
        return;
    }
    timeList.value = res.data;
    tapTime(res.data[0]);
});
</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.time-header {
    height: 3rem;
    position: static;
    background-color: var(--#{$prefix}-primary);
    border: none;
    a {
        span {
            font-size: 1.3rem;
        }
        em {
            font-size: 10px;
            font-style: normal;
        }
        &.active {
            color: var(--#{$prefix}-primary-text);
            span {
                color: var(--#{$prefix}-primary-text); 
            }
        }
    }
}
.panel {
    background-color: var(--#{$prefix}-panel);
    .panel-header {
        border-bottom: 1px solid;
        .time-tip {
            float: right;
        }
    }
}
.goods-item {
    background-color: var(--#{$prefix}-panel);
    padding: 5px;
    position: relative;
    .goods-img {
        display: inline-block;
        img {
            width: 70px;
            height: 70px;
        }
    }
    .goods-info {
        display: inline-block;
        height: 5rem;
        vertical-align: top;
        overflow: hidden;
        margin-bottom: 0;
    }
    .old-price {
        color: #999;
        text-decoration: line-through;
        display: block;
    }
    &:not(:last-of-type) {
        border-bottom: 1px solid;
    }
    .goods-actions {
        position: absolute;
        bottom: 10px;
        right: 0;
        .btn {
            padding: 0 10px;
            color:#fff;
        }
        .btn-buy {
            background-color: #d22222;
        }
        .btn-primary {
            background-color: rgb(29, 133, 29);
            margin: 0 8px;
            width: auto;
        }
        .btn-disable {
            color: #999;
            background-color: #ccc;
            display: block;
            text-align: center;
        }
    }
}
</style>