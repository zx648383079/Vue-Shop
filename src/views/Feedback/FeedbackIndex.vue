<template>
    <div>
        <LargeHeader :title="$route.meta.title as string" @submited="tapSubmit()"/>
        <div class="input-box">
            <input type="text" placeholder="称呼" required  v-model="input.name">
        </div>
        <div class="input-box">
            <input type="email" placeholder="邮箱" v-model="input.email">
        </div>
        <div class="input-box">
            <input type="text" placeholder="联系方式" v-model="input.phone">
        </div>
        <div class="input-box">
            <textarea placeholder="留言内容" v-model="input.content"></textarea>
        </div>
    </div>
</template>
<script setup lang="ts">
import LargeHeader from '@/components/LargeHeader.vue';
import { saveFeedback } from '@/api/account';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useDialog } from '../../components/Dialog/plugin';

const toast = useDialog();
const router = useRouter();
const input = reactive({
    name: '',
    email: '',
    phone: '',
    content: '',
});
function tapSubmit() {
    if (input.name.length < 1) {
        toast.warning('请输入称呼！');
        return;
    }
    if (input.content.length < 1) {
        toast.warning('请输入留言内容！');
        return;
    }
    saveFeedback({...input}).then(_ => {
        toast.warning('留言成功！');
        router.back();
    });
}
</script>
<style lang="scss" scoped>
</style>
