<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <CommentItem v-for="(item, index) in items" :key="index" :item="item" @commented="tapCommented(index)"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import type { IOrderGoods } from '@/api/model';
import { getUnCommentGoods } from '@/api/order';
import CommentItem from './Child/CommentItem.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const items = ref<IOrderGoods[]>([]);
function tapBack() {
    router.back();
}

function tapCommented(i: number) {
    if (items.value.length < 2) {
        tapBack();
        return;
    }
    items.value.splice(i, 1);
}
getUnCommentGoods(route.query).then(res => {
    if (!res.data || res.data.length < 1) {
        tapBack();
        return;
    }
    items.value = res.data;
});
</script>
<style lang="scss" scoped>

</style>
