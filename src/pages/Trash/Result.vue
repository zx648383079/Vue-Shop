<template>
    <div :class="computedStyle">
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
import BackHeader from '@/components/BackHeader.vue';

interface Trash {
    name: string,
    classification: TrashClassification,
}

interface TrashClassification {
    name: string,
    image: string,
    introduce: string,
    contain: string,
    standard: string|string[],
}

@Component({
    components: {
        BackHeader,
    },
})
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
                    '废纸尽量平整',
                ],
            },
        };
    }

    get computedStyle() {
        if (!this.trash || !this.trash.classification) {
            return 'gray';
        }
        const name = this.trash.classification.name;
        if (name === '可回收物') {
            return 'blue';
        }
        if (name === '厨余垃圾' || name === '湿垃圾') {
            return 'green';
        }
        if (name === '有害垃圾') {
            return 'red';
        }
        return 'gray';
    }
}
</script>
<style lang="scss" scoped>
$gray: gray;
$red: red;
$green: green;
$blue: blue;

.name {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 50px;
}
.classify-box {
    border: 2px dotted;
    margin: 20px;
    padding: 20px 0;
    .introduce-box {
        display: grid;
        grid-template-columns: 80px 1fr;
        grid-gap: 10px;
        margin: 10px;
        .thumb {
            img {
                width: 100%;
            }
        }
        .header {
            font-size: 20px;
            font-weight: 700;
            border: none;
            height: auto;
        }
    }
    .box-body {
        padding: 10px;
    }
    .box-header {
        line-height: 40px;
        background-color: #333;
        color: #fff;
        text-align: center;
    }
}
@mixin theme($name, $color) {
   #{$name} {
       .name {
            color: $color;
        }
        .classify-box {
            color: $color;
            border-color: $color;
            .box-header {
                background-color: $color;
            }
        }
   }
}
@include theme('.gray', $gray);
@include theme('.blue', $blue);
@include theme('.green', $green);
@include theme('.red', $red);

</style>
