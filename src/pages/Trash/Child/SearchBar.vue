<template>
    <div class="box">
        <div class="search-box">
            <i class="fa fa-camera"></i>
            <input type="text" @keyup="tapKey" :value="value" @input="tapUpdateVal($event.target.value)">
            <i class="fa fa-search"></i>
        </div>
        <ul class="tip-box" v-if="tipList && tipList.length > 0">
            <li v-for="(item, index) in tipList" :key="index" @click="tapTip(item)">
                <i class="fa fa-search"></i>
                {{ item }}
                <i class="fa fa-arrow-right"></i>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class SearchBar extends Vue {
    @Prop(String) public readonly value!: string;
    public tipList: string[] = [];

    public tapUpdateVal(val: string) {
        this.$emit('input', val);
    }

    public tapKey(e: KeyboardEvent) {
        if (!this.value || this.value.trim().length === 0) {
            return;
        }
        if (e.code === 'Enter') {
            this.$emit('search', this.value);
            return;
        }
        this.tipList = ['123123123', '213123'];
    }

    public tapTip(val: string) {
        this.$emit('search', val);
    }
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
        &.fa-search {
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
        .fa-search {
            left: -24px;
        }
        .fa-arrow-right {
            right: 0;
        }
    }
}
</style>
