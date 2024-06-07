<template>
    <form method="POST" class="comment-form-item">
        <div class="goods-img">
            <img :src="props.item.thumb" alt="">
        </div>
        <div class="comment-star">
            <Star v-model="comment.rank"/>
        </div>
        <div class="comment-input">
            <p>分享您的使用体验吧</p>
            <textarea name="content" v-model="comment.content"></textarea>
            <div class="multi-image-box">
                <div class="image-item" v-for="(img, i) in comment.images" :key="i">
                    <img :src="img.image" alt="">
                    <i class="iconfont icon-times" @click="tapRemove(i)"></i>
                </div>
                <div class="add-item" >
                    <i class="iconfont icon-plus"></i>
                </div>
            </div>
        </div>
        <div class="input-radio">
            <span>匿名评价</span>
            <i class="iconfont toggle-box"></i>
        </div>
        <button type="button" @click="tapSave" class="btn">提交评价</button>
    </form>
</template>
<script setup lang="ts">
import type { IOrderGoods, IComment } from '@/api/model';
import Star from './StarInput.vue';
import { commentGoods } from '@/api/order';
import { reactive } from 'vue';
import { useDialog } from '../../../components/Dialog/plugin';

const toast = useDialog();
const emit = defineEmits(['commented']);
const props = defineProps<{
    item: IOrderGoods
}>();

const comment = reactive<IComment>({
    title: '',
    content: '',
    rank: 10,
    images: [],
});

function tapRemove(i: number) {
    if (!comment || !comment.images) {
        return;
    }
    comment.images.splice(i, 1);
}

function tapSave() {
    const data = {
        title: props.item.name,
        content: comment.content,
        rank: comment.rank,
        images: comment.images,
        goods: props.item.id,
    };
    if (!data.content || data.content.length < 10) {
        toast.warning('评论内容必须大于10个字符');
        return;
    }
    commentGoods(data).then(() => {
        emit('commented');
    });
}
</script>
<style lang="scss" scoped>

</style>
