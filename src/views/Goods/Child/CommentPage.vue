<template>
    <div>
      <div class="comment-item" v-for="(item, index) in props.items" :key="index">
            <div class="item-header">
                <div class="avatar">
                    <img :src="item.user?.avatar" alt="">
                </div>
                <div class="name">{{ item.user?.name }}</div>
                <Star :star="item.rank"/>
            </div>
            <div class="time">
                <span>{{ item.created_at }} </span>
                <div class="attr">
                规格:雾白
                </div>
            </div>
            <div class="content">{{ item.content }}</div>
            <ul class="image-box" v-if="item.images && item.images.length > 0">
                <li v-for="(img, i) in item.images" :key="i">
                    <img :src="img.image" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IComment } from '@/api/model';
import Star from './StarLabel.vue';

const props = defineProps<{
    items: IComment[]
}>();
</script>
<style lang="scss" scoped>

</style>
