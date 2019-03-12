<template>
    <footer class="tab-bar">
        <a v-for="(item, index) in menus" :key="index" :class="[item.url === $route.name ? 'active' : '']" @click="tapMenu(item)">
            <i :class="item.icon" aria-hidden="true"></i>
            {{ item.name }}
        </a>
    </footer>
</template>
<script lang="ts">
import Vue from 'vue';

interface IMenu {
    name: string,
    icon: string,
    url: string
}

export default Vue.extend({
    name: 'TabBar',
    data() {
        return {
            menus: [
                 {
                    name: '首页',
                    icon: 'fa fa-home',
                    url: 'home'
                },
                {
                    name: '分类',
                    icon: 'fa fa-th-large',
                    url: 'category'
                },
                {
                    name: '购物车',
                    icon: 'fa fa-shopping-cart',
                    url: 'cart'
                },
                {
                    name: '我的',
                    icon: 'fa fa-user',
                    url: 'member'
                },
            ],
        };
    },
    methods: {
        tapMenu(item: IMenu) {
            this.$router.push({ name: item.url});
        },
    },
})
</script>