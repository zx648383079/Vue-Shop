<template>
    <header>
        <div class="search-box">
            <div class="search-input">
                <i class="fa fa-search" aria-hidden="true" @click="tapSearch"></i>
                <input type="text" :value="value"
                @input="updateVal($event.target.value)" @keyup="onKeyUp" placeholder="搜索" @click="tapFocus" autocomplete="off">
                <i class="fa fa-times-circle" v-if="currrent && currrent.length > 0" @click="tapClear"></i>
            </div>
            <a class="cancel-btn" @click="tapBack">取消</a>
        </div>
    </header>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class SearchHeader extends Vue {
    @Prop(String) public readonly value!: string;
    public currrent = '';

    public tapBack() {
        if (this.value && this.value.length > 0) {
            this.tapClear();
            return;
        }
        if (window.history.length <= 1) {
            this.$router.push('/');
            return;
        }
        this.$router.go(-1);
    }

    public updateVal(val: string) {
        this.$emit('input', val);
        this.currrent = val;
    }

    public tapClear() {
        this.updateVal('');
    }

    public onKeyUp(event: any) {
        if (!this.value || this.value.trim().length === 0) {
            return;
        }
        if (event.which === 13) {
            this.$emit('enter', this.value);
            return;
        }
        this.$emit('keyup', event);
    }

    public tapSearch() {
        this.$emit('enter', this.value);
    }

    public tapFocus() {
        this.$emit('focus');
    }
}
</script>
