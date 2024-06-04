<template>
    <div>
        <BackHeader title="账户安全"/>
        <div class="has-header">
            <div class="account-box">
                <div class="line-item" v-for="(item, index) in items" :key="index">
                    <span><i :class="['fab', item.icon]"></i>{{ item.name }}</span>
                    <span>{{ item.id ? '已绑定' : '未绑定' }}</span>
                    <i class="iconfont icon-chevron-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { getConnect } from '@/api/user';
import type { IConnect } from '@/api/model';
import { ref } from 'vue';

const items = ref<IConnect[]>([]);

getConnect().then(res => {
    if (!res.data) {
        return;
    }
    items.value = res.data;
});
</script>
<style lang="scss" scoped>

</style>
