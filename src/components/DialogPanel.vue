<template>
    <div class="dialog-panel-box">
        <div @click="showCalendar" class="dialog-panel__input-container">
            <slot></slot>
        </div>
        <div class="dialog dialog-content" v-if="calendarVisible">
            <div class="dialog-header">
                <slot name="header">
                    <div class="dialog-title">{{ props.title }}</div>
                    <i class="iconfont fa-close dialog-close" @click="hideCalerdar"></i>
                </slot>
            </div>
            <div class="dialog-body">
                <slot name="panel"></slot>
            </div>
            <div class="dialog-footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="dialog-bg" v-if="calendarVisible" @click="hideCalerdar"/>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['toggle']);
const props = defineProps<{
    title: string;
    hide?: boolean;
}>();
const calendarVisible = ref(false);

function showCalendar() {
    calendarVisible.value = true;
}
function hideCalerdar() {
    calendarVisible.value = false;
}

watch(calendarVisible, val => {
    emit('toggle', val);
});
watch(() => props.hide, val => {
    if (calendarVisible.value === !val) {
        return;
    }
    calendarVisible.value = !val;
});

defineExpose({
    showCalendar,
    hideCalerdar
});

</script>
<style lang="scss" scoped>
.dialog.dialog-content {
    bottom: 0px;
    top: 38%;
    animation: fadeInUp 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>