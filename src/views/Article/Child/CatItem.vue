<template>
    <div class="item-list">
        <a v-for="(item, index) in props.items" :key="index" @click="tapItem(item)">
            {{ item.name }}
            <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
        </a>
    </div>
</template>
<script setup lang="ts">
import type { IArticleCategory } from '@/api/model';

const emit = defineEmits(['tapped']);
const props = defineProps<{
    items: IArticleCategory[]
}>();
function tapItem(item: IArticleCategory) {
    emit('tapped', item);
}
</script>
<style lang="scss" scoped>

</style>
