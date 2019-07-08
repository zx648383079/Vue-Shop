<template>
    <div>
        <BackHeader :title="this.$route.meta.title"></BackHeader>
        <div class="has-header">
            <div class="trash-header">
                <p>垃圾分类</p>
                <p class="right">从我做起</p>
            </div>
            <SearchBar v-model="keywords" @search="tapSearch"/>
            <div class="grid-box" v-show="!selected">
                <div class="header">生活垃圾基本分类</div>
                <div class="item" v-for="(item, index) in items" :key="index" @click="tapItem(item)">
                    <div class="thumb">
                        <img :src="item.image">
                    </div>
                    <div class="name">
                        <span>{{ item.name }}</span>
                        <p>{{ item.en_name }}</p>
                    </div>
                </div>
            </div>
            <Classification v-if="selected" :item="selected"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import Classification from './Child/Classification.vue';
import SearchBar from './Child/SearchBar.vue';

interface TrashClassification {
    name: string,
    en_name: string,
    image: string,
    standard: string|string[],
    content: string,
}

@Component({
    components: {
        BackHeader,
        Classification,
        SearchBar,
    },
})
export default class Index extends Vue {

    public items: TrashClassification[] = [
        {
            name: '可回收',
            en_name: 'RECYCLABLE',
            image: 'https://img03.sogoucdn.com/app/a/100520091/20190615142346',
            standard: [
                '轻投轻放',
                '清洁干燥，避免污染',
                '废纸尽量平整',
            ],
            content: '1231231',
        },
    ];

    public keywords: string = '';

    public selected: TrashClassification | null = null;

    public created() {
    }

    public tapItem(item: TrashClassification) {
        this.selected = item;
    }

    public tapSearch(keywords: string) {
        this.$router.push({name: 'trash-result', query: {keywords}});
    }
}
</script>
<style lang="scss" scoped>
.trash-header {
    background-color: #05a6b1;
    color: #fff;
    height: 100px;
    padding: 20px 20%;
    .right {
        float: right;
    }
}

.grid-box {
    margin: 10px;
    background-color: #fff;
    .header {
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        line-height: 2.75rem;
    }
    .item {
        display: inline-flex;
        .thumb {
            img {
                width: 60px;
            }
        }
        .name {

        }
    }
}
</style>
