<template>
    <div class="box">
        <div class="header">{{ item.name }}</div>
        <div class="thumb">
            <img :src="item.image" alt="">
        </div>
        <div class="content" v-html="item.content"></div>
        <div class="line-header">
            {{item.name}}投放指导
        </div>
        <div class="body" v-if="typeof item.standard !== 'object'">{{item.standard}}</div>
        <div class="body" v-else>
            <p v-for="(item, index) in item.standard" :key="index">{{ item }}</p>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

interface TrashClassification {
    name: string,
    image: string,
    introduce: string,
    contain: string,
    standard: string|string[],
    content: string,
}

@Component
export default class Classification extends Vue {
    @Prop(Object) public readonly item!: TrashClassification;
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
