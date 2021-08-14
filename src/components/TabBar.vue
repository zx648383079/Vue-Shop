<template>
    <footer class="tab-bar">
        <a v-for="(item, index) in menus" :key="index" :class="[item.url === $route.name ? 'active' : '']" @click="tapMenu(item)">
            <i :class="item.icon" aria-hidden="true"></i>
            {{ item.name }}
        </a>
    </footer>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';

interface IMenu {
    name: string,
    icon: string,
    url: string
}

export default class TabBar extends Vue {
    public menus: IMenu[]  = [
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

    public tapMenu(item: IMenu) {
        this.$router.push({ name: item.url});
    }
}
</script>