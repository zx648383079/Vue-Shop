<template>
    <div class="mobile-input-group">
        <input type="text" class="area-control" placeholder="区号" v-model="areaCode">
        <input type="text" class="mobile-control" placeholder="请输入手机号" v-model="model">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const model = defineModel<string>('');
const areaCode = ref('+86');

</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.mobile-input-group {
    display: flex;
    input {
        outline: 0;
    }
    .area-control {
        width: 4rem;
        text-align: center;
        border-right: 1px solid var(--#{$prefix}-border);
    }
    .mobile-control {
        flex: 1;
        padding-left: .8rem;
    }
}
</style>