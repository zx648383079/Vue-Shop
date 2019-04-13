<template>
    <div class="item-list">
        <a v-for="(item, index) in items" :key="index" @click="tapItem(item)">
            {{ item.name }}
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { IArticleCategory } from '@/api/model';

@Component
export default class CatItem extends Vue {
    @Prop(Array) public readonly items!: IArticleCategory[];

    public tapItem(item: IArticleCategory) {
        this.$emit('click', item);
    }
}
</script>
<style lang="scss" scoped>

</style>
