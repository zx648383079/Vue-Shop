<template>
    <div>
        <BackHeader/>
        <div class="has-header" v-if="article">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-tags">
                <span class="author"><i class="iconfont icon-edit"></i><b>admin</b></span>
                <span class="category"><i class="iconfont icon-bookmark"></i><b>其他</b></span>
                <span class="comment"><i class="iconfont icon-comment"></i><b>0</b></span>
                <!-- <span class="agree"><i class="iconfont icon-thumbs-o-up"></i><b>0</b></span> -->
                <span class="click"><i class="iconfont icon-eye"></i><b>31</b></span>
            </div>
            <div class="article-content" v-html="article.content">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import type { IArticle } from '@/api/model';
import { getArticle } from '@/api/article';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const article = ref<IArticle|null>(null);

const id = parseInt(route.params.id as string, 10);
if (!id) {
    router.push('/');
} else {
    getArticle(id).then(res => {
        article.value = res;
    });
}

</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.article-content {
    background-color: var(--#{$prefix}-panel);
    margin: 0 0 1.25rem;
    padding: 0.625rem 0.3125rem;
}
.article-title {
    background-color: var(--#{$prefix}-primary);
    color: var(--#{$prefix}-primary-text);
    font-size: 1.125rem;
    text-align: center;
    line-height: 1.875rem;
}
.article-tags {
    padding-top: 0.625rem;
    padding-left: 0.625rem;
    line-height: 1.25rem;
    font-size: 0.8125rem;
    background-color: var(--#{$prefix}-primary);
    color: var(--#{$prefix}-primary-text);
    .author,
    .agree,
    .category,
    .comment,
    .click {
        display: inline-block;
        margin-right: 10px;
    }
}
</style>
