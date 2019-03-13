<template>
    <a @click="tapGo" class="item">
        <i :class="['fa', icon]" aria-hidden="true"></i>
        <span>{{ title }}</span>
        <i class="tip" v-if="count && count > 0">{{ count }}</i>
    </a>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
        };
    },
    props: {
        title: String,
        icon: String,
        uri: String,
        count: Number,
    },
    methods: {
        tapGo() {
            if (this.uri) {
                this.$router.push(this.uri);
            }
        },
    }
})
</script>