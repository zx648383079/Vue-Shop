<template>
    <DialogPanel title="活动" ref="dialog">
        <div class="promote-line">
            <div class="line-header">活动</div>
            <div class="line-body">
                <div class="tag-icon-item btn-danger">
                    周年庆
                </div>
                <div class="tag-outline-item btn-danger">
                    立减金
                </div>
            </div>
            <div class="line-arrow">...</div>
        </div>
        <template #panel>
            <div class="large-menu-line-item">
                <div class="item-body">
                    <div class="item-name">周年庆</div>
                    <div class="item-meta">
                        活动期间
                    </div>
                </div>
                <div class="item-arrow">
                    <i class="iconfont icon-chevron-right"></i>
                </div>
            </div>
            <div class="large-menu-line-item">
                <div class="item-body">
                    <div class="item-name">周年庆</div>
                    <div class="item-meta">
                        活动期间
                    </div>
                </div>
                <div class="item-arrow">
                    <i class="iconfont icon-chevron-right"></i>
                </div>
            </div>
        </template>
    </DialogPanel>
</template>
<script lang="ts" setup>
import DialogPanel from '../../../components/DialogPanel.vue';

</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';

</style>