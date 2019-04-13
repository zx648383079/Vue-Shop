<template>
    <footer class="tab-bar">
        <a v-for="(item, index) in menus" :key="index" :class="[item.url === $route.name ? 'active' : '']" @click="tapMenu(item)">
            <i :class="item.icon" aria-hidden="true"></i>
            {{ item.name }}
        </a>
    </footer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

interface IMenu {
    name: string,
    icon: string,
    url: string
}

@Component
export default class TabBar extends Vue {
    public menus: IMenu[]  = [
        {
            name: '首页',
            icon: 'fa fa-home',
            url: 'home',
        },
        {
            name: '分类',
            icon: 'fa fa-th-large',
            url: 'category',
        },
        {
            name: '购物车',
            icon: 'fa fa-shopping-cart',
            url: 'cart',
        },
        {
            name: '我的',
            icon: 'fa fa-user',
            url: 'member',
        },
    ];

    public tapMenu(item: IMenu) {
        this.$router.push({ name: item.url});
    }
}
</script>