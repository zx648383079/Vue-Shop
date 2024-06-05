<template>
    <div class="swiper-container">
        <Swiper 
            :modules="modules"
            :pagination="{ clickable: true }" 
            :auto="4000">
            <SwiperSlide v-for="(item, index) in props.items" :key="index">
                <a class="swiper-inner-text" v-if="item.type < 1" @click="tapAd(item)">
                    {{ item.content  }}
                </a>
                <a class="swiper-inner-image" v-else-if="item.type == 1" @click="tapAd(item)">
                    <img :src="item.content">
                </a>
                <a class="swiper-inner-html" v-else-if="item.type == 2" v-html="item.content" @click="tapAd(item)">
                    
                </a>
                <a class="swiper-inner-video" v-else-if="item.type == 3" @click="tapAd(item)">
                    <video :src="item.content"></video>
                </a>
            </SwiperSlide>
        </Swiper>
    </div>
</template>
<script setup lang="ts">
import { /*Navigation,*/ Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { IAd } from '../../../api/model';

import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { openLink } from '../../../utils/deeplink';
import { useRouter } from 'vue-router';

const router = useRouter();

const modules = [/*Navigation,*/ Pagination];

const props = defineProps<{
    items: IAd[],
}>();

function tapAd(item: IAd) {
    if (item.url) {
        openLink(router, item.url);
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/theme';
.swiper-inner-text,
.swiper-inner-image,
.swiper-inner-video,
.swiper-inner-html {
    display: block;
    height: var(--#{$prefix}-swiper-height);
    text-align: center;
}
.swiper-inner-text {
    color: var(--#{$prefix}-swiper-text);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
}
.swiper-inner-video {
    video {
        width: 100%;
        height: 100%;
    }
}
.swiper-inner-image {
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
