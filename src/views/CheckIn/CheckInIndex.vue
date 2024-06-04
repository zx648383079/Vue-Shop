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
import { getCanCheckIn, checkIn, getMonth } from '@/api/check';
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
getCanCheckIn().then(res => {
    if (res.data) {
        checked.value = res.data;
    }
});
getMonth().then(res => {
    if (!res.data) {
        return;
    }
    const days = [];
    for (const item of res.data) {
        days.push(new Date(item.created_at).getDate());
    }
    checkDay(...days);
});
</script>
<style lang="scss" scoped>
.top-header {
    background: #05a6b1;
    color: #fff;
    height: 200px;
    padding-top: 40px;
    .checked-btn,
    .check-btn {
        font-size: 30px;
        width: 130px;
        margin: 0 auto;
        text-align: center;
        border: 1px solid;
        line-height: 40px;
        border-radius: 20px;
    }
    .checked-btn {
        background-color: rgba(255, 255, 255, .1);
        font-size: 22px;
    }
    .checked-tip {
        text-align: center;
        margin-top: 10px;
        font-size: 13px;
        font-weight: 300;
    }
}
.date-grid {
    width: 280px;
    margin: -60px auto 0;
    background-color: #fff;
    .title {
        line-height: 40px;
        text-align: center;
    }
    .day-grid {
        ol {
            background: #eee;
        }
        li {
            display: inline-block;
            width: 40px;
            line-height: 40px;
            text-align: center;
            box-sizing: border-box;
            list-style: none;
            color: #333;
        }
        ul {
            li {
                cursor: pointer;
                &.active {
                    background: #006cff;
                    color: #fff;
                    border-radius: 50%;
                    &:before {
                        font-family: "Font Awesome 5 Free";
                        font-weight: 900;
                        content: "\f00c";
                        color: rgba(255, 255, 255, .3);
                        font-size: 30px;
                        position: absolute;
                    }
                }
                &.disable {
                    color: #ccc;
                }
            }
        }
    }
}
</style>