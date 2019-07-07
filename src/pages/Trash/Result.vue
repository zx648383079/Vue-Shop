<template>
    <div>
        <BackHeader :title="this.$route.meta.title"></BackHeader>
        <div class="has-header">
            <div class="name">{{trash.name}}属于{{trash.classification.name}}</div>
            <div class="classify-box">
                <div class="introduce-box">
                    <div class="thumb">
                        <img :src="trash.classification.image" alt="">
                    </div>
                    <div class="introduce">
                        <div class="header">{{trash.classification.name}}是指：</div>
                        <p>{{trash.classification.introduce}}</p>
                    </div>
                </div>
                <div class="box-header">
                    {{trash.classification.name}}主要包括
                </div>
                <div class="box-body">{{trash.classification.contain}}</div>
                <div class="box-header">
                    {{trash.classification.name}}投放要求
                </div>
                <div class="box-body" v-if="typeof trash.classification.standard !== 'object'">{{trash.classification.standard}}</div>
                <div class="box-body" v-else>
                    <p v-for="(item, index) in trash.classification.standard" :key="index">{{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

interface Trash {
    name: string,
    classification: TrashClassification,
}

interface TrashClassification {
    name: string,
    image: string,
    introduce: string,
    contain: string,
    standard: string|string[]
}

@Component
export default class Detail extends Vue {
    public trash: Trash| null = null;

    public created() {
        const keywords = this.$route.query.keywords + '';
        this.trash = {
            name: keywords,
            classification: {
                name: '干垃圾',
                image: 'https://img03.sogoucdn.com/app/a/100520091/20190615142346',
                introduce: '适宜回收利用和资源化利用的，如：玻、金、塑、纸、衣',
                contain: '酱油瓶、玻璃杯、平板玻璃、易拉罐、',
                standard: [
                    '轻投轻放',
                    '清洁干燥，避免污染',
                    '废纸尽量平整'
                ]
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
