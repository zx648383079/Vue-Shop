<template>
    <div>
        <header class="top">
            <div class="search-box">
                <form onsubmit="return false;">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type="text" name="keywords" :value="value" @input="tapUpdateVal($event.target.value)" @keyup="onKeyUp" placeholder="搜索" autocomplete="off">
                    <i class="fa fa-times-circle" v-if="value && value.length > 0" @click="tapClearSearch()"></i>
                </form>
                <a class="cancel-btn" @click="tapBack()">取消</a>
            </div>
        </header>
        <div class="has-header">
            <div class="search-recommend-box" v-if="!tipList || tipList.length == 0">
                <div class="panel" v-if="historyList && historyList.length > 0">
                    <div class="panel-header">
                        <span>历史记录</span>
                        <i class="fa fa-trash" @click="tapClearHistory"></i>
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
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { removeLocalStorage, getLocalStorage, setLocalStorage } from '@/utils';
import { getHotKeywords, getTips } from '@/api/product';
const KEYWORDS_HISTORY = 'KEYWORDS_HISTORY';

export default class SearchBar extends Vue {
    @Prop(String) public readonly value!: string;

    public hotKeywords: string[] = [];
    public tipList: string[] = [];
    public historyList: string[] = [];

    public created() {
        this.historyList = getLocalStorage(KEYWORDS_HISTORY, true) || []
        getHotKeywords().then(res => {
            this.hotKeywords = res.data ? res.data : [];
        });
    }

    public tapBack() {
        if (window.history.length <= 1) {
            this.$router.push('/')
            return;
        }
        this.$router.go(-1)
    }

    public tapUpdateVal(val: string) {
        this.$emit('input', val);
    }

    public tapClearHistory() {
        this.historyList = []
        removeLocalStorage(KEYWORDS_HISTORY)
    }

    public tapClearSearch() {
        this.tapUpdateVal('');
        this.tipList = [];
    }

    public addHistory(keywords: string) {
        if (this.historyList.indexOf(keywords) >= 0) {
            return;
        }
        this.historyList.push(keywords);
        if (this.historyList.length > 8) {
            this.historyList.splice(8);
        }
        setLocalStorage(KEYWORDS_HISTORY, this.historyList)
    }

    public onKeyUp(event: any) {
        if (!this.value || this.value.trim().length === 0) {
            return;
        }
        if (event.code === 'Enter') {
            this.addHistory(this.value);
            this.tapSearch(this.value);
            return;
        }
        getTips(this.value).then(res => {
            this.tipList = res.data ? res.data : [];
        });
    }

    public tapSearch(keywords: string) {
        this.$emit('search', keywords);
    }
}
</script>
