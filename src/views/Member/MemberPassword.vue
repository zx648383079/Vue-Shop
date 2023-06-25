<template>
    <div>
        <LargeHeader :title="($route.meta.title as any)" @submited="tapSubmit()"/>
        <div >
            <div class="input-box">
                <input type="password" placeholder="旧密码" required  v-model="input.oldpassword">
            </div>
            <div class="input-box">
                <input type="password" placeholder="新密码" required v-model="input.password">
            </div>
            <div class="input-box">
                <input type="password" placeholder="确认新密码" required v-model="input.repassword">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import LargeHeader from '@/components/LargeHeader.vue';
import Toast from '@/components/toast';
import { updatePassword } from '../../api/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const input = reactive({
    oldpassword: '',
    password: '',
    repassword: '',
});

function tapSubmit() {
    if (input.password !== input.repassword) {
        Toast('确认密码不一致！');
        return;
    }
    updatePassword(input.oldpassword, input.password, input.repassword).then(() => {
        authStore.logoutUser().then(() => {
            router.push('/login');
        });
    });
}
</script>
<style lang="scss" scoped>
</style>
