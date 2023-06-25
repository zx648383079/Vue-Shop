<template>
    <div>
        <BackHeader :title="title"/>
        <iframe id="iframe" class="content-wrapper" :style="getFrameStyle" :src="getUrl"></iframe>

    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = ref('');
const height = ref(0);

const getUrl = computed(() => route.query.url as string);
const getFrameStyle = computed(() => {
    return {
        height: height.value + 'px',
    };
})

onMounted(() => {
    height.value = document.body.scrollHeight - 44;
    const iframe = document.getElementById('iframe') as HTMLIFrameElement;
    const t = route.query.title;
    if (t && t.length) {
        title.value = t.toString();
        return;
    }
    title.value = (iframe.contentWindow as Window).document.title;
});
</script>
<style lang="scss" scoped>
</style>
