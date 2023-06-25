<template>
    <div>
        <BackHeader title="发票抬头">
            <a class="right" @click="tapEdit">
                <i class="iconfont fa-plus"></i>
            </a>
        </BackHeader>
        <div class="has-header">
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div class="swipe-box title-list">
                    <div class="swipe-row" v-for="(item, index) in items" :key="index">
                        <div class="swipe-content title-item">
                            <div class="name">{{ item.title }}</div>
                            <p v-if="item.title_type > 0">发票类型：{{ item.type > 1 ? '增值税专用发票' : '增值税普通发票' }}</p>
                            <p v-if="item.title_type > 0">税务登记号：{{ item.tax_no }}</p>
                        </div>
                        <div class="actions-right">
                            <a @click="tapEdit(item)">
                                <i class="iconfont fa-edit"></i>
                            </a>
                            <i class="iconfont fa-trash"></i>
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
import { getTitleList } from '@/api/invoice';
import type { IInvoiceTitle } from '../../api/model';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
});
const items = ref<IInvoiceTitle[]>([]);

function tapEdit(item?: any) {
    if (!item) {
        router.push('/invoice/edit');
        return;
    }
    router.push({name: 'invoice-edit', query: {id: item.id}});
}

function tapMore() {
    goPage( queries.page + 1);
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
    getTitleList({
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

</style>
