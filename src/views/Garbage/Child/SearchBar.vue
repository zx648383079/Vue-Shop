<template>
    <div class="box">
        <div class="search-box">
            <i class="iconfont icon-camera"></i>
            <input type="text" @keyup="tapKey" :value="model" @input="tapUpdateVal(($event as any).target.value)">
            <i class="iconfont icon-search"></i>
        </div>
        <ul class="tip-box" v-if="tipList && tipList.length > 0">
            <li v-for="(item, index) in tipList" :key="index" @click="tapTip(item)">
                <i class="iconfont icon-search"></i>
                {{ item }}
                <i class="iconfont icon-arrow-right"></i>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { getTips } from '@/api/garbage';
import { ref } from 'vue';

const emit = defineEmits(['search']);
const model = defineModel({type: String, default: ''});
const tipList = ref<string[]>([]);

function tapUpdateVal(val: string) {
    model.value = val;
}

function tapKey(e: KeyboardEvent) {
    if (!model.value || model.value.trim().length === 0) {
        return;
    }
    if (e.code === 'Enter') {
        emit('search', model.value);
        return;
    }
    getTips(model.value).then(res => {
        tipList.value = res.data || [];
    });
}

function tapTip(val: string) {
    emit('search', val);
}
</script>
<style lang="scss" scoped>
.box {
    margin: -20px 10px 0;
}
.search-box {
    background-color: #fff;
    font-size: 16px;
    height: 40px;
    position: relative;
    input {
        outline: none;
        height: 40px;
        border: 0;
        width: 100%;
        padding: 0 30px;
    }
    .fa {
        position: absolute;
        top: 8px;
        font-size: 24px;
        &.icon-search {
            right: 0;
        }
    }
}
.tip-box {
    margin-top: 3px;
    background-color: #fff;
    li {
        position: relative;
        border-bottom: 1px solid gray;
        padding: 0 30px 0 0;
        line-height: 30px;
        margin-left: 30px;
        list-style: none;
        .fa {
            position: absolute;
            top: 7px;
        }
        .icon-search {
            left: -24px;
        }
        .icon-arrow-right {
            right: 0;
        }
    }
}
</style>
