<template>
    <div class="datepicker">
        <div @click="showCalendar" class="datepicker__input-container">
            <slot></slot>
        </div>
        <div class="datepicker__calendar datepicker__calendar_animate_slide-in" v-if="calendarVisible">
            <div class="header">
                <i class="fa fa-backward previousYear" @click="previousYear()"></i>
                <i class="fa fa-chevron-left previousMonth" @click="previousMonth()"></i>
                <span @click="toggleYear()">{{ title }}</span>
                <i class="fa fa-chevron-right nextMonth" @click="nextMonth()"></i>
                <i class="fa fa-forward nextYear" @click="nextYear()"></i>
            </div>
            <div class="body">
                <div class="month-grid" v-if="gridMode == 0">
                    <ol><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ol>
                    <ul><li v-for="(item, index) in day_list" :key="index" :class="{disable: item.disable, active: item.val == currentDay && !item.disable}" @click="changeDay(item)">{{ item.val | twoPad }}</li></ul>
                </div>
                <div class="year-grid" v-if="gridMode == 1">
                    <div class="list-group year">
                        <div class="title">年</div>
                        <ul>
                            <li v-for="(item, index) in year_list" :key="index" :class="{active: item == currentYear}" @click="changeYear(item)">{{ item }}</li>
                        </ul>
                    </div>
                    <div class="list-group month">
                    <div class="title">月</div>
                    <ul>
                        <li v-for="(item, index) in month_list" :key="index" :class="{active: item == currentMonth}" @click="changeMonth(item)">{{ item | twoPad }}</li>
                    </ul>
                    </div>
                    <i class="fa fa-close" @click="toggleYear()"></i>
                </div>
                <div class="day-grid" v-if="hasTime && gridMode == 2">
                    <div class="list-group hour">
                    <div class="title">小时</div>
                    <ul>
                        <li v-for="(item, index) in hour_list" :key="index" :class="{active: item == currentHour}" @click="changeHour(item)">{{ item | twoPad }}</li>
                    </ul>
                    </div>
                    <div class="list-group minute">
                    <div class="title">分钟</div>
                    <ul>
                        <li v-for="(item, index) in minute_list" :key="index" :class="{active: item == currentMinute}" @click="changeMinute(item)">{{ item | twoPad }}</li>
                    </ul>
                    </div>
                    <div class="list-group second">
                    <div class="title">秒钟</div>
                    <ul>
                        <li v-for="(item, index) in second_list" :key="index" :class="{active: item == currentSecond}" @click="changeSecond(item)">{{ item | twoPad }}</li>
                    </ul>
                    </div>
                    <i class="fa fa-close"></i>
                </div>
            </div>
            <div class="footer" v-if="hasTime">
                <div class="time-box" @click="toggleTime()">
                    <span>{{ currentHour | twoPad }}</span>:
                    <span>{{ currentMinute | twoPad }}</span>:
                    <span>{{ currentSecond | twoPad }}</span>
                </div>
                <button type="button" @click="enterChange()">确定</button>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

export interface IDay {
    disable?: boolean,
    selected?: boolean,
    val: number
};

export enum DayMode {
    Day = 0,
    Year = 1,
    Hour = 2
};

@Component
export default class DatePicker extends Vue {
    @Prop(Date) readonly min: Date = new Date('1900/01/01 00:00:00');
    @Prop(Date) readonly max: Date = new Date('2099/12/31 23:59:59');
    @Prop(Number) readonly minYear: number = 1900;
    @Prop(Number) readonly maxYear: number = 2099;
    @Prop(String) readonly titleFormat: string = 'y年mm月dd日';
    @Prop(String) readonly format: string = 'y-mm-dd hh:ii:ss';
    @Prop(Date) readonly value: Date = new Date();

    title: string = '-';

    day_list: Array<IDay> = [];

    year_list: Array<number> = [];

    month_list: Array<number> = [];

    hour_list: Array<number> = [];

    minute_list: Array<number> = [];

    second_list: Array<number> = [];
    
    currentYear: number = 0;

    currentMonth: number = 0;

    currentDay: number = 0;

    currentHour: number = 0;

    currentMinute: number = 0;

    currentSecond: number = 0;

    hasTime: boolean = true;

    calendarVisible: boolean = false;

    gridMode: DayMode = DayMode.Day;

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
    }

    /**
     * 转化date
     * @param date 
     */
    parseDate(date: any): Date {
        if (!date) {
            return new Date();
        }
        if (typeof date == 'number') {
            return new Date(date * 1000);
        } 
        if (typeof date == 'string') {
            return new Date(date);
        }
        return date;
    }

    /**
      * 验证Date
      * @param date 
      */
     checkDate(date: Date): boolean {
        let min = this.min;
        if (min && date <= min) {
            return false;
        }
        let max = this.max;
        return !max || date < max;
    }

    /**
     * 刷新变化部分
     */
    refresh() {
        this.hasTime = this.format.indexOf('h') > 0;
        this.refreshCurrent();
        this.initDays();
    }

    refreshCurrent() {
        this.currentYear = this.value.getFullYear();
        this.currentMonth = this.value.getMonth() + 1;
        this.currentDay = this.value.getDate();
        if (this.hasTime) {
            this.currentHour = this.value.getHours();
            this.currentMinute = this.value.getMinutes();
            this.currentSecond = this.value.getSeconds();
        }
        this.title = this.formatDate(this.value, this.titleFormat);
    }

    initHours() {
        this.hour_list = [];
        for (let i = 0; i < 24; i++) {
            this.hour_list.push(i);
        }
    }

    initMinutes() {
        this.minute_list = [];
        for (let i = 0; i < 60; i++) {
            this.minute_list.push(i);
        }
    }

    initSeconds() {
        this.second_list = [];
        for (let i = 0; i < 60; i++) {
            this.second_list.push(i);
        }
    }

    initMonths() {
        this.month_list = [];
        for (let i = 1; i < 13; i++) {
            this.month_list.push(i);
        }
    }

    initYears() {
        this.year_list = [];
        for(let i = this.minYear; i <= this.maxYear; i++) {
            this.year_list.push(i);
        }
    }

    initDays() {
        this.day_list = this.getDaysOfMonth(this.currentMonth, this.currentYear);
    }

    toggleYear() {
        this.gridMode = this.gridMode == DayMode.Year ? DayMode.Day : DayMode.Year;
    }

    toggleTime() {
        this.gridMode = this.gridMode == DayMode.Hour ? DayMode.Day : DayMode.Hour;
    }


    private getDaysOfMonth(m: number, y: number): IDay[] {
        let days = [];
        let [f, c] = this.getFirtAndLastOfMonth(y, m);
        let i: number;
        if (f > 0) {
            let yc = this.getLastOfMonth(y, m - 1);
            for (i = yc - f + 2; i <= yc; i ++) {
                days.push({
                    disable: true,
                    val: i
                });
            }
        }
        for (i = 1; i <= c; i ++) {
            days.push({
                disable: false,
                val: i
            });
        }
        if (f + c < 43) {
            let l = 42 - f - c + 1;
            for (i = 1; i <= l; i ++) {
                days.push({
                    disable: true,
                    val: i
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
    private getLastOfMonth(y: number, m: number): number {
        let date = new Date(y, m, 0);
        return date.getDate();
     }

    /**
     * 获取第一天和最后一天
     * @param y 
     * @param m 
     */
    private getFirtAndLastOfMonth(y: number, m: number): [number, number] {
        let date = new Date(y, m, 0);
        let count = date.getDate();
        date.setDate(1);
        return [date.getDay(), count];
     }

    /**
     * 上一年
     */
    previousYear() {
        this.changeYear(this.currentYear - 1);
    }
    /**
     * 下一年
     */
    nextYear() {
        this.changeYear(this.currentYear + 1);
    }
    /**
     * 上月
     */
    previousMonth() {
        this.changeMonth(this.currentMonth - 1);
    }
    /**
     * 下月
     */
    nextMonth() {
        this.changeMonth(this.currentMonth + 1);
    }

    applyCurrent() {
        this.value.setFullYear(this.currentYear, this.currentMonth, this.currentDay);
        if (this.hasTime) {
            this.value.setHours(this.currentHour, this.currentMinute, this.currentSecond);
        }
        this.title = this.formatDate(this.value, this.titleFormat);
    }

    changeYear(year: number) {
        this.currentYear = year;
        this.initDays();
        this.applyCurrent();
    }

    changeMonth(month: number) {
        this.currentMonth = month;
        this.initDays();
        this.applyCurrent();
    }

    changeDay(day: IDay) {
        let date = new Date(this.value.getTime());
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
        this.$emit('input', date);
        this.refreshCurrent();
        if (!this.hasTime) {
            this.enterChange();
            return;
        }
    }

    changeHour(hour: number) {
        this.currentHour = hour;
    }

    changeMinute(minute: number) {
        this.currentMinute = minute;
    }

    changeSecond(second: number) {
        this.currentSecond = second;
    }

    /**
     * 确认改变
     */
    enterChange() {
        this.applyCurrent();
        if (!this.checkDate(this.value)) {
            return;
        }
        this.output();
        this.calendarVisible = false;
    }

    output() {
        this.$emit('input', this.value);
        this.$emit('output', this.formatDate(this.value, this.format));
    }

    showCalendar() {
        this.calendarVisible = true;
        this.refresh();
    }

    /**
     * 格式化日期
     */
    public formatDate(date: Date, fmt: string = 'y年mm月dd日'): string {
        let o = {
            "y+": date.getFullYear(),
            "m+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "i+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒 
        };
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }


    hasElementByClass(path: Array<Element>, className: string): boolean {
        let hasClass = false;
        for (let i = 0; i < path.length; i++) {
            const item = path[i];
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

