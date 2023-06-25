<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">

        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
</script>
<style lang="scss" scoped>

</style>
