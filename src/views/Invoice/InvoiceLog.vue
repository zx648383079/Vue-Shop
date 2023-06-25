<template>
    <div>
        <BackHeader title="开票历史"/>
        <div class="has-header">
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div v-for="(item, index) in itemGroups" :key="index" :class="{'log-item': item.id}">
                    <div class="log-hr" v-if="!item.id">
                        {{ item.title }}
                    </div>
                    <div v-else>
                        <div class="info">
                            <div class="name">{{ item.title }}[{{ !item.type || item.type < 1 ? (!item.title_type || item.title_type < 1 ? '普通发票': '增值税普通发票') : '增值税专用发票' }}]</div>
                            <p>{{ item.created_at }}</p>
                        </div>
                        <div class="amount">
                            {{ item.money }}
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
import { getLogList } from '../../api/invoice';
import type { IInvoiceLog } from '../../api/model';
import { computed, reactive, ref } from 'vue';


const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
});
const items = ref<IInvoiceLog[]>([]);

const itemGroups = computed(() => {
    const data = [];
    let last = '';
    for (const item of items.value) {
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
        data.push({title: last}, item);
    }
    return data;
});

function tapRefresh() {
    items.value = [];
    queries.isLoading = false;
    queries.hasMore = true;
    goPage(queries.page = 1);
}
function tapMore() {
    if (!queries.hasMore) {
        return;
    }
    goPage(queries.page + 1);
}
function goPage(page: number) {
    if (queries.isLoading || !queries.hasMore) {
        return;
    }
    queries.isLoading = true;
    getLogList({
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
