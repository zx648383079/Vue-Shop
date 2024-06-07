<template>
    <div>
        <BackHeader title="账户安全"/>
        <div class="has-header">
            <div class="account-box">
                <div class="line-item" v-for="(item, index) in items" :key="index">
                    <div class="item-header">
                        <i :class="['iconfont', item.icon]"></i>{{ item.name }}
                        <em class="item-meta" v-if="item.platform || item.nickname">
                            (
                            <span class="item-platform">{{ item.platform }}：</span>{{ item.nickname }})
                        </em>
                    </div>
                    <span :class="{'meta-text': !item.id}">{{ item.id ? '已绑定' : '未绑定' }}</span>
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
import { iconfontFilter } from '../../pipes/iconfont';

const items = ref<IConnect[]>([]);

getConnect().then(res => {
    if (!res.data) {
        return;
    }
    items.value = res.data.map(item => {
        item.icon = iconfontFilter(item.icon);
        return item;
    });
});
</script>
<style lang="scss" scoped>
.item-meta {
    font-size: .8rem;
    font-style: normal;
}
</style>
