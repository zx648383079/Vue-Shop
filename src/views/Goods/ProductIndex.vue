<template>
    <div>
        <header class="top">
            <a @click="tapBack" class="back">
                <i class="iconfont icon-chevron-left" aria-hidden="true"></i>
            </a>
            <div class="top-tab">
                <a v-for="(item, index) in tabMenus" :key="index" @click="tapScroll(item.id)" :class="{active: item.id == input.tabIndex}">{{ item.name }}</a>
            </div>
        </header>

        <div class="has-header has-footer" v-if="goods">

            <div id="info">
                <div class="goods-gallary-box">
                    <SwiperContainer :items="bannerItems"/>
                </div>

                <div class="activity-box" v-if="goods.activity">
                    <div class="item-price">
                        <em>￥</em>{{ goods.price }}
                    </div>
                    <div class="info">
                        <p class="old-price">{{ goods.market_price }}</p>
                        <span class="time-block"><i class="iconfont icon-clock"></i>秒杀</span>
                    </div>
                    <CountDown label="距秒杀结束还剩" end="0"/>
                </div>

                <div class="goods-info">
                    <div class="goods-header">
                        <h1 class="goods-name">{{ goods.name }}</h1>
                        <div :class="['goods-collect', goods.is_collect ? 'active' : '']" @click="tapCollect">
                            <i class="like-icon"></i>
                            收藏
                        </div>
                    </div>
                    <div class="goods-price">{{ $n(goods.price, 'currency') }}</div>

                    <PaymentLine/>
                    <ShippingLine/>
                    <CouponLine/>
                    <ServiceLine/>
                    <ActivityLine/>
                </div>
            </div>

            <div id="comments" class="comment-box" v-if="comment">
                <div class="comment-header">
                    评价
                    <i @click="tapGoComment" class="iconfont icon-angle-right"></i>
                </div>
                <a class="page-empty-tip" v-if="comment.total < 1">暂无评价</a>
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
                    <div class="product-item" v-for="(item, index) in items" :key="index">
                        <div class="item-thumb">
                            <a @click="tapProduct(item)"><img :src="item.thumb" alt=""></a>
                        </div>
                        <div class="item-title">
                            {{ item.name }}
                        </div>
                        <div class="item-actions">
                            <span class="item-price">{{ $n(item.price, 'currency') }}</span>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>

            <div id="detail" class="tab-box goods-content">
                <div class="tab-header"><div :class="['tab-item', input.tab < 1 ? 'active' : '']" @click="input.tab = 0">商品介绍</div><div :class="['tab-item', input.tab == 1 ? 'active' : '']"  @click="input.tab = 1">规格参数</div><div :class="['tab-item', input.tab == 2 ? 'active' : '']"  @click="input.tab = 2">售后保障</div></div>
                <div class="tab-body">
                    <div :class="['tab-item', input.tab < 1 ? 'active' : '']" v-html="goods.content"></div>
                    <div :class="['tab-item', input.tab == 1 ? 'active' : '']">
                        <div class="static-properties-box" v-if="goods.static_properties">
                            <dl v-for="(item, index) in goods.static_properties" :key="index">
                                <dt>{{ item.name }}</dt>
                                <dd>{{ item.attr_item ? item.attr_item.value : '' }}</dd>
                            </dl>
                        </div>
                    </div>
                    <div  :class="['tab-item', input.tab == 2 ? 'active' : '']">售后保障</div>
                </div>
            </div>

        </div>

        <footer class="goods-navbar">
            <a @click="$router.push('/')">
                <i class="iconfont icon-home" aria-hidden="true"></i>
                首页
            </a>
            <a  @click="$router.push('/category')">
                <i class="iconfont icon-table" aria-hidden="true"></i>
                分类
            </a>
            <a  @click="$router.push('/cart')">
                <i class="iconfont icon-cart" aria-hidden="true"></i>
                购物车
            </a>
            <a class="btn btn-success" @click="tapAddCart">
                加入购物车
            </a>
            <a class="btn btn-danger" @click="tapBuy">
                立即购买
            </a>
        </footer>

        <CartDialog :mode="input.mode" :product="(goods as any)" @close="input.mode = 0"/>
    </div>
</template>
<script setup lang="ts">
import type { IProduct, ICommentSubtotal, IAd } from '@/api/model';
import { getInfo, getRecommend } from '@/api/product';
import { getCommentSubtotal } from '@/api/comment';
import { toggleCollect } from '@/api/user';
import CountDown from '../../components/CountDown.vue';
import ActivityLine from './Child/ActivityLine.vue';
import CouponLine from './Child/CouponLine.vue';
import PaymentLine from './Child/PaymentLine.vue';
import ShippingLine from './Child/ShippingLine.vue';
import ServiceLine from './Child/ServiceLine.vue';
import SwiperContainer from '../Home/Child/SwiperContainer.vue';
import CommentPage from './Child/CommentPage.vue';
import { SET_GOODS_HISTORY } from '@/stores/types';
import CartDialog from './Child/CartDialog.vue';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useDialog } from '../../components/Dialog/plugin';
import { useCache, useTheme } from '../../services';

const route = useRoute();
const router = useRouter();
const cache = useCache();
const authStore = useAuthStore();
const toast = useDialog();
const goods = ref<IProduct | null>(null);
const input = reactive({
    amount: 1,
    mode: 0,
    tab: 0,
    tabIndex: 'info'
});
const bannerItems = ref<IAd[]>([]);
const comment = ref<ICommentSubtotal | null>(null);
const items = ref<IProduct[]>([]);
const tabMenus = [
    {
        id: 'info',
        name: '商品',
    },
    {
        id: 'detail',
        name: '详情',
    },
    {
        id: 'comments',
        name: '评价',
    },
    {
        id: 'recommend',
        name: '推荐',
    },
];
const isGuest = computed(() => authStore.guest);

function handleScroll() {
    const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    for (const item of tabMenus) {
        const ele = document.getElementById(item.id);
        if (!ele) {
            continue;
        }
        const y = ele.offsetTop;
        if (y <= top && top < y + ele.offsetHeight) {
            input.tabIndex = item.id;
            return;
        }
    }
}

function setHistory() {
    if (!goods.value) {
        return;
    }
    let data = cache.get<number[]>(SET_GOODS_HISTORY, true);
    if (!data) {
        data = [goods.value.id];
    } else if (data.indexOf(goods.value.id) < 0) {
        data.push(goods.value.id);
    }
    cache.set(SET_GOODS_HISTORY, data);
}

function loadComment() {
    if (!goods.value) {
        return;
    }
    getCommentSubtotal(goods.value.id).then(res => {
        comment.value = res;
    });
}

function loadRecommend() {
    if (!goods.value) {
        return;
    }
    getRecommend(goods.value.id).then(res => {
        if (!res.data) {
            return;
        }
        items.value = res.data;
    })
}

function tapBack() {
    if (window.history.length <= 1) {
        router.push('/');
        return;
    }
    router.go(-1);
}

function tapGoComment() {
    if (!goods.value) {
        return;
    }
    router.push({name: 'product-comment', params: {id: goods.value.id + ''}});
}

function tapScroll(id: string) {
    const ele = document.getElementById(id);
    if (ele) {
        ele.scrollIntoView();
        input.tabIndex = id;
    }
}

function tapProduct(item: IProduct) {
    router.push({name: 'product', params: {id: item.id + ''}});
}

function tapAddCart() {
    input.mode = 1;
}

function tapBuy() {
    input.mode = 2;
}

function tapCollect() {
    if (!goods.value) {
        return;
    }
    if (isGuest.value) {
        return;
    }
    toggleCollect(goods.value.id).then(res => {
        if (!goods.value) {
            return;
        }
        goods.value.is_collect = res.data;
    });
}


onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);   //  离开页面清除（移除）滚轮滚动事件
});

const id = parseInt(route.params.id as string, 10);
if (!id) {
    toast.warning('商品错误');
    router.push('/');
} else {
    getInfo(id).then(res => {
        useTheme().setTitle(res.name);
        bannerItems.value = res.gallery ? res.gallery.map(item => {
            return {type: item.type === 1 ? 3 : 1, content: item.file} as any;
        }) : [{type: 1, content: res.thumb} as any];
        goods.value = res;
        loadComment();
        loadRecommend();
        setHistory();
        if (route.hash) {
            tapScroll(route.hash.replace('#', ''));
        }
    });
}

</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.goods-gallary-box {
    --#{$prefix}-swiper-text: var(--#{$prefix}-body-text);
    --#{$prefix}-swiper-height: 22.5rem;
}
</style>
