<template>
    <div>
        <dl class="article-item" v-for="(item, index) in items" :key="index">
            <dt><a @click="tapItem(item)">CentOs 7 安装apche php mysql</a>
                <span class="book-time">2018-06-20 12:47:23</span></dt>
            <dd>
                <p>CentOs 7 安装apche php mysql,yum 安装，源码安装</p>
                <span class="author"><i class="fa fa-edit"></i><b>admin</b></span>
                <span class="category"><i class="fa fa-bookmark"></i><b>其他</b></span>
                <span class="comment"><i class="fa fa-comments"></i><b>0</b></span>
                <span class="agree"><i class="fa fa-thumbs-o-up"></i><b>0</b></span>
                <span class="click"><i class="fa fa-eye"></i><b>31</b></span>
            </dd>
        </dl>
      
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IArticle } from '@/api/model';

@Component
export default class ArticleItem extends Vue {
    @Prop(Array) readonly items!: any;

    public tapItem(item: IArticle) {
        this.$router.push({name: 'article-detail', params: {id: item.id + ''}});
    }
}
</script>
<style lang="scss" scoped>

</style>
