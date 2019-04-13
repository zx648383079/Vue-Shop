<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <CatItem :items="items" @click="tapCategory"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import CatItem from './Child/CatItem.vue';
import { IArticleCategory } from '@/api/model';
import { getCategories } from '@/api/article';

@Component({
    components: {
        BackHeader,
        CatItem,
    },
})
export default class Category extends Vue {
    public items: IArticleCategory[] = [];
    public id: number = 0;

    public created() {
        const id = parseInt(this.$route.query.id + '', 10);
        if (id) {
            this.id = id;
        }
    }
    /**
     * tapCategory
     */
    public tapCategory(item: IArticleCategory) {
        this.id = item.id;
        this.$route.meta.title = item.name;
        this.tapRefresh();
    }

    public tapRefresh() {
        getCategories(this.id).then(res => {
            if (!res.data) {
                return;
            }
            this.items = res.data;
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
