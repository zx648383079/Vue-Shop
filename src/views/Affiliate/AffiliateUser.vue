<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <div class="swipe-box address-list">
                <div class="swipe-row" v-for="(item, index) in items" :key="index">
                    <div class="swipe-content address-item">
                        <div class="address-first">
                            <img :src="'/assets/images/avatar/14.png'" alt="">
                        </div>
                        <div class="address-info">
                            <h3>213213213123</h3>
                            <p>
                               123
                            </p>
                        </div>
                    </div>
                    <div class="actions-right">
                        <i class="iconfont icon-trash"></i>
                    </div>
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
const items = ref([]);
</script>
<style lang="scss" scoped>

</style>
