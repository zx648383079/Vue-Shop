<template>
    <div>
        <BackHeader :title="$route.meta.title as string"/>
        <div class="has-header">
            <div class="top-header">
                <div v-if="!checked" class="check-btn" @click="tapCheck">
                    签到
                </div>
                <div v-else class="checked-btn">
                    <i class="iconfont icon-calendar-check" aria-hidden="true"></i>
                    已签到
                </div>
                <div v-if="checked" class="checked-tip">已连续签到{{ checked.running }}天，继续加油</div>
            </div>
            <div class="date-grid">
                <div class="title">{{ title }}</div>
                <div class="day-grid">
                    <ol><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ol>
                    <ul>
                        <li v-for="(item, index) in dayList" :key="index" :class="{disable: item.disable, active: item.active}">{{ item.val }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BackHeader from '@/components/BackHeader.vue';
import { twoPad } from '@/utils';
import { checkIn, checkInBatch } from '@/api/check';
import type { ICheckIn } from '@/api/model';
import { ref } from 'vue';

interface IDay {
    val: string,
    day?: number,
    disable?: boolean,
    active?: boolean,
}

const checked = ref<ICheckIn | null>(null);
const dayList = ref<IDay[]>([]);
const title = ref('');

function refreshGrid(current: Date) {
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    title.value = year + '-' + twoPad(month);
    const date = new Date(year, month, 0);
    const count = date.getDate();
    date.setDate(1);
    const start = date.getDay();
    dayList.value = [];
    for (let i = 0; i < count + start; i++) {
        dayList.value.push(i < start ? {
            val: '',
        } : {
            val: twoPad(i - start + 1),
            day: i - start + 1,
        });
    }
}

function tapCheck() {
    checkIn().then(res => {
        if (res.data) {
            checked.value = res.data;
            checkDay(new Date().getDate());
        }
    });
}

function checkDay(...days: number[]) {
    let len = days.length;
    if (len < 1) {
        return;
    }
    for (const day of dayList.value) {
        if (day.day && days.indexOf(day.day as number) >= 0) {
            day.active = true;
            len --;
        }
        if (len < 1) {
            break;
        }
    }
}

refreshGrid(new Date());
checkInBatch({
    today: {},
    month: {}
}).then(res => {
    checked.value = res.today;
    const days = [];
    for (const item of res.month) {
        days.push(new Date(item.created_at).getDate());
    }
    checkDay(...days);
});
</script>
<style lang="scss" scoped>
@import '../../assets/css/theme';
@import '../../assets/css/mixin';
.top-header {
    background-color: var(--#{$prefix}-primary);
    color: var(--#{$prefix}-primary-text);
    height: 12.5rem;
    padding-top: 2.5rem;
    .checked-btn,
    .check-btn {
        font-size: 1.875rem;
        width: 8.125rem;
        margin: 0 auto;
        text-align: center;
        border: 1px solid;
        line-height: 2.5rem;
        border-radius: 1.25rem;
    }
    .checked-btn {
        background-color: rgba(255, 255, 255, .1);
        font-size: 1.375rem;
    }
    .checked-tip {
        text-align: center;
        margin-top: 0.625rem;
        font-size: 0.8125rem;
        font-weight: 300;
    }
}
.date-grid {
    width: 17.5rem;
    margin: -3.75rem auto 0;
    background-color: var(--#{$prefix}-panel);
    .title {
        line-height: 2.5rem;
        text-align: center;
    }
    .day-grid {
        ol {
            background: var(--#{$prefix}-body);
        }
        li {
            display: inline-block;
            width: 2.5rem;
            line-height: 2.5rem;
            text-align: center;
            box-sizing: border-box;
            list-style: none;
            color: var(--#{$prefix}-body-text);
        }
        ul {
            li {
                cursor: pointer;
                &.active {
                    background: var(--#{$prefix}-primary);
                    color: var(--#{$prefix}-primary-text);
                    border-radius: 50%;
                    &:before {
                        @include iconFont(1.875rem);
                        content: "\ef65";
                        color: var(--#{$prefix}-primary-text);
                        position: absolute;
                        opacity: .3;
                    }
                }
                &.disable {
                    color: var(--#{$prefix}-secondary-text);
                }
            }
        }
    }
}
</style>