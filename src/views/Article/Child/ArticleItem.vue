<template>
    <div>
        <dl class="article-item" v-for="(item, index) in props.items" :key="index">
            <dt class="item-header"><a @click="tapItem(item)">{{ item.title }}</a>
                <span class="item-time">{{ $d(item.created_at as any, 'short') }}</span></dt>
            <dd class="item-body">
                <p class="item-meta">{{ item.description ? item.description.substring(0, 100) : '' }}</p>
                <div class="item-tag-bar">
                    <span class="author" v-if="item.user"><i class="iconfont icon-edit"></i><b>{{  item.user?.name }}</b></span>
                    <span class="category" v-if="item.category"><i class="iconfont icon-bookmark"></i><b>{{ item.category?.name  }}</b></span>
                    <span class="comment"><i class="iconfont icon-comment"></i><b>{{  $n(item.comment_count || 0)  }}</b></span>
                    <!-- <span class="agree"><i class="iconfont icon-thumbs-o-up"></i><b>0</b></span> -->
                    <span class="click"><i class="iconfont icon-eye"></i><b>{{  $n(item.view_count || 0)  }}</b></span>
                </div>
            </dd>
        </dl>
      
    </div>
</template>
<script setup lang="ts">
import type { IArticle } from '@/api/model';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    items: IArticle[]
}>();

function tapItem(item: IArticle) {
    router.push({name: 'article-detail', params: {id: item.id + ''}});
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.article-item {
    display: block;
    background-color: var(--#{$prefix}-panel);
    margin-top: 0.625rem;
    padding: 0.625rem;
    .item-header {
        line-height: 1.875rem;
        font-weight: 800;
        font-size: 1.125rem;
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .item-time {
        color: var(--#{$prefix}-secondary-text);
        font-weight: 100;
        font-size: .8rem;
    }
    .item-body {
        
    }
    .item-meta {
        max-height: 5.625rem;
        min-height: 3rem;
        padding: .4rem 0;
        overflow: hidden;
        font-size: .8rem;
        color: var(--#{$prefix}-secondary-text);
    }
    .item-tag-bar {
        line-height: 1.25rem;
        font-size: 0.8rem;
        span {
            margin-right: 0.625rem;
        }
    }
}
</style>
