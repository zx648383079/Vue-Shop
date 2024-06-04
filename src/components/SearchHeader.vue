<template>
    <header>
        <div class="search-box">
            <div class="search-input">
                <i class="iconfont icon-search" aria-hidden="true" @click="tapSearch"></i>
                <input type="text" :value="props.modalValue" @input="updateVal(($event as any).target?.value)" @keyup="onKeyUp" placeholder="搜索" @click="tapFocus" autocomplete="off">
                <i class="iconfont icon-times-circle" v-if="current && current.length > 0" @click="tapClear"></i>
            </div>
            <a class="cancel-btn" @click="tapBack">取消</a>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['update:modalValue', 'focus', 'enter', 'keyup']);
const props = defineProps<{
    modalValue?: string;
}>();

const current = ref('');
function tapBack() {
    if (props.modalValue && props.modalValue.length > 0) {
        tapClear();
        return;
    }
    if (window.history.length <= 1) {
        router.push('/');
        return;
    }
    router.go(-1);
}
function updateVal(val: string|any) {
    emit('update:modalValue', val);
    current.value = val;
}
function tapClear() {
    updateVal('');
}
function onKeyUp(event: KeyboardEvent) {
    if (!props.modalValue || props.modalValue.trim().length === 0) {
        return;
    }
    if (event.key === 'Enter') {
        emit('enter', props.modalValue);
        return;
    }
    emit('keyup', event);
}
function tapSearch() {
    emit('enter', props.modalValue);
}
function tapFocus() {
    emit('focus');
}
</script>
