<template>
    <div id="app" v-zo-title="$route.meta.title">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    methods: {
        afterLeave() {
            this.$root.$emit('triggerScroll')
        },
    },
});
</script>

<style lang="scss">
@import './assets/css/theme.scss';
</style>
