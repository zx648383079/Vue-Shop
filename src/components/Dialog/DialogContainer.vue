<template>
    <div ref="el">
        <div class="dialog-mask" v-if="maskVisible" @click="close()"></div>
        <DialogToast v-for="item in toastItems" :key="item.id"></DialogToast>
        <DialogConfirmBox v-bind="confirmData"></DialogConfirmBox>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DialogConfirmBox from './DialogConfirmBox.vue';
import DialogToast from './DialogToast.vue';
import type { DialogConfirmOption, DialogTipOption } from './plugin';

const props = withDefaults(
    defineProps<{
        container?: Element
    }>(),
    {
        container: document.body as  any
    }
);

const toastItems = ref<DialogTipOption[]>([]);
const confirmData = ref<DialogConfirmOption|null>({});

const maskVisible = ref(false);
const el = ref<HTMLDivElement>();


function close() {
    maskVisible.value = false;
    toastItems.value = [];
    confirmData.value = {};
}

function addToast(option: DialogTipOption) {
    option.visible = true;
    const themeItems: any = {
        success: {
            icon: 'icon-check-circle'
        },
        info: {
            icon: 'icon-exclamation-circle',
        },
        waining: {
            icon: 'icon-exclamation-triangle',
        },
        error: {
            icon: 'icon-close-circle'
        }
    };
    const item = themeItems[option.type];
    option.icon = item?.icon || ('icon-' + option.type);
    option.theme = item?.theme || ('message-' + option.type);
    toastItems.value.push(option);
}

function addConfirm(option: DialogConfirmOption) {
    option.visible = true;
    confirmData.value = option;
}

function removeElement(node: Element) {
    if (typeof node.remove === 'undefined') {
        node.remove();
    } else if(node.parentNode) {
        node.parentNode.removeChild(node);
    } 
}

onMounted(() => {
    if (!el.value) {
        return;
    }
    const container = props.container;
    removeElement(el.value);
    container?.appendChild(el.value);
});

defineExpose({
    addToast,
    addConfirm,
});
</script>
<style lang="scss">
.dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, .7);
}
</style>