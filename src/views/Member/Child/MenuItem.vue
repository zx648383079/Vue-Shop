<template>
    <a @click="tapGo">
        <i :class="['iconfont', props.icon]" aria-hidden="true"></i>
        {{ props.title }}
        <i class="iconfont icon-chevron-right" aria-hidden="true"></i>
    </a>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
const emit = defineEmits(['tapped']);
const props = defineProps<{
    title: string;
    icon: string;
    uri?: string;
}>();


function tapGo() {
    if (props.uri) {
        router.push(props.uri);
        return;
    }
    emit('tapped');
}
</script>