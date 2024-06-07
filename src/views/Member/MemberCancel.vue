<template>
    <div>
        <BackHeader :title="($route.meta.title as any)"/>
        <div class="has-header">
            <div class="tip">
                请选择注销原因：
            </div>

            <div class="item" v-for="(item, index) in items" :key="index"  @click="selected = index">
                <i class="iconfont check-box" :class="{active: selected == index}"></i>
                {{ item }}
            </div>

            <div class="btn del-btn">确定注销</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDialog } from '../../components/Dialog/plugin';

const router = useRouter();
const toast = useDialog();
const items: string[] = [
    '需要解绑手机',
    '需要解绑邮箱',
    '安全/隐私顾虑',
    '这是多余的账户',
];

const selected = ref(0);

onMounted(() => {
    toast.confirm({
        content: '账户注销后，您已完成的交易将无法售后。', 
        title: '账户注销确认', 
        confirmText: '确定继续注销',
        cancelText: '暂不注销',
    }).catch(() => {
        router.back();
    });
});
</script>
<style lang="scss" scoped>
.tip {
    line-height: 1.875rem;
    padding: 0.625rem;
}
.item {
    background-color: #fff;
    position: relative;
    padding-left: 3.75rem;
    line-height: 2.5rem;
    .iconfont {
        position: absolute;
        // top: 0.75rem;
        left: 1.25rem;
    }
    &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
    }
}
</style>
