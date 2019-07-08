<template>
    <div>
        <BackHeader :title="this.$route.meta.title"></BackHeader>
        <div class="has-header">
            <div class="garbage-header">
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
            <Classification v-if="selected" :item="selected" @back="selected = null"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import Classification from './Child/Classification.vue';
import SearchBar from './Child/SearchBar.vue';
import { IClassification, getClassification } from '@/api/garbage';

@Component({
    components: {
        BackHeader,
        Classification,
        SearchBar,
    },
})
export default class Index extends Vue {

    public items: IClassification[] = [];

    public keywords: string = '';

    public selected: IClassification | null = null;

    public created() {
        getClassification().then(res => {
            if (!res.data) {
                return;
            }
            this.items = res.data;
        });
    }

    public tapItem(item: IClassification) {
        this.selected = item;
    }

    public tapSearch(keywords: string) {
        this.$router.push({name: 'garbage-result', query: {keywords}});
    }
}
</script>
<style lang="scss" scoped>
.garbage-header {
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
