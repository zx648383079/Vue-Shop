<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <div :class="['scroll-nav', queries.isExpand ? 'unfold' : '']">
                <ul>
                    <li v-for="(item, index) in categories" :key="index" :class="{active: queries.category == item.id}">
                            <a @click="tapCategory(item)">{{ item.name }}</a>
                    </li>
                </ul>
                <a @click="queries.isExpand = !queries.isExpand" :class="['iconfont', 'nav-arrow', queries.isExpand ? 'fa-chevron-up' : 'fa-chevron-down']"></a>
            </div>
            <PullToRefresh :loading="queries.isLoading" :more="queries.hasMore" @refresh="tapRefresh" @more="tapMore">
                <ArticleItem :items="items"/>
            </PullToRefresh>
        </div>
    </div>
</template>
<script setup lang="ts">
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import {getArticleList, getCategories} from '@/api/article';
import type { IArticleCategory, IArticle } from '@/api/model';
import ArticleItem from './Child/ArticleItem.vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
    category: 0,
    status: 0,
    isExpand: false,
});
const categories = ref<IArticleCategory[]>([]);
const items = ref<IArticle[]>([]);


function tapCategory(item: IArticleCategory) {
    queries.category = item.id;
    route.meta.title = item.name;
    queries.isExpand = false;
    tapRefresh();
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
    if (queries.isLoading) {
        return;
    }
    queries.isLoading = true;
    getArticleList({
        category: queries.category,
        page,
    }).then(res => {
        queries.page = page;
        queries.isLoading = false;
        if (page < 2) {
            items.value = res.data as never[];
        } else {
            items.value = [].concat(items.value as never[], res.data as never[]);
        }
    });
}
if (route.query.category) {
    queries.category = parseInt(route.query.category + '', 10);
}
getCategories().then(res => {
    if (!res.data) {
        return;
    }
    categories.value = res.data;
    if (!queries.category || queries.category < 1) {
        tapCategory(res.data[0]);
    }
});
if (queries.category && queries.category > 0) {
    tapRefresh();
}
</script>
<style lang="scss" scoped>

</style>
