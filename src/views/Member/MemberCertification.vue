<template>
    <div>
        <BackHeader :title="($route.meta.title as any)"/>
        <div class="has-header">
            <ApplyCertification v-if="!user"></ApplyCertification>
            <div v-else>
                <div class="top-header"></div>
                <div class="user-box">
                    <div class="avatar">
                        <img :src="avatar">
                    </div>
                    <h3>您已实名制</h3>
                    <div class="name">*zz</div>
                    <div class="card">4************</div>
                    <a href="">查看详情</a>
                </div>
                <div class="menu-list">
                    <MenuItem title="上传证件" icon="icon-camera"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import ApplyCertification from './Child/ApplyCertification.vue';
import type { IUser } from '../../api/model';
import MenuItem from './Child/MenuItem.vue';
import { assetsFilter } from '../../pipes';
import { computed, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const user = ref<IUser| null>(null);
const avatar = computed(() => {
    return assetsFilter(user.value ? user.value.avatar : '/assets/images/avatar/1.png');
});

authStore.getUser().then(res => {
    user.value = res;
});
</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
.top-header {
    background-color: var(--#{$prefix}-primary);
    color: var(--#{$prefix}-primary-text);
    height: 10rem;
    padding-top: 2.5rem;
}
.user-box {
    background-color: var(--#{$prefix}-panel);;
    width: 18.75rem;
    margin: -7.5rem auto 1.25rem;
    position: relative;
    padding: 3.75rem 1.25rem 1.25rem;
    .avatar {
        border-radius: 50%;
        height: 5rem;
        width: 5rem;
        position: absolute;
        top: -1.875rem;
        left: 6.875rem;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .name,
    .card {
        line-height: 1.875rem;
    }
}
</style>
