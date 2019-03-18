<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header has-footer">
            <div :class="['scroll-nav', isExpand ? 'unfold' : '']">
                <ul>
                    <li v-for="(item, index) in categories" :key="index">
                            <a href="">{{ item.name }}</a>
                    </li>
                </ul>
                <a @click="isExpand = !isExpand" class="fa nav-arrow"></a>
            </div>

            <PullToRefresh :loading="is_loading" :more="has_more" @refresh="tapRefresh" @more="tapMore">
                <div class="coupon-item" v-for="(item, index) in items" :key="index">
                    <div class="thumb">
                        <img src="<?=$item->thumb?>" alt="">
                    </div>
                    <div class="info">
                        <p><?=$item->name?></p>
                        <?php if($item->type > 0):?>
                        <dl class="discount">
                            <dd>8.8折</dd>
                            <dt>满168可用</dt>
                        </dl>
                        <?php else:?>
                        <div class="price">
                            <em>¥300</em>
                            满168可用
                        </div>
                        <?php endif;?>
                    </div>
                    <div class="action">
                        <span class="status-icon">立即<br>领取</span>
                        <i>剩余76%</i>
                    </div>
                </div>
            </PullToRefresh>
        </div>

        <footer class="tab-bar">
            <a class="active">
                <i class="fa fa-gift" aria-hidden="true"></i>
                领券
            </a>
            <a @click="$router.push('/coupon/my')">
                <i class="fa fa-user" aria-hidden="true"></i>
                我的优惠券
            </a>
        </footer>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import { ICategory } from '@/api/model';
import { dispatchCategories } from '@/store/dispatches';

@Component({
    components: {
        BackHeader,
        PullToRefresh,
    }
})
export default class Index extends Vue {
    categories: ICategory[] = [];
    status: number = 0;
    items = [];
    isExpand: boolean = false;
    has_more = true;
    page = 1;
    is_loading = false;

    created() {
        dispatchCategories().then(res => {
            this.categories = res;
        });
    }

    tapRefresh() {
        this.goPage(1);
    }

    tapMore() {
        if (!this.has_more) {
            return;
        }  
        this.goPage(this.page + 1);
    }

    goPage(page: number) {
        if (this.is_loading) {
            return;
        }
        this.is_loading = true;
        setTimeout(() => {
            this.page = page;
            this.is_loading = false;
            const data = [1,2,3,4,5,6,7];
            if (this.page < 2) {
                this.items = data;
                return;
            }
            this.items = [].concat(this.items, data);
        }, 2000);
    }

}
</script>
<style lang="scss" scoped>

</style>
