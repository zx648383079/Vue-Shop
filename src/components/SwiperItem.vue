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
        this.$parent && (this.$parent as Swiper).swiperItemCreated();
    }

    public destroyed() {
      this.$parent && (this.$parent as Swiper).swiperItemDestroyed();
    }
}
</script>
