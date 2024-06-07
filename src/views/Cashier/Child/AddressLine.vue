<template>
    <div @click="tapClick">
        <div class="address-box" v-if="props.address">
            <i class="iconfont icon-map"></i>
            <p>
                <a >
                    <span class="name">{{ props.address.name }}</span>
                    <span class="tel">{{ props.address.tel }}</span>
                </a>
            </p>
            <p>{{ props.address.region?.full_name }} {{ props.address.address }}</p>
            <i class="iconfont icon-chevron-right"></i>
        </div>
        <div class="address-box empty-address" v-else>
            <i class="iconfont icon-map"></i>
            <h3>
                <a>请选择地址</a>
            </h3>
            <i class="iconfont icon-chevron-right"></i>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IAddress } from '@/api/model';

const emit = defineEmits(['tapped']);
const props = defineProps<{
    address: IAddress
}>();

function tapClick() {
    emit('tapped');
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.address-box {
    background-color: var(--#{$prefix}-panel);
}
</style>