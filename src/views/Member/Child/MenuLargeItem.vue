<template>
    <a @click="tapGo" class="item">
        <i :class="['iconfont', props.icon]" aria-hidden="true"></i>
        <span>{{ props.title }}</span>
        <i class="tip" v-if="props.count && props.count > 0">{{ props.count }}</i>
    </a>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['click']);
const props = defineProps<{
    title: string;
    icon: string;
    uri: string;
    count: number;
}>();

function tapGo() {
    if (props.uri) {
        router.push(props.uri);
        return;
    }
    emit('click');
}
</script>