<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header" v-if="article">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-status">
                <span class="author"><i class="iconfont fa-edit"></i><b>admin</b></span>
                <span class="category"><i class="iconfont fa-bookmark"></i><b>其他</b></span>
                <span class="comment"><i class="iconfont fa-comments"></i><b>0</b></span>
                <span class="agree"><i class="iconfont fa-thumbs-o-up"></i><b>0</b></span>
                <span class="click"><i class="iconfont fa-eye"></i><b>31</b></span>
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

</style>
