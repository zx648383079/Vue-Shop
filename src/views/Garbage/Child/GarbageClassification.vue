<template>
    <div class="box">
        <div class="header">
            <i class="iconfont fa-arrow-left" @click="tapBack"></i>
            {{ props.item.name }}</div>
        <div class="thumb">
            <img :src="props.item.image" alt="">
        </div>
        <div class="content" v-html="props.item.content"></div>
        <div class="line-header">
            {{props.item.name}}投放指导
        </div>
        <div class="body" v-if="typeof props.item.standard !== 'object'">{{item.standard}}</div>
        <div class="body" v-else>
            <p v-for="(item, index) in props.item.standard" :key="index">{{ item }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IClassification } from '@/api/garbage';

const emit = defineEmits(['back']);
const props = defineProps<{
    item: IClassification
}>();

function tapBack() {
    emit('back');
}
</script>
<style lang="scss" scoped>
.box {
    margin: 10px;
    background-color: #fff;
    .header {
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        line-height: 2.75rem;
        position: relative;
        .fa {
            position: absolute;
            top: 13px;
            left: 0;
        }
    }
    .thumb {
       text-align: center;
       img {
           width: 60%;
       } 
    }
    .line-header {
        font-size: 16px;
        font-weight: 700;
        line-height: 2rem;
    }
    .content,
    .body{
        padding: 10px;
    }
}
</style>
