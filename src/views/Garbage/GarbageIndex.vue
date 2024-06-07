<template>
    <div>
        <BackHeader :title="$route.meta.title as string"></BackHeader>
        <div class="has-header">
            <div class="garbage-header">
                <p>垃圾分类</p>
                <p class="right">从我做起</p>
            </div>
            <SearchBar v-model="queries.keywords" @search="tapSearch"/>
            <div class="grid-box" v-show="!queries.selected">
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
            <Classification v-if="queries.selected" :item="queries.selected" @back="queries.selected = null"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import Classification from './Child/GarbageClassification.vue';
import SearchBar from './Child/SearchBar.vue';
import { type IClassification, getClassification } from '@/api/garbage';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref<IClassification[]>([]);
const queries = reactive<{
    keywords: string,
    selected: IClassification|null
}>({
    keywords: '',
    selected: null
});

function tapItem(item: IClassification) {
    queries.selected = item;
}

function tapSearch(keywords: string) {
    router.push({name: 'garbage-result', query: {keywords}});
}

getClassification().then(res => {
    if (!res.data) {
        return;
    }
    items.value = res.data;
});
</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.garbage-header {
    background-color: var(--#{$prefix}-primary);
    color: var(--#{$prefix}-primary-text);
    height: 100px;
    padding: 20px 20%;
    .right {
        float: right;
    }
}

.grid-box {
    margin: 10px;
    background-color: var(--#{$prefix}-panel);
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
