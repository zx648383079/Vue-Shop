<template>
    <div>
        <BackHeader :title="this.$route.meta.title"></BackHeader>
        <div class="has-header">
            <div class="search-box">
                <i class="fa fa-photo"></i>
                <input type="text">
                <i class="fa fa-search"></i>
            </div>
            <div class="grid-box">
                <div class="header">生活垃圾基本分类</div>
                <div class="item">
                    <div class="thumb">
                        <img>
                    </div>
                    <div class="name">
                        <span>可回收物</span>
                        <p>RECYCLABLE</p>
                    </div>
                </div>
            </div>
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
    standard: string|string[]
}

@Component
export default class Index extends Vue {

    public created() {
    }
}
</script>
<style lang="scss" scoped>

</style>
