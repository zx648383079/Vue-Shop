<template>
    <header>
        <div class="search-box">
            <div class="search-input">
                <i class="iconfont icon-search" aria-hidden="true" @click="tapSearch"></i>
                <input type="text" :value="model" @input="updateVal(($event as any).target?.value)" @keyup="onKeyUp" placeholder="搜索" @click="tapFocus" autocomplete="off">
                <i class="iconfont icon-times-circle" v-if="model && model.length > 0" @click="tapClear"></i>
            </div>
            <a class="cancel-btn" @click="tapBack">取消</a>
        </div>
    </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['focus', 'enter', 'keyup']);
const model = defineModel({type: String, default: ''});

function tapBack() {
    if (model.value && model.value.length > 0) {
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
    model.value = val;
}
function tapClear() {
    updateVal('');
}
function onKeyUp(event: KeyboardEvent) {
    if (!model.value || model.value.trim().length === 0) {
        return;
    }
    if (event.key === 'Enter') {
        emit('enter', model.value);
        return;
    }
    emit('keyup', event);
}
function tapSearch() {
    emit('enter', model.value);
}
function tapFocus() {
    emit('focus');
}
</script>
