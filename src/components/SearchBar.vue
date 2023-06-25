<template>
    <div>
        <SearchHeader :value="value" @input="updateVal" @enter="tapSearch" @keyup="onKeyUp" @focus="tapFocus"></SearchHeader>
        <div class="has-header" v-if="!isMini">
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
<script lang="ts">
import { removeLocalStorage, getLocalStorage, setLocalStorage } from '@/utils';
const KEYWORDS_HISTORY = 'KEYWORDS_HISTORY';
import SearchHeader from './SearchHeader.vue';
import { getHotKeywords, getTips } from '@/api/product';
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        SearchHeader
    },
    props: {
        value: String,
    },
    data() {
        const hotKeywords: string[] = [];
        const tipList: string[] = [];
        const historyList: string[] = [];
        return {
            hotKeywords,
            tipList,
            historyList,
            isMini: false
        };
    },
    created() {
        this.isMini = Object.keys(this.$route.query).length > 0;
        this.historyList = getLocalStorage<string[]>(KEYWORDS_HISTORY, true) as any || [];
        getHotKeywords().then(res => {
            this.hotKeywords = res.data as any;
        });
    },
    methods: {
        updateVal(val: string) {
            this.$emit('input', val);
            if (!val || val.length < 1) {
                this.tipList = [];
                this.isMini = false;
            }
        },
        tapClearHistory() {
            this.historyList = []
            removeLocalStorage(KEYWORDS_HISTORY)
        },
        addHistory(keywords: string) {
            if (this.historyList.indexOf(keywords) >= 0) {
                return;
            }
            this.historyList.push(keywords);
            if (this.historyList.length > 8) {
                this.historyList.splice(8);
            }
            setLocalStorage(KEYWORDS_HISTORY, this.historyList)
        },
        onKeyUp() {
            if (!this.value || this.value.length < 1) {
                this.tipList = [];
                return;
            }
            getTips(this.value).then(res => {
                this.tipList = res.data as any;
            });
        },
        tapSearch(keywords: string) {
            if (!keywords || keywords.trim().length === 0) {
                return;
            }
            this.addHistory(keywords);
            this.$emit('search', keywords);
            this.isMini = true;
        },
        tapFocus() {
            this.$emit('focus');
            this.isMini = false;
        }
    }
});
</script>
