<template>
    <div>
        <BackHeader title="发票抬头">
            <a class="right" @click="tapEdit">
                <i class="fa fa-plus"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="swipe-box title-list">
                    <div class="swipe-row" v-for="(item, index) in items" :key="index">
                        <div class="swipe-content title-item">
                            <div class="name">{{ item.title }}</div>
                            <p v-if="item.title_type > 0">发票类型：{{ item.type < 1 ? '增值税普通发票' : '增值税专用发票' }}</p>
                            <p v-if="item.title_type > 0">税务登记号：{{ item.tax_no }}</p>
                        </div>
                        <div class="actions-right">
                            <a @click="tapEdit(item)">
                                <i class="fa fa-edit"></i>
                            </a>
                            <i class="fa fa-trash"></i>
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
import { getTitleList } from '@/api/invoice';
import { IInvoiceTitle } from '../../api/model';

@Component({
    components: {
        BackHeader,
        PullToRefresh,
    },
})
export default class Title extends Vue {
    public items: IInvoiceTitle[] = [];
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    /**
     * created
     */
    public created() {
        this.tapRefresh();
    }

    public tapEdit(item?: any) {
        if (!item) {
            this.$router.push('/invoice/edit');
            return;
        }
        this.$router.push({name: 'invoice-edit', query: {id: item.id}});
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
        getTitleList({
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
