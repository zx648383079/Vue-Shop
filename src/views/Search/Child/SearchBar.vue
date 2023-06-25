<template>
    <div>
        <header class="top">
            <div class="search-box">
                <form onsubmit="return false;">
                    <i class="iconfont fa-search" aria-hidden="true"></i>
                    <input type="text" name="keywords" :value="props.modalValue" @input="tapUpdateVal(($event as any).target.value)" @keyup="onKeyUp" placeholder="搜索" autocomplete="off">
                    <i class="iconfont fa-times-circle" v-if="props.modalValue && props.modalValue.length > 0" @click="tapClearSearch()"></i>
                </form>
                <a class="cancel-btn" @click="tapBack()">取消</a>
            </div>
        </header>
        <div class="has-header">
            <div class="search-recommend-box" v-if="!tipList || tipList.length == 0">
                <div class="panel" v-if="historyList && historyList.length > 0">
                    <div class="panel-header">
                        <span>历史记录</span>
                        <i class="iconfont fa-trash" @click="tapClearHistory"></i>
                    </div>
                    <div class="panel-body">
                        <a v-for="(item, index) in historyList" :key="index" @click="tapSearch(item)">{{ item }}</a>
                    </div>
                </div>
                <div class="panel" v-if="hotKeywords && hotKeywords.length > 0">
                    <div class="panel-header">
                        <span>热门搜索</span>
                    </div>
                    <div class="panel-body">
                        <a v-for="(item, index) in hotKeywords" :key="index" @click="tapSearch(item)">{{ item }}</a>
                    </div>
                </div>
            </div>
            <ul class="search-tip-box" v-else>
                <li v-for="(item, index) in tipList" :key="index">
                    <a @click="tapSearch(item)">{{ item }}</a>
                </li>
            </ul>

        </div>
    </div>
</template>
<script setup lang="ts">
import { removeLocalStorage, getLocalStorage, setLocalStorage } from '@/utils';
import { getHotKeywords, getTips } from '@/api/product';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const KEYWORDS_HISTORY = 'KEYWORDS_HISTORY';

const emit = defineEmits(['search', 'update:modalValue']);
const router = useRouter();
const props = defineProps<{
    modalValue: string
}>();
const hotKeywords = ref<string[]>([]);
const tipList = ref<string[]>([]);
const historyList = ref<string[]>([]);
function tapBack() {
    if (window.history.length <= 1) {
        router.push('/')
        return;
    }
    router.go(-1)
}

function tapUpdateVal(val: string) {
    emit('update:modalValue', val);
}

function tapClearHistory() {
    historyList.value = []
    removeLocalStorage(KEYWORDS_HISTORY)
}

function tapClearSearch() {
    tapUpdateVal('');
    tipList.value = [];
}

function addHistory(keywords: string) {
    if (historyList.value.indexOf(keywords) >= 0) {
        return;
    }
    historyList.value.push(keywords);
    if (historyList.value.length > 8) {
        historyList.value.splice(8);
    }
    setLocalStorage(KEYWORDS_HISTORY, historyList)
}

function onKeyUp(event: any) {
    if (!props.modalValue || props.modalValue.trim().length === 0) {
        return;
    }
    if (event.code === 'Enter') {
        addHistory(props.modalValue);
        tapSearch(props.modalValue);
        return;
    }
    getTips(props.modalValue).then(res => {
        tipList.value = res.data ? res.data : [];
    });
}

function tapSearch(keywords: string) {
    emit('search', keywords);
}


historyList.value = getLocalStorage(KEYWORDS_HISTORY, true) || []
getHotKeywords().then(res => {
    hotKeywords.value = res.data ? res.data : [];
});

</script>
