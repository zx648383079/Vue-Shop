<template>
    <div>
        <header class="top">
            <a @click="tapBack" class="back">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <div class="top-tab">
                <a href="#info" class="active">商品</a>
                <a href="#detail">详情</a>
                <a href="#comments">评价</a>
                <a href="#recommend">推荐</a>
            </div>
        </header>

        <div class="has-header has-footer" v-if="goods">

            <div id="info">
                <div class="goods-gallary-box">
                    <img :src="goods.thumb" alt="">
                </div>

                <div class="activity-box" v-if="goods.activty">
                    <div class="price">
                        <em>￥</em>{{ goods.price }}
                    </div>
                    <div class="info">
                        <p class="old-price">{{ goods.market_price | price }}</p>
                        <span class="time-block"><i class="fa fa-clock"></i>秒杀</span>
                    </div>
                    <div class="countdown">
                        <p class="text">距秒杀结束还剩</p>
                        <p class="time">
                            <span>01</span>
                            :
                            <span>01</span>
                            :
                            <span>01</span>
                        </p>
                    </div>
                </div>

                <div class="goods-info">
                    <div class="goods-header">
                        <h1 class="goods-name">{{ goods.name }}</h1>
                        <div :class="['goods-collect', goods.is_collect ? 'active' : '']" @click="tapCollect">
                            <i class="like-icon"></i>
                            收藏
                        </div>
                    </div>
                    <div class="goods-price">{{ goods.price | price }}</div>

                    <div class="promote-line">
                        <div>支付</div>
                        <div>
                        11111
                        </div>
                        <div>...</div>
                    </div>
                    <div class="promote-line">
                        <div>领券</div>
                        <div>
                        11111
                        </div>
                        <div>...</div>
                    </div>
                    <div class="promote-line">
                        <div>促销</div>
                        <div>
                        11111
                        </div>
                        <div>...</div>
                    </div>
                </div>
            </div>

            <div id="comments" class="comment-box" v-if="comment">
                <div class="comment-header">
                    评价
                    <i @click="tapGoComment" class="fa fa-angle-right"></i>
                </div>
                <a class="comment-more" v-if="comment.total < 1">暂无评价</a>
                <div v-else>
                    <div class="comment-stats" v-if="comment.tags && comment.tags.length > 0">
                        <a v-for="(item, index) in comment.tags" :key="index">{{ item.label }}（{{ item.count }}）</a>
                    </div>
                    <CommentPage :items="comment.comments"/>
                    <a @click="tapGoComment" class="comment-more">查看更多</a>
                </div>
            </div>

            <div id="recommend" class="recomment-box" v-if="items && items.length > 0">
                <div class="recommend-header">推荐</div>
                <div class="goods-list">
                    <div class="item-view" v-for="(item, index) in items" :key="index">
                        <div class="item-img">
                            <a @click="tapProduct(item)"><img :src="item.thumb" alt=""></a>
                        </div>
                        <div class="item-title">
                            {{ item.name }}
                        </div>
                        <div class="item-actions">
                            <span class="item-price">{{ item.price | price }}</span>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>

            <div id="detail" class="tab-box goods-content">
                <div class="tab-header"><div :class="['tab-item', tab < 1 ? 'active' : '']" @click="tab = 0">商品介绍</div><div :class="['tab-item', tab == 1 ? 'active' : '']"  @click="tab = 1">规格参数</div><div :class="['tab-item', tab == 2 ? 'active' : '']"  @click="tab = 2">售后保障</div></div>
                <div class="tab-body">
                    <div :class="['tab-item', tab < 1 ? 'active' : '']" v-html="goods.content"></div>
                    <div :class="['tab-item', tab == 1 ? 'active' : '']">
                        <div class="static-properties-box" v-if="goods.static_properties">
                            <dl v-for="(item, index) in goods.static_properties" :key="index">
                                <dt>{{ item.name }}</dt>
                                <dd>{{ item.attr_item ? item.attr_item.value : '' }}</dd>
                            </dl>
                        </div>
                    </div>
                    <div  :class="['tab-item', tab == 2 ? 'active' : '']">售后保障</div>
                </div>
            </div>

        </div>

        <footer class="goods-navbar">
            <a @click="$router.push('/')">
                <i class="fa fa-home" aria-hidden="true"></i>
                首页
            </a>
            <a  @click="$router.push('/category')">
                <i class="fa fa-th-large" aria-hidden="true"></i>
                分类
            </a>
            <a  @click="$router.push('/cart')">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                购物车
            </a>
            <a class="btn btn-orange" @click="tapAddCart">
                加入购物车
            </a>
            <a class="btn" @click="tapBuy">
                立即购买
            </a>
        </footer>

        <div class="cart-dialog" v-if="mode > 0" @click="mode = 0">
            <div class="dialog-body" @click.stop>
                <div class="dialog-header">
                    <img :src="goods.thumb" alt="">
                    <p class="price">{{ goods.price }}</p>
                    <p class="stock">库存：{{ goods.stock }}</p>
                    <p class="selected-property"></p>
                    <i class="fa fa-times dialog-close" @click="mode = 0"></i>
                </div>
                <div class="property-box">
                    <div v-for="(item, index) in goods.properties" :key="index" :class="['group', item.type == 2 ? ' multi-group' : '']">
                        <div class="group-header">{{ item.name }}</div>
                        <div class="group-body">
                            <span v-for="(attr, i) in item.attr_items" :key="i">{{ attr.value }}</span>
                        </div>
                    </div>

                    <div class="count-box">
                        <span>数量</span>
                        <div class="number-box">
                            <i class="fa fa-minus" @click="tapMinus"></i>
                            <input type="text" class="number-input" v-model="amount" @change="tapChangeAmount">
                            <i class="fa fa-plus" @click="tapPlus"></i>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <a @click="tapDoCart" class="dailog-yes">确认</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Toast } from 'mint-ui';
import { IProduct, ICommentSubtotal, ICart } from '@/api/model';
import { getInfo, getRecommend } from '@/api/product';
import { getCommentSubtotal } from '@/api/comment';
import { toggleCollect } from '@/api/user';
import { Getter, Action } from 'vuex-class';
import { addGoods } from '@/api/cart';
import CommentPage from './Child/Page.vue';
import { dispatchSetCart } from '@/store/dispatches';

@Component({
    components: {
        CommentPage,
    },
})
export default class Index extends Vue {
    public goods: IProduct | null = null;
    public amount: number = 1;
    public mode: number = 0;
    public tab: number = 0;
    public comment: ICommentSubtotal | null = null;
    public items: IProduct[] = [];
    @Getter('isGuest') isGuest?: boolean;

    public created() {
        const id = parseInt(this.$route.params.id);
        if (!id) {
            Toast('商品错误');
            this.$router.push('/');
            return;
        }
        getInfo(id).then(res => {
            this.goods = res;
            this.loadComment();
            this.loadRecommend();
        });  
    }

    public loadComment() {
        if (!this.goods) {
            return;
        }
        getCommentSubtotal(this.goods.id).then(res => {
            this.comment = res;
        });
    }

    public loadRecommend() {
        if (!this.goods) {
            return;
        }
        getRecommend(this.goods.id).then(res => {
            if (!res.data) {
                return;
            }
            this.items = res.data;
        })
    }

    public tapBack() {
        if (window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }

    public tapGoComment() {
        if (!this.goods) {
            return;
        }
        this.$router.push({name: 'product-comment', params: {id: this.goods.id + ''}});
    }

    public tapProduct(item: IProduct) {
        this.$router.push({name: 'product', params: {id: item.id + ''}});
    }

    public tapAddCart() {
        this.mode = 1;
    }

    public tapBuy() {
        this.mode = 2;
    }

    public getStock(): number {
        if (!this.goods) {
            return 1;
        }
        return this.goods.stock as number;
    }

    public tapMinus() {
        this.amount = Math.max(this.amount - 1, 1);
    }

    public tapChangeAmount() {
        if (this.amount < 1) {
            this.amount = 1;
            return;
        }
        const stock = this.getStock();
        if (this.amount > stock) {
            this.amount = stock;
        }
    }

    public tapPlus() {
        this.amount = Math.min(this.amount + 1, this.getStock());
    }

    public tapCollect() {
        if (!this.goods) {
            return;
        }
        if (this.isGuest) {
            return;
        }
        toggleCollect(this.goods.id).then(res => {
            if (!this.goods) {
                return;
            }
            this.goods.is_collect = res.data;
        });
    }

    public tapDoCart() {
        if (!this.goods) {
            return;
        }
        if (this.mode == 1) {
            addGoods(this.goods.id, this.amount).then(res => {
                Toast('已成功加入购物车');
                this.mode = 0;
            });
            return;
        }
        const data: ICart[] = [
            {
                name: this.goods.shop + '',
                goods_list: [
                    {
                        goods_id: this.goods.id,
                        amount: this.amount,
                        goods: this.goods,
                        price: this.goods.price
                    }
                ]
            }
        ];
        dispatchSetCart(data).then(() => {
            this.$router.push('/cashier');
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
