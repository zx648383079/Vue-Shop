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
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

interface IMenu {
    name: string,
    icon: string,
    url: string
}

const menus: IMenu[]  = [
    {
        name: t('nav_home'),
        icon: 'iconfont icon-home',
        url: 'home',
    },
    {
        name: t('nav_category'),
        icon: 'iconfont icon-table',
        url: 'category',
    },
    {
        name: t('nav_cart'),
        icon: 'iconfont icon-cart',
        url: 'cart',
    },
    {
        name: t('nav_my'),
        icon: 'iconfont icon-user',
        url: 'member',
    },
];
function tapMenu(item: IMenu) {
    router.push({ name: item.url});
}
</script>