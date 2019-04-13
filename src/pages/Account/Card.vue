<template>
    <div>
        <BackHeader :title="this.$route.meta.title">
            <a class="right" @click="$router.push('/account/card/create')">
                <i class="fa fa-plus"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
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
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { getBankCardList } from '@/api/user';
import { ICard } from '@/api/model';

@Component({
    components: {
        BackHeader,
        PullToRefresh,
    },
})
export default class Card extends Vue {
    public items: ICard[] = [];
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        this.tapRefresh();
    }

    public tapMore() {
        this.goPage( ++ this.page);
    }

    /**
     * refresh
     */
    public tapRefresh() {
        this.items = [];
        this.isLoading = false;
        this.hasMore = true;
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.isLoading || !this.hasMore) {
            return;
        }
        this.isLoading = true;
        getBankCardList({
            page,
        }).then(res => {
            this.page = page;
            this.hasMore = res.paging.more;
            this.isLoading = false;
            if (!res.data) {
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
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
