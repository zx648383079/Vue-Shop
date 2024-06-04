<template>
    <div class="notice-bar">
        <div class="notice-icon">
            <i class="iconfont icon-message"></i>
        </div>
        <div class="notice-body">
            <a class="notice-item" href="">
                <span class="item-body">
                    最新上架，点击选购
                </span>
                <i class="item-icon iconfont icon-chevron-right"></i>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
@import '../../../assets/css/theme';
.notice-bar {
    --#{$prefix}-notice-radius: #{$formRadius};
    display: flex;
    border-radius: var(--#{$prefix}-notice-radius);
    line-height: 2.5rem;
    margin: .8rem;
    background-color: var(--#{$prefix}-panel);
    .notice-icon {
        width: 2.5rem;
        text-align: center;
        display: inline-block;
        border-radius: var(--#{$prefix}-notice-radius) 0 0 var(--#{$prefix}-notice-radius);
        background-color: var(--#{$prefix}-primary);
        color: var(--#{$prefix}-primary-text);
    }
    .notice-body {
        flex: 1;
    }
}
.notice-item {
    padding: 0 .8rem;
    display: flex;
    align-items: center;
    .item-body {
        flex: 1;
    }
    .item-icon {
            border-radius: 50%;
            display: inline-flex;
            width: 1.5rem;
            height: 1.5rem;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--#{$prefix}-primary);
            color: var(--#{$prefix}-primary);
    } 
}
</style>