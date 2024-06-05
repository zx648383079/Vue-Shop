<template>
    <div>
        <BackHeader :title="title"/>
        <div class="has-header">
            <iframe ref="frame" class="content-wrapper" :style="getFrameStyle" :src="getUrl"></iframe>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = ref('');
const height = ref(0);
const frame = ref<HTMLIFrameElement>();

const getUrl = computed(() => route.query.url as string);
const getFrameStyle = computed(() => {
    return {
        height: height.value + 'px',
    };
})

onMounted(() => {
    height.value = window.innerHeight - 50;
    const t = route.query.title;
    if (t) {
        title.value = t.toString();
        return;
    }
    if (frame.value) {
        frame.value.onload = () => {
            // height.value = document.body.scrollHeight - 44;
            if (t) {
                return;
            }
            // title.value = (frame.value!.contentWindow as Window).document.title;
        };
    }
    
    
    
});
</script>
<style lang="scss" scoped>
.content-wrapper {
    width: 100%;
    border: none;
}
</style>
