<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <div :class="['scroll-nav', isExpand ? 'unfold' : '']">
                <ul>
                    <li v-for="(item, index) in categories" :key="index" :class="{active: category == item.id}">
                            <a>{{ item.name }}</a>
                    </li>
                </ul>
                <a @click="isExpand = !isExpand" :class="['iconfont', 'nav-arrow', isExpand ? 'fa-chevron-up' : 'fa-chevron-down']"></a>
            </div>
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
                <ArticleItem :items="items"/>
            </PullToRefresh>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import PullToRefresh from '@/components/PullToRefresh.vue';
import BackHeader from '@/components/BackHeader.vue';
import {getArticleList, getCategories} from '@/api/article';
import { IArticleCategory, IArticle } from '@/api/model';
import ArticleItem from './Child/ArticleItem.vue';

@Options({
    components: {
        BackHeader,
        PullToRefresh,
        ArticleItem,
    },
})
export default class Index extends Vue {
    public categories: IArticleCategory[] = [];
    public category = 0;
    public status = 0;
    public items: IArticle[] = [];
    public isExpand = false;
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        if (this.$route.query.category) {
            this.category = parseInt(this.$route.query.category + '', 10);
        }
        getCategories().then(res => {
            if (!res.data) {
                return;
            }
            this.categories = res.data;
            if (!this.category || this.category < 1) {
                this.tapCategory(res.data[0]);
            }
        });
        if (this.category && this.category > 0) {
            this.tapRefresh();
        }
    }

    /**
     * tapCategory
     */
    public tapCategory(item: IArticleCategory) {
        this.category = item.id;
        this.$route.meta.title = item.name;
        this.isExpand = false;
        this.tapRefresh();
    }

    public tapRefresh() {
        this.goPage(1);
    }

    public tapMore() {
        if (!this.hasMore) {
            return;
        }
        this.goPage(this.page + 1);
    }

    public goPage(page: number) {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        getArticleList({
            category: this.category,
            page,
        }).then(res => {
            this.page = page;
            this.isLoading = false;
            if (this.page < 2) {
                this.items = res.data as never[];
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
