<template>
    <div>
        <BackHeader title="我的资料"/>
        <div class="has-header">

            <div class="profile-box" v-if="user">
                <div class="line-item avatar-item" @click="tapAvatar">
                    <span>头像</span>
                    <span class="avatar">
                        <img :src="user.avatar" alt="">
                    </span>
                    <i class="iconfont fa-chevron-right"></i>
                </div>
                <div class="line-item" @click="tapName">
                    <span>昵称</span>
                    <span>{{user.name}}</span>
                    <i class="iconfont fa-chevron-right"></i>
                </div>
                <div class="line-item">
                    <span>性别</span>
                    <span>{{user.sex}}</span>
                    <i class="iconfont fa-chevron-right"></i>
                </div>
                <DatePicker v-model="user.birthday" format="yyyy-mm-dd">
                    <div class="line-item">
                        <span>生日</span>
                        <span>{{user.birthday}}</span>
                        <i class="iconfont fa-chevron-right"></i>
                    </div>
                </DatePicker>
            </div>

            
            <div class="menu-list">
                <a @click="$router.push('/address')">
                    我的收货地址
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/member/password')">
                    修改密码
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/member/certification')">
                    实名认证
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/member/driver')">
                    登陆设备管理
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                <a @click="$router.push('/member/cancel')">
                    账户注销
                    <i class="iconfont fa-chevron-right" aria-hidden="true"></i>
                </a>
                
            </div>

            <a class="btn del-btn" @click="tapLogout">
                退出
            </a>
        </div>

    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import DatePicker from '@/components/DatePicker.vue';
import type { IUser } from '@/api/model';
import { updateProfile } from '../../api/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const user = ref<IUser| null>(null);

function tapName() {
    router.push({
        name: 'edit-profile',
        params: {
            name: 'name',
        },
    });
}

function tapAvatar() {
    // TODO
}

function onUpdateProfile(name: string, value: any) {
    updateProfile({
        name, value,
    }).then(res => {
        authStore.setUser(res).then(() => {
            return;
        });
    });
}

function tapLogout() {
    authStore.logoutUser().then(() => {
        router.push('/login');
    });
}

authStore.getUser().then(res => {
    user.value = res;
});
</script>
<style lang="scss" scoped>

</style>
