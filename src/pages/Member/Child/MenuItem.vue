<template>
    <a @click="tapGo">
        <i :class="['fa', icon]" aria-hidden="true"></i>
        {{ title }}
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
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
        uri: String
    },
    methods: {
        tapGo() {
            if (this.uri) {
                this.$router.push(this.uri);
            }
        },
    },
})
</script>