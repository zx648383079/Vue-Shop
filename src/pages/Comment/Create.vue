<template>
    <div>
        <BackHeader :title="$route.meta.title"/>
        <div class="has-header">
            <CommentItem v-for="(item, index) in items" :key="index" :item="item" @commented="tapCommented(index)"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IOrderGoods } from '@/api/model';
import { getUnCommentGoods } from '@/api/order';
import CommentItem from './Child/CommentItem.vue';

@Component({
    components: {
        BackHeader,
        CommentItem,
    },
})
export default class Index extends Vue {
    public items: IOrderGoods[] = [];

    public created() {
        getUnCommentGoods(this.$route.query).then(res => {
            if (!res.data || res.data.length < 1) {
                this.tapBack();
                return;
            }
            this.items = res.data;
        });
    }

    public tapBack() {
        this.$router.back();
    }

    public tapCommented(i: number) {
        if (this.items.length < 2) {
            this.tapBack();
            return;
        }
        this.items.splice(i, 1);
    }
}
</script>
<style lang="scss" scoped>

</style>
