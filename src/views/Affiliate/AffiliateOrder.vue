<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <div class="log-hr">
                2018年12月
            </div>
            <div class="log-item" v-for="(item, index) in items" :key="index">
                <div class="info">
                    <div class="name">12312332312</div>
                    <p>222</p>
                </div>
                <div class="amount">
                    +10
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { reactive, ref } from 'vue';

const queries = reactive({
    hasMore: true,
    page: 1,
    isLoading: false,
});

const items = ref<any[]>([]);

</script>
<style lang="scss" scoped>

</style>
