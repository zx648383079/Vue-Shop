<template>
    <div>
        <header class="top">
            <a @click="tapBack" class="back">
                <i class="iconfont icon-chevron-left" aria-hidden="true"></i>
            </a>
            <div class="top-tab">
                <a @click="tapProductScroll('info')">商品</a>
                <a @click="tapProductScroll('detail')">详情</a>
                <a class="active">评价</a>
                <a  @click="tapProductScroll('recommend')">推荐</a>
            </div>
        </header>

        <div class="has-header">
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <div id="comments" class="comment-box">
                    <div class="comment-subtotal" v-if="comment">
                        评分
                        <Star :star="comment.avg"/>
                        <span>{{ comment.favorable_rate }}%</span>好评
                    </div>
                    <div class="comment-stats" v-if="comment && comment.tags && comment.tags.length > 0">
                        <a v-for="(item, index) in comment.tags" :key="index">{{ item.label }}（{{ item.count }}）</a>
                    </div>
                    <CommentPage :items="items"/>
                </div>
            </PullToRefresh>
            
        </div>

    </div>
</template>
<script setup lang="ts">
import type { IComment, ICommentSubtotal } from '@/api/model';
import CommentPage from './Child/CommentPage.vue';
import { getCommentSubtotal, getCommentList } from '@/api/comment';
import PullToRefresh from '@/components/PullToRefresh.vue';
import Star from './Child/StarLabel.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { useDialog } from '../../components/Dialog';
import { parseNumber } from '../../utils';

const route = useRoute();
const router = useRouter();
const toast = useDialog();

const comment = ref<ICommentSubtotal | null>(null);
const items = ref<IComment[]>([]);
const queries = reactive({
    itemId: 0,
    itemType: 0,
    hasMore: true,
    page: 1,
    isLoading: false
});

function tapBack() {
    if (window.history.length <= 1) {
        router.push('/');
        return;
    }
    router.go(-1);
}

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
    getCommentList({
        item_id: queries.itemId,
        item_type: queries.itemType,
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

function tapProductScroll(id: string) {
    router.replace({name: 'product', params: {id: queries.itemId + ''}, hash: '#' + id});
}

queries.itemId = parseNumber(route.params.id);
if (!queries.itemId) {
    toast.warning('商品错误');
    router.push('/');
} else {
    getCommentSubtotal(queries.itemId).then(res => {
        comment.value = res;
    });
    tapRefresh();
}
</script>
<style lang="scss" scoped>

</style>
