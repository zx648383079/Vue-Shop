<template>
    <div>
        <BackHeader title="记录"/>
        <div class="has-header">
            <div class="box"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="is_loading"
                infinite-scroll-distance="10">
                
                <div v-for="(item, index) in itemGroups" :key="index" :class="item.id ? 'log-item' : ''">
                    <div class="log-hr" v-if="!item.id">
                        {{ item.remark }}
                    </div>
                    <div v-else>
                        <div class="info">
                            <div class="name">{{ item.remark }}</div>
                            <p>{{ item.created_at }}</p>
                        </div>
                        <div class="amount">
                            {{ item.money > 0 ? '+' + item.money : item.money }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { InfiniteScroll } from 'mint-ui';
import { getAccountLog } from '@/api/user';
import { IAccountLog } from '@/api/model';

Vue.use(InfiniteScroll);

@Component({
    components: {
        BackHeader
    }
})
export default class Log extends Vue {
    items: IAccountLog[] = [];
    has_more = true;
    page = 1;
    is_loading = false;

    get itemGroups(): IAccountLog[] {
        const data = [];
        let last: string = '';
        for (const item of this.items) {
            let match = (item.created_at + '').match(/(\d{4})-(\d{2})(-\d{2} \d{2}:\d{2})/);
            if (!match) {
                continue;
            }
            let current = match[1] + '年' + match[2] + '月';
            item.created_at = match[2] + match[3];
            if (last == current) {
                data.push(item);
                continue;
            }
            last = current;
            data.push({remark: last}, item);
        }
        return data;
    }

    created() {
        this.refresh();
    }

    public loadMore() {
        this.goPage( ++ this.page);
    }

    /**
     * refresh
     */
    public refresh() {
        this.items = [];
        this.is_loading = false;
        this.has_more = true;
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.is_loading || !this.has_more) {
            return;
        }
        this.is_loading = true;
        getAccountLog({
            page,
        }).then(res => {
            this.has_more = res.paging.more;
            this.is_loading = false;
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
