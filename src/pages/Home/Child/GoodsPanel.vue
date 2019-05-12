<template>
    <div>
        <div class="home-panel" v-if="items && items.length > 0">
            <div class="panel-header">{{ title }}</div>
            <div class="goods-list">
                <GoodsItem v-for="(item, index) in items" :key="index" @enter="tapProduct" :item="item" @addCart="tapAddCart"></GoodsItem>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import GoodsItem from './GoodsItem.vue';
import { IProduct } from '@/api/model';

@Component({
    components: {
        GoodsItem,
    },
})
export default class GoodsPanel extends Vue {
    @Prop(String) public readonly title!: string;
    @Prop(Array) public readonly items!: IProduct[];

    public tapProduct(item: IProduct) {
        this.$emit('enter', item);
    }
    public tapAddCart(item: IProduct) {
        this.$emit('addCart', item);
    }
}
</script>
