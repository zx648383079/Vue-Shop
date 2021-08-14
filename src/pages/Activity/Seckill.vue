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
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
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
                                <span class="price">{{ goods.price }}</span>
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
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { IActivityTime, ISeckillGoods } from '../../api/model';
import { getTimes, getSeckill } from '../../api/activity';
import TimeTip from './Child/TimeTip.vue';
import { parseDate } from '@/utils';

@Options({
    components: {
        BackHeader,
        PullToRefresh,
        TimeTip,
    },
})
export default class Seckill extends Vue {

    public timeList: IActivityTime[] = [];
    public selected: IActivityTime = {
        title: '',
        start_at: '',
        end_at: '',
    };

    public items: ISeckillGoods[] = [];
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        getTimes().then(res => {
            if (!res || !res.data || res.data.length < 1) {
                return;
            }
            this.timeList = res.data;
            this.tapTime(res.data[0]);
        })
    }

    public getStatus(item: IActivityTime): string {
        const now = new Date();
        if (parseDate(item.end_at) < now) {
            return '已结束';
        }
        if (parseDate(item.start_at) > now) {
            return '即将开始';
        }
        return '抢购中';
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
        if (!this.selected || this.isLoading) {
            return;
        }
        this.isLoading = true;
        getSeckill({
            time: this.selected.start_at,
            page,
        }).then(res => {
            this.hasMore = res.paging.more;
            this.isLoading = false;
            if (this.page < 2) {
                this.items = res.data as never[];
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }

    public tapTime(item: IActivityTime) {
        if (this.selected && item.start_at === this.selected.start_at) {
            return;
        }
        this.selected = item;
        this.tapRefresh();
    }
}
</script>
<style lang="scss" scoped>
.time-header {
    height: 3rem;
    position: static;
    background: #05a6b1;
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
            color: #fff;
            span {
                color: #fff; 
            }
        }
    }
}
.panel {
    background-color: #fff;
    .panel-header {
        border-bottom: 1px solid;
        .time-tip {
            float: right;
        }
    }
}
.goods-item {
    background-color: #fff;
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