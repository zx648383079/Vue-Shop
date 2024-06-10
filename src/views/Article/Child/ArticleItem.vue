<template>
    <div>
        <dl class="article-item" v-for="(item, index) in props.items" :key="index">
            <dt><a @click="tapItem(item)">{{ item.title }}</a>
                <span class="book-time">{{ item.created_at }}</span></dt>
            <dd>
                <p>{{ item.description ? item.description.substring(0, 100) : '' }}</p>
                <div class="tags">
                    <span class="author"><i class="iconfont icon-edit"></i><b>admin</b></span>
                    <span class="category"><i class="iconfont icon-bookmark"></i><b>其他</b></span>
                    <span class="comment"><i class="iconfont icon-comment"></i><b>0</b></span>
                    <!-- <span class="agree"><i class="iconfont icon-thumbs-o-up"></i><b>0</b></span> -->
                    <span class="click"><i class="iconfont icon-eye"></i><b>31</b></span>
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
.article-item {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
    dt {
        line-height: 30px;
        font-weight: 800;
        font-size: 18px;
    }
    dd {
        p {
            max-height: 90px;
            overflow: hidden;
        }
        .tags {
            line-height: 20px;
            font-size: 13px;
            columns: #767676;
            span {
                margin-right: 10px;
            }
        }
    }
}
</style>
