<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
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
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IArticle } from '@/api/model';
import { getArticle } from '@/api/article';

@Options({
    components: {
        BackHeader,
    },
})
export default class Detail extends Vue {
    public article: IArticle|null = null;

    public created() {
        const id = parseInt(this.$route.params.id as string, 10);
        if (!id) {
            this.$router.push('/');
            return;
        }
        getArticle(id).then(res => {
            this.article = res;
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
