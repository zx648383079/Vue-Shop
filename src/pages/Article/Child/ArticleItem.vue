<template>
    <div>
        <dl class="article-item" v-for="(item, index) in items" :key="index">
            <dt><a @click="tapItem(item)">{{ item.title }}</a>
                <span class="book-time">{{ item.crated_at }}</span></dt>
            <dd>
                <p>{{ item.description ? item.description.substr(0, 100) : '' }}</p>
                <div class="tags">
                    <span class="author"><i class="fa fa-edit"></i><b>admin</b></span>
                    <span class="category"><i class="fa fa-bookmark"></i><b>其他</b></span>
                    <span class="comment"><i class="fa fa-comments"></i><b>0</b></span>
                    <span class="agree"><i class="fa fa-thumbs-o-up"></i><b>0</b></span>
                    <span class="click"><i class="fa fa-eye"></i><b>31</b></span>
                </div>
            </dd>
        </dl>
      
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IArticle } from '@/api/model';

@Component
export default class ArticleItem extends Vue {
    @Prop(Array) public readonly items!: any;

    public tapItem(item: IArticle) {
        this.$router.push({name: 'article-detail', params: {id: item.id + ''}});
    }
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
