<template>
    <div>
        <BackHeader/>
        <div class="has-header" v-if="article">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-tags">
                <span class="author"><i class="iconfont icon-edit"></i><b>admin</b></span>
                <span class="category"><i class="iconfont icon-bookmark"></i><b>其他</b></span>
                <span class="comment"><i class="iconfont icon-comment"></i><b>0</b></span>
                <span class="agree"><i class="iconfont icon-thumbs-o-up"></i><b>0</b></span>
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
.article-content {
    background-color: #fff;
    margin: 0 0 20px;
    padding: 10px 5px;
}
.article-title {
    color: #fff;
    background-color: #05a6b1;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
}
.article-tags {
    padding-top: 10px;
    padding-left: 10px;
    line-height: 20px;
    font-size: 13px;
    color: #fff;
    background-color: #05a6b1;
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
