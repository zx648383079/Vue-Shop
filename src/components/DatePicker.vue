<template>
    <div class="datepicker">
        <div @click="showCalendar()" class="datepicker__input-container">
            <slot></slot>
        </div>
        <div class="datepicker__calendar datepicker__calendar_animate_slide-in" v-if="calendarVisible">
            <div class="header">
                <i class="iconfont fa-backward previousYear" @click="previousYear()"></i>
                <i class="iconfont fa-chevron-left previousMonth" @click="previousMonth()"></i>
                <span @click="toggleYear()">{{ title }}</span>
                <i class="iconfont fa-chevron-right nextMonth" @click="nextMonth()"></i>
                <i class="iconfont fa-forward nextYear" @click="nextYear()"></i>
            </div>
            <div class="body">
                <div class="month-grid" v-if="gridMode == 0">
                    <ol><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ol>
                    <ul><li v-for="(item, index) in dayList" :key="index" :class="{disable: item.disable, active: item.val == currentDay && !item.disable}" @click="changeDay(item)">{{ twoPad(item.val) }}</li></ul>
                </div>
                <div class="year-grid" v-if="gridMode == 1">
                    <div class="list-group year">
                        <div class="title">年</div>
                        <ul>
                            <li v-for="(item, index) in yearList" :key="index" :class="{active: item == currentYear}" @click="changeYear(item)">{{ item }}</li>
                        </ul>
                    </div>
                    <div class="list-group month">
                    <div class="title">月</div>
                    <ul>
                        <li v-for="(item, index) in monthList" :key="index" :class="{active: item == currentMonth}" @click="changeMonth(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <i class="iconfont fa-close" @click="toggleYear()"></i>
                </div>
                <div class="day-grid" v-if="hasTime && gridMode == 2">
                    <div class="list-group hour">
                    <div class="title">小时</div>
                    <ul>
                        <li v-for="(item, index) in hourList" :key="index" :class="{active: item == currentHour}" @click="changeHour(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <div class="list-group minute">
                    <div class="title">分钟</div>
                    <ul>
                        <li v-for="(item, index) in minuteList" :key="index" :class="{active: item == currentMinute}" @click="changeMinute(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <div class="list-group second">
                    <div class="title">秒钟</div>
                    <ul>
                        <li v-for="(item, index) in secondList" :key="index" :class="{active: item == currentSecond}" @click="changeSecond(item)">{{ twoPad(item) }}</li>
                    </ul>
                    </div>
                    <i class="iconfont fa-close"></i>
                </div>
            </div>
            <div class="footer" v-if="hasTime">
                <div class="time-box" @click="toggleTime()">
                    <span>{{ twoPad(currentHour) }}</span>:
                    <span>{{ twoPad(currentMinute) }}</span>:
                    <span>{{ twoPad(currentSecond) }}</span>
                </div>
                <button type="button" @click="enterChange()">确定</button>
            </div>

        </div>
        <div class="dialog-bg" v-if="calendarVisible" @click="hideCalerdar"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { twoPadFilter } from '../pipes';

export interface IDay {
    disable?: boolean,
    selected?: boolean,
    val: number
}

export enum DayMode {
    Day = 0,
    Year = 1,
    Hour = 2,
}

export default defineComponent({
    props: {
        min: {type: [Date, String]},
        max: {type: [Date, String]},
        value: {type: [Date, String]},
        titleFormat: {type: String, default: 'y年mm月'},
        format: {type: String, default: 'y-mm-dd hh:ii:ss'},
    },
    data() {
        const currentDate: Date = new Date();
        const currentMin: Date = new Date('1900/01/01 00:00:00');
        const currentMax: Date = new Date('2099/12/31 23:59:59');



        const dayList: IDay[] = [];
        const yearList: number[] = [];
        const monthList: number[] = [];
        const hourList: number[] = [];
        const minuteList: number[] = [];
        const secondList: number[] = [];

        const gridMode: DayMode = DayMode.Day as any;
        return {
            currentDate,
            currentMax,
            currentMin,
            dayList,
            yearList,
            monthList,
            hourList,
            minuteList,
            secondList,
            gridMode,
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
        };
    },
    watch: {
        min(val: Date| string): void {
            this.currentMin = this.toDate(val);
            this.minYear = this.currentMin.getFullYear();
        },
        max(val: Date| string): void {
            this.currentMax = this.toDate(val);
            this.maxYear = this.currentMax.getFullYear();
        },
        value(val: Date| string): void {
            const date = this.toDate(val);
            if (this.isSameTime(date)) {
                return;
            }
            this.currentDate = date;
            this.refresh();
        }
    },
    created() {
        this.refresh();
        this.initMonths();
        this.initYears();
        if (this.hasTime) {
            this.initHours();
            this.initMinutes();
            this.initSeconds();
        }
        this.output();
    },
    methods: {
        twoPad(val: any) {
            return twoPadFilter(val);
        },
        hideCalerdar(): void {
            this.calendarVisible = false;
        },
        isSameTime(date: Date): boolean {
            if (date.getFullYear() !== this.currentDate.getFullYear()) {
                return false;
            }
            if (date.getMonth() !== this.currentDate.getMonth()) {
                return false;
            }
            if (date.getDate() !== this.currentDate.getDate()) {
                return false;
            }
            if (!this.hasTime) {
                return true;
            }
            if (date.getHours() !== this.currentDate.getHours()) {
                return false;
            }
            if (date.getMinutes() !== this.currentDate.getMinutes()) {
                return false;
            }
            return date.getSeconds() === this.currentDate.getSeconds();
        },
        /**
        * 转化date
        * @param date
        */
        parseDate(date: null|string|number|Date): Date {
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
        },
        /**
        * 验证Date
        * @param date
        */
        checkDate(date: Date): boolean {
            const min = this.currentMin;
            if (min && date <= min) {
                return false;
            }
            const max = this.currentMax;
            return !max || date < max;
        },
        /**
        * 刷新变化部分
        */
        refresh(): void {
            this.hasTime = this.format.indexOf('h') > 0;
            this.refreshCurrent();
            this.initDays();
        },
        refreshCurrent(): void {
            this.currentYear = this.currentDate.getFullYear();
            this.currentMonth = this.currentDate.getMonth() + 1;
            this.currentDay = this.currentDate.getDate();
            if (this.hasTime) {
                this.currentHour = this.currentDate.getHours();
                this.currentMinute = this.currentDate.getMinutes();
                this.currentSecond = this.currentDate.getSeconds();
            }
            this.title = this.formatDate(this.currentDate, this.titleFormat);
        },
        initHours(): void {
            this.hourList = [];
            for (let i = 0; i < 24; i++) {
                this.hourList.push(i);
            }
        },
        initMinutes(): void {
            this.minuteList = [];
            for (let i = 0; i < 60; i++) {
                this.minuteList.push(i);
            }
        },
        initSeconds(): void {
            this.secondList = [];
            for (let i = 0; i < 60; i++) {
                this.secondList.push(i);
            }
        },
        initMonths(): void {
            this.monthList = [];
            for (let i = 1; i < 13; i++) {
                this.monthList.push(i);
            }
        },
        initYears(): void {
            this.yearList = [];
            for (let i = this.minYear; i <= this.maxYear; i++) {
                this.yearList.push(i);
            }
        },
        initDays(): void {
            this.dayList = this.getDaysOfMonth(this.currentMonth, this.currentYear);
        },
        toggleYear(): void {
            this.gridMode = this.gridMode === DayMode.Year ? DayMode.Day : DayMode.Year;
        },
        toggleTime(): void {
            this.gridMode = this.gridMode === DayMode.Hour ? DayMode.Day : DayMode.Hour;
        },
        /**
        * 上一年
        */
        previousYear(): void {
            this.changeYear(this.currentYear - 1);
        },
        /**
        * 下一年
        */
        nextYear(): void {
            this.changeYear(this.currentYear + 1);
        },
        /**
        * 上月
        */
        previousMonth(): void {
            this.changeMonth(this.currentMonth - 1);
        },
        /**
        * 下月
        */
        nextMonth(): void {
            this.changeMonth(this.currentMonth + 1);
        },
        getDaysOfMonth(m: number, y: number): IDay[] {
            const days = [];
            const [f, c] = this.getFirtAndLastOfMonth(y, m);
            let i: number;
            if (f > 0) {
                const yc = this.getLastOfMonth(y, m - 1);
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
        },
        /**
        * 获取月中最后一天
        * @param y
        * @param m
        */
        getLastOfMonth(y: number, m: number): number {
            const date = new Date(y, m, 0);
            return date.getDate();
        },

        /**
        * 获取第一天和最后一天
        * @param y
        * @param m
        */
        getFirtAndLastOfMonth(y: number, m: number): [number, number] {
            const date = new Date(y, m, 0);
            const count = date.getDate();
            date.setDate(1);
            return [date.getDay(), count];
        },
        applyCurrent() {
            this.currentDate.setFullYear(this.currentYear, this.currentMonth -  1, this.currentDay);
            if (this.hasTime) {
                this.currentDate.setHours(this.currentHour, this.currentMinute, this.currentSecond);
            }
            this.title = this.formatDate(this.currentDate, this.titleFormat);
        },
        changeYear(year: number) {
            this.currentYear = year;
            this.initDays();
            this.applyCurrent();
        },
        changeMonth(month: number) {
            this.currentMonth = month;
            this.initDays();
            this.applyCurrent();
        },
        changeDay(day: IDay) {
            const date = new Date(this.currentDate.getTime());
            if (day.disable) {
                if (day.val < 15) {
                    date.setMonth(date.getMonth() + 1);
                } else {
                    date.setMonth(date.getMonth() - 1);
                }
            }
            date.setDate(day.val);
            if (!this.checkDate(date)) {
                return;
            }
            this.currentDate = date;
            this.refreshCurrent();
            if (!this.hasTime) {
                this.enterChange();
                return;
            }
        },
        changeHour(hour: number) {
            this.currentHour = hour;
        },
        changeMinute(minute: number) {
            this.currentMinute = minute;
        },
        changeSecond(second: number) {
            this.currentSecond = second;
        },

        /**
        * 确认改变
        */
        enterChange() {
            this.applyCurrent();
            if (!this.checkDate(this.currentDate)) {
                return;
            }

            this.output();
            this.calendarVisible = false;
        },
        output() {
            const format =  this.formatDate(this.currentDate, this.format);
            this.$emit('input', typeof this.value !== 'object' ? format :  this.currentDate);
            this.$emit('output', format);
        },
        showCalendar() {
            this.calendarVisible = true;
            this.refresh();
        },
        toDate(year: number|Date|string, month?: number): Date {
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
        },

        /**
        * 格式化日期
        */
        formatDate(date: Date, fmt= 'y年mm月dd日'): string {
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
                if (new RegExp('(' + k + ')').test(fmt)) {
                    const len =  ('' + o[k]).length;
                    fmt = fmt.replace(RegExp.$1,
                    (RegExp.$1.length === 1 || RegExp.$1.length === len)
                    ? (o[k]) : (('00' + o[k]).substr(len)));
                }
            }
            return fmt;
        },
        hasElementByClass(path: Element[], className: string): boolean {
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
    }
});
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

