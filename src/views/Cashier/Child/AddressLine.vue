<template>
    <div @click="tapClick">
        <div class="address-box" v-if="props.address">
            <i class="iconfont fa-map-marker"></i>
            <p>
                <a >
                    <span class="name">{{ props.address.name }}</span>
                    <span class="tel">{{ props.address.tel }}</span>
                </a>
            </p>
            <p>{{ props.address.region?.full_name }} {{ props.address.address }}</p>
            <i class="iconfont fa-chevron-right"></i>
        </div>
        <div class="address-box empty-address" v-else>
            <i class="iconfont fa-map-marker"></i>
            <h3>
                <a>请选择地址</a>
            </h3>
            <i class="iconfont fa-chevron-right"></i>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IAddress } from '@/api/model';

const emit = defineEmits(['click']);
const props = defineProps<{
    address: IAddress
}>();

function tapClick() {
    emit('click');
}
</script>
<style lang="scss" scoped>
.address-box {
    background-color: #fff;
}
</style>