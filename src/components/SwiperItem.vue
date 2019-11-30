<template>
    <div class="swiper-item">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Swiper from './Swiper.vue';

@Component
export default class SwiperItem extends Vue {
    public mounted() {
        if (!this.$parent) {
            return;
        }
        (this.$parent as Swiper).swiperItemCreated(this);
    }

    public destroyed() {
        if (!this.$parent) {
            return;
        }
        (this.$parent as Swiper).swiperItemDestroyed(this);
    }
}
</script>
