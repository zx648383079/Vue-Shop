<template>
    <footer class="tab-bar">
        <a v-for="(item, index) in menus" :key="index" :class="[item.url === $route.name ? 'active' : '']" @click="tapMenu(item)">
            <i :class="item.icon" aria-hidden="true"></i>
            {{ item.name }}
        </a>
    </footer>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

interface IMenu {
    name: string,
    icon: string,
    url: string
}

const menus: IMenu[]  = [
    {
        name: '首页',
        icon: 'iconfont fa-home',
        url: 'home',
    },
    {
        name: '分类',
        icon: 'iconfont fa-table',
        url: 'category',
    },
    {
        name: '购物车',
        icon: 'iconfont fa-cart',
        url: 'cart',
    },
    {
        name: '我的',
        icon: 'iconfont fa-user',
        url: 'member',
    },
];
function tapMenu(item: IMenu) {
    router.push({ name: item.url});
}
</script>