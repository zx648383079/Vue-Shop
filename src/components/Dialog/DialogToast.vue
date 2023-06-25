<template>
    <div class="dialog-message-box" v-if="props.visible" v-bind:style="boxStyle">
        <div class="dialog-body" v-bind:class="[props.theme, props.offset > 0 ? 'is-offset' : '']">
            <div class="message-icon" v-if="props.icon">
                <i class="iconfont" v-bind:class="props.icon"></i>
            </div>
            <div class="message-body">
                <div class="message-title" v-if="props.title">{{ props.title }}</div>
                <div class="message-content" v-if="props.content">{{ props.content }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';


const props = withDefaults(defineProps<{
    visible?: boolean;
    offset?: number;
    icon?: string;
    theme?: string;
    title?: string;
    content?: string;
}>(), {
    offset: 0
});

const boxStyle = computed(() => {
    return {
        top: props.offset + 'px'
    };
});


</script>

<style lang="scss">
.dialog-message-box {
    position: fixed;
    top: 0;
    width: 100%;
    text-align: center;
    transition: all 500ms ease-in;
    z-index: 999;
    .dialog-body {
        display: inline-flex;
        padding: 0.2em .8em;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        min-width: 18.75rem;
        border-radius: 0 0 .3em .3em;
        &.is-offset {
            border-radius: .3em;
        }
    }
    .message-icon {
        font-size: 2em;
        padding-right: .4em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .message-body {
        flex: 1;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .message-success {
        color: white;
        background-color: #198754;
    }
    .message-waining {
        color: white;
        background-color: #f89406;
    }
    .message-error {
        color: white;
        background-color: #dc3545;
    }
    .message-info {
        color: white;
        background-color: #2f96b4;
    }
}

</style>