<template>
    <div>
        <BackHeader title="记录"/>
        <div class="has-header">
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="box">
                    <div v-for="(item, index) in itemGroups" :key="index" :class="{'log-item': item.id}">
                        <div class="log-hr" v-if="!item.id">
                            {{ item.remark }}
                        </div>
                        <div v-else>
                            <div class="info">
                                <div class="name">{{ item.remark }}</div>
                                <p>{{ item.created_at }}</p>
                            </div>
                            <div class="amount">
                                {{ item.money && item.money > 0 ? '+' + item.money : item.money }}
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
import { getAccountLog } from '@/api/user';
import { IAccountLog } from '@/api/model';

@Options({
    components: {
        BackHeader,
        PullToRefresh,
    },
})
export default class Log extends Vue {
    public items: IAccountLog[] = [];
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    get itemGroups(): IAccountLog[] {
        const data = [];
        let last = '';
        for (const item of this.items) {
            const match = (item.created_at + '').match(/(\d{4})-(\d{2})(-\d{2} \d{2}:\d{2})/);
            if (!match) {
                continue;
            }
            const current = match[1] + '年' + match[2] + '月';
            item.created_at = match[2] + match[3];
            if (last === current) {
                data.push(item);
                continue;
            }
            last = current;
            data.push({remark: last}, item);
        }
        return data;
    }

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
        getAccountLog({
            page,
        }).then(res => {
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

</style>
