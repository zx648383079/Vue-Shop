<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'mint-ui/lib/style.css';
@import '@fortawesome/fontawesome-free/css/all.css';
@import './assets/css/theme.scss';
</style>
