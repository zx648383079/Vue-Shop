<template>
    <div>
        <SearchHeader :value="value" @input="updateVal" @enter="tapSearch" @keyup="onKeyUp" @focus="tapFocus"></SearchHeader>
        <div class="has-header" v-if="!isMini">
            <div class="search-recommend-box" v-if="!tip_list || tip_list.length == 0">
                <div class="panel" v-if="history_list && history_list.length > 0">
                    <div class="panel-header">
                        <span>历史记录</span>
                        <i class="fa fa-trash" @click="tapClearHistory"></i>
                    </div>
                    <div class="panel-body">
                        <a v-for="(item, index) in history_list" :key="index" @click="tapSearch(item)">{{ item }}</a>
                    </div>
                </div>
                <div class="panel" v-if="hot_keywords && hot_keywords.length > 0">
                    <div class="panel-header">
                        <span>热门搜索</span>
                    </div>
                    <div class="panel-body">
                        <a v-for="(item, index) in hot_keywords" :key="index" @click="tapSearch(item)">{{ item }}</a>
                    </div>
                </div>
            </div>
            <ul class="search-tip-box" v-else>
                <li v-for="(item, index) in tip_list" :key="index">
                    <a @click="tapSearch(item)">{{ item }}</a>
                </li>
            </ul>

        </div>
    </div>
</template>
<script lang="ts">
import { removeLocalStorage, getLocalStorage, setLocalStorage } from '@/utils';
const KEYWORDS_HISTORY = 'KEYWORDS_HISTORY';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import SearchHeader from './SearchHeader.vue';
import { getHotKeywords, getTips } from '@/api/product';

@Component({
    components: {
        SearchHeader
    }
})
export default class SearchBar extends Vue {
    @Prop(String) readonly value?: string;

    hot_keywords?: string[] = [];
    tip_list?: string[] = [];
    history_list: string[] = [];
    isMini: boolean = false;

    created() {
        this.isMini = Object.keys(this.$route.query).length > 0;
        this.history_list = getLocalStorage<string[]>(KEYWORDS_HISTORY, true) || []
        getHotKeywords().then(res => {
            this.hot_keywords = res.data
        })
    }


    updateVal(val: string) {
        this.$emit('input', val);
        if (!val || val.length < 1) {
            this.tip_list = [];
            this.isMini = false;
        }
    }

    tapClearHistory() {
        this.history_list = []
        removeLocalStorage(KEYWORDS_HISTORY)
    }

    addHistory(keywords: string) {
        if (this.history_list.indexOf(keywords) >= 0) {
            return;
        }
        this.history_list.push(keywords);
        if (this.history_list.length > 8) {
            this.history_list.splice(8);
        }
        setLocalStorage(KEYWORDS_HISTORY, this.history_list)
    }

    onKeyUp(event: any) {
        if (!this.value || this.value.length < 1) {
            this.tip_list = [];
            return;
        }
        getTips(this.value).then(res => {
            this.tip_list = res.data
        });
    }

    tapSearch(keywords: string) {
        if (!keywords || keywords.trim().length === 0) {
            return;
        }
        this.addHistory(keywords);
        this.$emit('search', keywords);
        this.isMini = true;
    }

    @Emit('focus')
    tapFocus() {
        this.isMini = false;
    }
}
</script>