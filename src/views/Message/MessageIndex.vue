<template>
    <div>
        <BackHeader title="我的消息"/>
        <div class="has-header">
            <div class="swipe-box address-list">
                <SwipeRow name="address-item" v-for="(item, index) in items" :key="index" @remove="tapRemove(item)" :index="index" ref="swiperow">
                    <div class="address-first">
                        <span>系</span>
                    </div>
                    <div class="address-info">
                        <h3>213213213123</h3>
                        <p>
                            2019-29
                        </p>
                    </div>
                </SwipeRow>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import SwipeRow from '@/components/SwipeRow.vue';
import { ref } from 'vue';

const items = ref<any[]>(['1231231', 1002]);

function tapRemove(item: any) {
    // console.log(item)
}
</script>
<style lang="scss" scoped>

</style>
