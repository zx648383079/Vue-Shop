<template>
    <div class="datepicker">
        <div @click="showCalendar()" class="datepicker__input-container">
            <slot></slot>
        </div>
        <div class="datepicker__calendar datepicker__calendar_animate_slide-in" v-if="input.calendarVisible">
            <div class="header">
                <i class="iconfont fa-backward previousYear" @click="previousYear()"></i>
                <i class="iconfont fa-chevron-left previousMonth" @click="previousMonth()"></i>
                <span @click="toggleYear()">{{ input.title }}</span>
                <i class="iconfont fa-chevron-right nextMonth" @click="nextMonth()"></i>
                <i class="iconfont fa-forward nextYear" @click="nextYear()"></i>
            </div>
            <div class="body">
                <div class="month-grid" v-if="input.gridMode == 0">
                    <ol><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ol>
                    <ul><li v-for="(item, index) in dayList" :key="index" :class="{disable: item.disable, active: item.val == input.currentDay && !item.disable}" @click="changeDay(item)">{{ twoPad(item.val) }}</li></ul>
                </div>
                <div class="year-grid" v-if="input.gridMode == 1">
                    <div class="list-group year">
                        <div class="title">年</div>
                        <ul>
                            <li v-for="(item, index) in yearList" :key="index" :class="{active: item == input.currentYear}" @click="changeYear(item)">{{ item }}</li>
                        </ul>
                    </div>
                    <div class="list-group month">
                    <div class="title">月</div>
                    <ul>
                        <li v-for="(item, index) in monthList" :key="index" :class="{active: item == input.currentMonth}" @click="changeMonth(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <i class="iconfont fa-close" @click="toggleYear()"></i>
                </div>
                <div class="day-grid" v-if="input.hasTime && input.gridMode == 2">
                    <div class="list-group hour">
                    <div class="title">小时</div>
                    <ul>
                        <li v-for="(item, index) in hourList" :key="index" :class="{active: item == input.currentHour}" @click="changeHour(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <div class="list-group minute">
                    <div class="title">分钟</div>
                    <ul>
                        <li v-for="(item, index) in minuteList" :key="index" :class="{active: item == input.currentMinute}" @click="changeMinute(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <div class="list-group second">
                    <div class="title">秒钟</div>
                    <ul>
                        <li v-for="(item, index) in secondList" :key="index" :class="{active: item == input.currentSecond}" @click="changeSecond(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <i class="iconfont fa-close"></i>
                </div>
            </div>
            <div class="footer" v-if="input.hasTime">
                <div class="time-box" @click="toggleTime()">
                    <span>{{ twoPad(input.currentHour) }}</span>:
                    <span>{{ twoPad(input.currentMinute) }}</span>:
                    <span>{{ twoPad(input.currentSecond) }}</span>
                </div>
                <button type="button" @click="enterChange()">确定</button>
            </div>

        </div>
        <div class="dialog-bg" v-if="input.calendarVisible" @click="hideCalerdar"/>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { twoPadFilter } from '../pipes';

interface IDay {
    disable?: boolean,
    selected?: boolean,
    val: number
}

enum DayMode {
    Day = 0,
    Year = 1,
    Hour = 2,
}

const emit = defineEmits(['update:modalValue', 'output']);
const props = withDefaults(defineProps<{
    min?: string|Date,
    max?: string|Date,
    modalValue?: string|Date,
    titleFormat?: string,
    format?: string,
}>(), {
    titleFormat: 'y年mm月',
    format: 'y-mm-dd hh:ii:ss',
});


const dayList = ref<IDay[]>([]);
const yearList = ref<number[]>([]);
const monthList = ref<number[]>([]);
const hourList = ref<number[]>([]);
const minuteList = ref<number[]>([]);
const secondList = ref<number[]>([]);

const input = reactive({
    currentDate: new Date(),
    currentMin: new Date('1900/01/01 00:00:00'),
    currentMax: new Date('2099/12/31 23:59:59'),
    gridMode: DayMode.Day,
    title: '-',
    minYear: 1900,
    maxYear: 2099,
    currentYear: 0,
    currentMonth: 0,
    currentDay: 0,
    currentHour: 0,
    currentMinute: 0,
    currentSecond: 0,
    hasTime: true,
    calendarVisible: false,
});

watch(() => props.min, val => {
    input.currentMin = toDate(val!);
    input.minYear = input.currentMin.getFullYear();
});
watch(() => props.max, val => {
    input.currentMax = toDate(val!);
    input.maxYear = input.currentMax.getFullYear();
});
watch(() => props.modalValue, val => {
    const date = toDate(val!);
    if (isSameTime(date)) {
        return;
    }
    input.currentDate = date;
    refresh();
});

function twoPad(val: any) {
    return twoPadFilter(val);
}
function hideCalerdar(): void {
    input.calendarVisible = false;
}
function isSameTime(date: Date): boolean {
    if (date.getFullYear() !== input.currentDate.getFullYear()) {
        return false;
    }
    if (date.getMonth() !== input.currentDate.getMonth()) {
        return false;
    }
    if (date.getDate() !== input.currentDate.getDate()) {
        return false;
    }
    if (!input.hasTime) {
        return true;
    }
    if (date.getHours() !== input.currentDate.getHours()) {
        return false;
    }
    if (date.getMinutes() !== input.currentDate.getMinutes()) {
        return false;
    }
    return date.getSeconds() === input.currentDate.getSeconds();
}
/**
* 转化date
* @param date
*/
function parseDate(date: null|string|number|Date): Date {
    if (!date) {
        return new Date();
    }
    if (typeof date === 'number') {
        return new Date(date * 1000);
    }
    if (typeof date === 'string') {
        return new Date(date);
    }
    return date;
}
/**
* 验证Date
* @param date
*/
function checkDate(date: Date): boolean {
    const min = input.currentMin;
    if (min && date <= min) {
        return false;
    }
    const max = input.currentMax;
    return !max || date < max;
}
/**
* 刷新变化部分
*/
function refresh(): void {
    input.hasTime = props.format.indexOf('h') > 0;
    refreshCurrent();
    initDays();
}
function refreshCurrent(): void {
    input.currentYear = input.currentDate.getFullYear();
    input.currentMonth = input.currentDate.getMonth() + 1;
    input.currentDay = input.currentDate.getDate();
    if (input.hasTime) {
        input.currentHour = input.currentDate.getHours();
        input.currentMinute = input.currentDate.getMinutes();
        input.currentSecond = input.currentDate.getSeconds();
    }
    input.title = formatDate(input.currentDate, props.titleFormat);
}
function initHours(): void {
    hourList.value = [];
    for (let i = 0; i < 24; i++) {
        hourList.value.push(i);
    }
}
function initMinutes(): void {
    minuteList.value = [];
    for (let i = 0; i < 60; i++) {
        minuteList.value.push(i);
    }
}
function initSeconds(): void {
    secondList.value = [];
    for (let i = 0; i < 60; i++) {
        secondList.value.push(i);
    }
}
function initMonths(): void {
    monthList.value = [];
    for (let i = 1; i < 13; i++) {
        monthList.value.push(i);
    }
}
function initYears(): void {
    yearList.value = [];
    for (let i = input.minYear; i <= input.maxYear; i++) {
        yearList.value.push(i);
    }
}
function initDays(): void {
    dayList.value = getDaysOfMonth(input.currentMonth, input.currentYear);
}
function toggleYear(): void {
    input.gridMode = input.gridMode === DayMode.Year ? DayMode.Day : DayMode.Year;
}
function toggleTime(): void {
    input.gridMode = input.gridMode === DayMode.Hour ? DayMode.Day : DayMode.Hour;
}
/**
* 上一年
*/
function previousYear(): void {
    changeYear(input.currentYear - 1);
}
/**
* 下一年
*/
function nextYear(): void {
    changeYear(input.currentYear + 1);
}
/**
* 上月
*/
function previousMonth(): void {
    changeMonth(input.currentMonth - 1);
}
/**
* 下月
*/
function nextMonth(): void {
    changeMonth(input.currentMonth + 1);
}
function getDaysOfMonth(m: number, y: number): IDay[] {
    const days = [];
    const [f, c] = getFirtAndLastOfMonth(y, m);
    let i: number;
    if (f > 0) {
        const yc = getLastOfMonth(y, m - 1);
        for (i = yc - f + 1; i <= yc; i ++) {
            days.push({
                disable: true,
                val: i,
            });
        }
    }
    for (i = 1; i <= c; i ++) {
        days.push({
            disable: false,
            val: i,
        });
    }
    if (f + c < 43) {
        const l = 42 - f - c;
        for (i = 1; i <= l; i ++) {
            days.push({
                disable: true,
                val: i,
            });
        }
    }
    return days;
}
/**
* 获取月中最后一天
* @param y
* @param m
*/
function getLastOfMonth(y: number, m: number): number {
    const date = new Date(y, m, 0);
    return date.getDate();
}

/**
* 获取第一天和最后一天
* @param y
* @param m
*/
function getFirtAndLastOfMonth(y: number, m: number): [number, number] {
    const date = new Date(y, m, 0);
    const count = date.getDate();
    date.setDate(1);
    return [date.getDay(), count];
}
function applyCurrent() {
    input.currentDate.setFullYear(input.currentYear, input.currentMonth -  1, input.currentDay);
    if (input.hasTime) {
        input.currentDate.setHours(input.currentHour, input.currentMinute, input.currentSecond);
    }
    input.title = formatDate(input.currentDate, props.titleFormat);
}
function changeYear(year: number) {
    input.currentYear = year;
    initDays();
    applyCurrent();
}
function changeMonth(month: number) {
    input.currentMonth = month;
    initDays();
    applyCurrent();
}
function changeDay(day: IDay) {
    const date = new Date(input.currentDate.getTime());
    if (day.disable) {
        if (day.val < 15) {
            date.setMonth(date.getMonth() + 1);
        } else {
            date.setMonth(date.getMonth() - 1);
        }
    }
    date.setDate(day.val);
    if (!checkDate(date)) {
        return;
    }
    input.currentDate = date;
    refreshCurrent();
    if (!input.hasTime) {
        enterChange();
        return;
    }
}
function changeHour(hour: number) {
    input.currentHour = hour;
}
function changeMinute(minute: number) {
    input.currentMinute = minute;
}
function changeSecond(second: number) {
    input.currentSecond = second;
}

/**
* 确认改变
*/
function enterChange() {
    applyCurrent();
    if (!checkDate(input.currentDate)) {
        return;
    }

    output();
    input.calendarVisible = false;
}
function output() {
    const format =  formatDate(input.currentDate, props.format);
    emit('update:modalValue', typeof props.modalValue !== 'object' ? format :  input.currentDate);
    emit('output', format);
}
function showCalendar() {
    input.calendarVisible = true;
    refresh();
}
function toDate(year: number|Date|string, month?: number): Date {
    if (!year) {
        return new Date();
    }
    if (typeof year === 'object') {
        return year;
    }
    if (typeof year === 'number'
    && typeof month === 'number') {
        return new Date(year, month - 1, 1);
    }
    // 解决safari 无法识别 -
    if (typeof year === 'string' && year.indexOf('-') > 0) {
        year.replace('-', '/');
    }
    if (typeof year === 'number' && ('' + year).length  === 10) {
        year *= 1000;
    }
    const date = new Date(year);
    if (isNaN(date.getTime())) {
        return new Date();
    }
    return date;
}

/**
* 格式化日期
*/
function formatDate(date: Date, fmt= 'y年mm月dd日'): string {
    const o: any = {
        'y+': date.getFullYear(),
        'm+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'i+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds(), // 毫秒
    };
    for (const k in o) {
        const match = fmt.match(new RegExp('(' + k + ')'));
        if (match) {
            fmt = fmt.replace(match[1], (match[1].length === 1 || k === 'y+') ? (o[k]) : (('00' + o[k]).substring(('' + o[k]).length)));
        }
    }
    return fmt;
}
function hasElementByClass(path: Element[], className: string): boolean {
    let hasClass = false;
    for (const item of path) {
        if (!item || !item.className) {
            continue;
        }
        hasClass = item.className.indexOf(className) >= 0;
        if (hasClass) {
            return true;
        }
    }
    return hasClass;
}

refresh();
initMonths();
initYears();
if (input.hasTime) {
    initHours();
    initMinutes();
    initSeconds();
}
output();
</script>
<style lang="scss" scoped>
$size: 50px;
$boxWidth: $size * 7;

$minSize: 45px;
$minBoxWidth: $size * 7;

@mixin prefix-animation($animation-name){
    animation: $animation-name;
    -webkit-animation: $animation-name;
    -moz-animation: $animation-name;
    -o-animation: $animation-name;
}

@mixin prefix-keyframes($animation-name){
    @keyframes #{$animation-name}{
        @content;
    }
    @-webkit-keyframes #{$animation-name}{
        @content; 
    }
    @-moz-keyframes #{$animation-name}{
        @content; 
    }
    @-o-keyframes #{$animation-name}{
        @content; 
    }
} 

@mixin prefix-content($content-name, $content-txt){
    #{$content-name}: $content-txt;
    -webkit-#{$content-name}: $content-txt;
    -moz-#{$content-name}: $content-txt;
    -ms-#{$content-name}: $content-txt;
    -o-#{$content-name}: $content-txt;
}


@mixin scrollbar() {
    &::-webkit-scrollbar{
        height:6px;
        width:6px;
        margin-right:5px;
        background: #f5f5f5;
        transition:all 0.3s ease-in-out;
        border-radius:0px
    }
    &::-webkit-scrollbar-track { 
        -webkit-border-radius: 0px;
        border-radius: 0px;
    }
    &::-webkit-scrollbar-thumb{
        -webkit-border-radius: 0px;
        border-radius: 0px;
        background: rgba(0,0,0,0.5); 
        &:hover{
            background:rgba(0,0,0,0.6);
        }
        &:active{
            background:rgba(0,0,0,0.8);
        }
        &:window-inactive {
            background: rgba(0,0,0,0.4);
        }
    }
}

.datepicker {
    position: relative;
    .datepicker__calendar {
        width: $boxWidth;
        position: absolute;
        z-index: 999;
        user-select: none;
        background: #fff;
        color: #333;
        @include prefix-content(user-select, none);
        .header {
            position: relative;
            text-align: center;
            line-height: $size;
            background: #006cff;
            color: #fff;
            font-size: $size * .5;
            span {
                width: 60%;
                display: inline-block;
            }
            .previousMonth,
            .nextYear {
                margin-left: $size * .2;
            }
        }
        li {
            list-style: none;
            color: #333;
        }
        .body {
            height: $boxWidth;
            position: relative;
            .month-grid, 
            .year-grid, 
            .day-grid {
                background: #fff;
                position: absolute;
                top: 0;
                width: 100%;
                bottom: 0;
                left: 0;
            }
            ol, ul {
                padding: 0;
                margin: 0;
            }
            .month-grid {
                ol {
                    background: #eee;
                }
                li {
                    display: inline-block;
                    width: $size;
                    line-height: $size;
                    text-align: center;
                    box-sizing: border-box;
                }
                ul {
                    li {
                        cursor: pointer;
                        &.active {
                            background: #006cff;
                            color: #fff;
                        }
                        &.disable {
                            color: #ccc;
                        }
                    }
                }
            }
            .list-group {
                width: 80px;
                display: inline-block;
                .title {
                    height: 30px;
                }
                ul {
                    height: $boxWidth - 30px;
                    li {
                        line-height: 30px;
                        &.active {
                            background: #006cff;
                            color: #fff;
                        }
                    }
                }
            }
            .day-grid {
                .list-group {
                    width: 60px;
                    &:first-child {
                        margin-left: ($boxWidth - 190px) / 2;
                    }
                }
            }
            .year-grid {
                .list-group {
                    &:first-child {
                        margin-left: ($boxWidth - 160px) / 2;
                    }
                }
            }
            .year-grid,
            .day-grid {
                .fa-close {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                }
            }
        }
        .footer {
            background: #eee;
            position: relative;
            height: 30px;
            .time-box {
                display: inline-block;
                line-height: 30px;
                height: 30px;
                position: absolute;
                span {
                    display: inline-block;
                    width: 30px;
                    text-align: center;
                }
            }
            button {
                position: absolute;
                right: 0;
                width: 100px;
                background: green;
                color: #fff;
                height: 30px;    
                line-height: 30px;
                border: none;
            }
        }
    }
    .list-group {
        .title,
        ul {
            width: 100%;
            text-align: center;
        }
        ul {
            overflow-y: auto;
            border: 1px solid #eee;
            @include scrollbar();
        }
    }
}



@media screen and (max-width: 400px) {
    .datepicker {
        .datepicker__calendar {
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            .body {
                height: $minBoxWidth;
                width: $minBoxWidth;
                margin: 0 auto;
                .month-grid {
                    li {
                        width: $minSize;
                        line-height: $minSize;
                    }
                }
                .list-group {
                    ul {
                        height: $minBoxWidth - 30px;
                    }
                }
            }
        }
    }
}
</style>

