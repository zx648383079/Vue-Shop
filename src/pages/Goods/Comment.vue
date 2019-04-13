<template>
    <div>
        <header class="top">
            <a @click="tapBack" class="back">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <div class="top-tab">
                <a @click="tapProductScroll('info')">商品</a>
                <a @click="tapProductScroll('detail')">详情</a>
                <a class="active">评价</a>
                <a  @click="tapProductScroll('recommend')">推荐</a>
            </div>
        </header>

        <div class="has-header">
            <PullToRefresh :loading="isLoading" :more="hasMore" @refresh="tapRefresh" @more="tapMore">
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
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IComment, ICommentSubtotal } from '@/api/model';
import CommentPage from './Child/Page.vue';
import { Toast } from 'mint-ui';
import { getCommentSubtotal, getCommentList } from '@/api/comment';
import PullToRefresh from '@/components/PullToRefresh.vue';
import Star from './Child/Star.vue';

@Component({
    components: {
        CommentPage,
        Star,
        PullToRefresh,
    },
})
export default class Comment extends Vue {
    public comment: ICommentSubtotal | null = null;
    public items: IComment[] = [];
    public itemId: number = 0;
    public itemType: number = 0;
    public hasMore = true;
    public page = 1;
    public isLoading = false;

    public created() {
        this.itemId = parseInt(this.$route.params.id, 10);
        if (!this.itemId) {
            Toast('商品错误');
            this.$router.push('/');
            return;
        }
        getCommentSubtotal(this.itemId).then(res => {
            this.comment = res;
        });
        this.tapRefresh();
    }

    public tapBack() {
        if (window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }

    public tapMore() {
        this.goPage( ++ this.page);
    }

    /**
     * refresh
     */
    public tapRefresh() {
        this.items = [];
        this.isLoading = false;
        this.hasMore = true;
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.isLoading || !this.hasMore) {
            return;
        }
        this.isLoading = true;
        getCommentList({
            item_id: this.itemId,
            item_type: this.itemType,
            page,
        }).then(res => {
            this.hasMore = res.paging.more;
            this.isLoading = false;
            if (!res.data) {
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }

    /**
     * tapProductScroll
     */
    public tapProductScroll(id: string) {
        this.$router.replace({name: 'product', params: {id: this.itemId + ''}, hash: '#' + id});
    }
}
</script>
<style lang="scss" scoped>

</style>
