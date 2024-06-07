<template>
    <div>
        <LargeHeader :title="'编辑' + input.title" @submited="tapSubmit()"/>
        <div>
            <div class="input-box">
                <input type="text" :placeholder="input.title" required  v-model="input.value">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import LargeHeader from '@/components/LargeHeader.vue';
import { updateProfile } from '../../api/user';
import type { IUser } from '../../api/model';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useDialog } from '../../components/Dialog/plugin';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useDialog();
const PROFILE_NAMES: any = {
    name: '昵称',
};

const user = ref<IUser| null>(null);
const input = reactive({
    field: 'name',
    value: '',
    title: '昵称'
});


function tapSubmit() {
    if (input.value.length < 2) {
        toast.warning('请输入' + input.title + '！');
        return;
    }
    updateProfile({
        [input.field]: input.value,
    }).then(res => {
        authStore.setUser(res).then(() => {
            router.back();
        });
    });
}

input.field = route.params.field as string || 'name';
input.title = Object.prototype.hasOwnProperty.call(PROFILE_NAMES, input.field) ? PROFILE_NAMES[input.field]  : '信息';
authStore.getUser().then(res => {
    if (!res) {
        router.back();
        return;
    }
    user.value = res;
    input.value = Object.prototype.hasOwnProperty.call(res, input.field) ? (res as any)[input.field]  : '';
});
</script>
<style lang="scss" scoped>
</style>
