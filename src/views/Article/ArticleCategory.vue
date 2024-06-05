<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <CatItem :items="items" @tapped="tapCategory"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import CatItem from './Child/CatItem.vue';
import type { IArticleCategory } from '@/api/model';
import { getCategories } from '@/api/article';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const items = ref<IArticleCategory[]>([]);
const id = ref(0);

function tapCategory(item: IArticleCategory) {
    id.value = item.id;
    route.meta.title = item.name;
    tapRefresh();
}

function tapRefresh() {
    getCategories(id.value).then(res => {
        if (!res.data) {
            return;
        }
        items.value = res.data;
    });
}


id.value = parseInt(route.query.id + '', 10);

</script>
<style lang="scss" scoped>

</style>
