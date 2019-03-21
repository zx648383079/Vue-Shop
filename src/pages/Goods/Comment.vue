<template>
    <div>
        <header class="top">
            <a @click="tapBack" class="back">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <div class="top-tab">
                <a >商品</a>
                <a >详情</a>
                <a href="#comments" class="active">评价</a>
                <a >推荐</a>
            </div>
        </header>

        <div class="has-header">

            <div id="comments" class="comment-box"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="is_loading"
                infinite-scroll-distance="10">
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
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IComment, ICommentSubtotal } from '@/api/model';
import CommentPage from './Child/Page.vue';
import { Toast } from 'mint-ui';
import { getCommentSubtotal, getCommentList } from '@/api/comment';
import { InfiniteScroll } from 'mint-ui';
import Star from './Child/Star.vue';

Vue.use(InfiniteScroll);

@Component({
    components: {
        CommentPage,
        Star,
    },
})
export default class Comment extends Vue {
    public comment: ICommentSubtotal | null = null;
    public items: IComment[] = [];
    public item_id: number = 0;
    public item_type: number = 0;
    public has_more = true;
    public page = 1;
    public is_loading = false;

    public created() {
        this.item_id = parseInt(this.$route.params.id);
        if (!this.item_id) {
            Toast('商品错误');
            this.$router.push('/');
            return;
        }
        getCommentSubtotal(this.item_id).then(res => {
            this.comment = res;
        });
        this.refresh();
    }

    public tapBack() {
        if (window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }

    public loadMore() {
        this.goPage( ++ this.page);
    }

    /**
     * refresh
     */
    public refresh() {
        this.items = [];
        this.is_loading = false;
        this.has_more = true;
        this.goPage(this.page = 1);
    }

    public goPage(page: number) {
        if (this.is_loading || !this.has_more) {
            return;
        }
        this.is_loading = true;
        getCommentList({
            item_id: this.item_id,
            item_type: this.item_type,
            page,
        }).then(res => {
            this.has_more = res.paging.more;
            this.is_loading = false;
            if (!res.data) {
                return;
            }
            this.items = [].concat(this.items as never[], res.data as never[]);
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
