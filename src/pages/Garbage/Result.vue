<template>
    <div :class="computedStyle">
        <BackHeader :title="$route.meta.title"></BackHeader>
        <div class="has-header">
            <div class="name">{{garbage.name}}属于{{garbage.classification.name}}</div>
            <div class="classify-box">
                <div class="introduce-box">
                    <div class="thumb">
                        <img :src="garbage.classification.image" alt="">
                    </div>
                    <div class="introduce">
                        <div class="header">{{garbage.classification.name}}是指：</div>
                        <p>{{garbage.classification.introduce}}</p>
                    </div>
                </div>
                <div class="box-header">
                    {{garbage.classification.name}}主要包括
                </div>
                <div class="box-body">{{garbage.classification.contain}}</div>
                <div class="box-header">
                    {{garbage.classification.name}}投放要求
                </div>
                <div class="box-body" v-if="typeof garbage.classification.standard !== 'object'">{{garbage.classification.standard}}</div>
                <div class="box-body" v-else>
                    <p v-for="(item, index) in garbage.classification.standard" :key="index">{{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IGarbage, getGarbage } from '@/api/garbage';

@Options({
    components: {
        BackHeader,
    },
})
export default class Result extends Vue {
    public garbage: IGarbage| null = null;

    public created() {
        const keywords = this.$route.query.keywords + '';
        getGarbage(keywords).then(res => {
            this.garbage = res;
        })
    }

    get computedStyle() {
        if (!this.garbage || !this.garbage.classification) {
            return 'gray';
        }
        const name = this.garbage.classification.name;
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
