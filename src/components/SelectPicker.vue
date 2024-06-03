<template>
    <div class="select-picker">
        <div @click="showCalendar" class="select-picker__input-container">
            <slot></slot>
        </div>
        <div :class="['dialog', 'dialog-select', 'dialog-select-column-' + column]" v-if="calendarVisible">
            <div class="dialog-header">
                <div class="dialog-close" @click="hideCalerdar">取消</div>
                <div class="dialog-title">{{ title }}</div>
                <div class="dialog-yes" @click="tapOutput">确定</div>
            </div>
            <div class="dialog-body"
                @touchstart='touchStart'
                @touchmove='touchMove'>
                <ul v-for="(item, index) in columnList" :key="index" :class="'dialog-column-' + index" :style="item.style">
                    <li v-for="(it, i) in item.items" :key="i" :class="{active: i == item.index}" @click.stop="tapItem(index, i)">{{ it[textTag] }}</li>
                </ul>
                <hr class="dialog-top-hr">
                <hr class="dialog-bottom-hr">
            </div>
        </div>
        <div class="dialog-bg" v-if="calendarVisible" @click="hideCalerdar"/>
    </div>
</template>
<script setup lang="ts">
import { eachObject } from '@/utils';
import { ref, watch } from 'vue'

interface IColumn {
    index: number,
    items: any[],
    style: string
}

interface IPoint {
    x: number,
    y: number,
}

const emit = defineEmits(['update:modalValue'])
const props = withDefaults(defineProps<{
    column?: number,
    title?: string,
    textTag?: string,
    valueTag?: string,
    childrenTag?: string,
    lineHeight?: number,
    modalValue?: any,
    items: any,
}>(), {
    column: 1,
    title: '请选择',
    textTag: 'name',
    valueTag: 'id',
    childrenTag: 'children',
    lineHeight: 30,
});

const columnList = ref<IColumn[]>([]);
const startPoint = ref<IPoint>({x: 0, y: 0});
const calendarVisible = ref(false);

function showCalendar() {
    calendarVisible.value = true;
    refresh();
}
function hideCalerdar() {
    calendarVisible.value = false;
}
function tapItem(index: number, i: number) {
    columnList.value[index].index = i;
    columnList.value[index].style = getIndexStyle(i);
    for (let j = index + 1; j < columnList.value.length; j ++) {
        refreshColumn(j, 0);
    }
}
function touchStart(event: TouchEvent) {
    const touch = event.targetTouches[0];
    startPoint.value = {
        x: touch.pageX,
        y: touch.pageY,
    };
}
function touchMove(event: TouchEvent) {
    const touch = event.targetTouches[0];
    if (event.targetTouches.length > 1 || ((event as any).scale && (event as any).scale !== 1)) {
        return;
    }
    event.preventDefault();
    const y = touch.pageY - startPoint.value.y;
    const diff = Math.abs(y);
    if (diff >= props.lineHeight) {
        // 滑动了一个单位就更新起始y 坐标
        startPoint.value.y = touch.pageY;
        doMove(diff, y < 0, startPoint.value.x);
    }
}
function getClientWidth(): number {
    if (window.innerHeight !== undefined) {
        return window.innerWidth;
    }
    if (document.compatMode === 'CSS1Compat') {
        return document.documentElement.clientWidth;
    }
    return document.body.clientWidth;
}
/**
* 滑动
* @param distance 距离的绝对值
* @param isUp 是否是上滑
* @param x 触发的位置，自动定位到第几级
*/
function doMove(distance: number, isUp = true, x = 0) {
    const diff: number = isUp ? Math.floor(distance / props.lineHeight) : - Math.ceil(distance / props.lineHeight);
    let column = 0;
    if (diff === 0) {
        return;
    }
    if (column > 1) {
        column = Math.floor(x / (getClientWidth() / column));
    }
    tapItem(column, columnList.value[column].index + diff);
}
function tapOutput() {
    hideCalerdar();
    if (columnList.value.length < 1) {
        return;
    }
    const data = [];
    const name = [];
    for (const column of columnList.value) {
        const current = column.index || 0;
        if (!column.items || column.items.length < current) {
            break;
        }
        name.push(column.items[current][props.textTag]);
        data.push(cloneItem(column.items[current]));
    }
    if (typeof props.modalValue === 'object' && props.modalValue instanceof Array) {
        emit('update:modalValue', data);
        return;
    }
    if (data.length < 1) {
        return;
    }
    const item: any = data[data.length - 1];
    if (!Object.prototype.hasOwnProperty.call(item, 'full_name')) {
        item.full_name = name.join(' ');
    }
    emit('update:modalValue', item);
}
function cloneItem(obj: any): any {
    const item: any = new Object();
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && key !== props.childrenTag) {
            item[key] = obj[key];
        }
    }
    return item;
}
function refresh() {
    if (Object.keys(props.items).length === 0) {
        return;
    }
    const path = getPath();
    for (let i = 0; i < props.column; i++) {
        refreshColumn(i, path.length > i ? path[i] : 0);
    }
}
function refreshColumn(index: number, selected = 0) {
    const data: any[] = [];
    eachObject(getColumnData(index), (item) => {
        data.push(item);
    });
    if (columnList.value.length <= index) {
        columnList.value.push({
            index: selected,
            items: data,
            style: getIndexStyle(selected),
        });
        return;
    }
    columnList.value[index].items = data;
    columnList.value[index].index = selected;
    columnList.value[index].style = getIndexStyle(selected);
}
function getColumnData(index: number) {
    if (index < 1) {
        return props.items;
    }
    if (columnList.value.length < index) {
        return [];
    }
    const column = columnList.value[index - 1];
    const current = column.index || 0;
    if (!column.items || column.items.length <= current) {
        return [];
    }
    const item = column.items[current];
    if (!Object.prototype.hasOwnProperty.call(item, props.childrenTag)) {
        return [];
    }
    return item[props.childrenTag];
}
function getIndexStyle(index: number) {
    const top = 2 * props.lineHeight - index  * props.lineHeight;
    return 'transform: translate(0px, ' + top + 'px) translateZ(0px)';
}
    /**
* 根据ID查找无限树的路径
* @param id
*/
function getPath(): number[] {
    if (!props.modalValue) {
        return [];
    }
    let id: string | number;
    if (typeof props.modalValue === 'object') {
        if (props.modalValue instanceof Array) {
            return getPathByArr();
        }
        id = (props.modalValue as any)[props.valueTag];
    } else {
        id = props.modalValue;
    }
    if (!id) {
        return [];
    }
    const path: number[] = [];
    let found = false;
    const findPath = (data: any) => {
        if (typeof data !== 'object') {
            return;
        }
        let iii = -1;
        eachObject(data, (args, key) => {
            iii ++;
            if (key === id || args[props.valueTag] === id) {
                path.push(iii);
                found = true;
                return false;
            }
            if (!Object.prototype.hasOwnProperty.call(args, props.childrenTag)) {
                return;
            }
            findPath(args[props.childrenTag]);
            if (found) {
                path.push(iii);
                return false;
            }

        });
    };
    let ii = -1;

    eachObject(props.items, (data: any) => {
        ii ++;
        findPath(data[props.childrenTag]);
        if (found) {
            path.push(ii);
            return false;
        }
    });
    path.reverse();
    return path;
}
function getPathByArr() {
    let data = props.items;
    const path: number[] = [];
    eachObject(props.modalValue, (item) => {
        const [index, children] = getIndexWithItems(item, data);
        path.push(index);
        if (!children) {
            return false;
        }
        data = children;
    });
    return path;
}
function getIndexWithItems(item: any, data: any) {
    if (!data) {
        return [0, undefined];
    }
    let i = -1;
    let index = -1;
    let children: any;
    eachObject(data, (obj) => {
        i ++;
        if (!item[props.valueTag] && item[props.valueTag] === obj[props.valueTag]) {
            children = obj[props.childrenTag];
            index = i;
            return false;
        }
    });
    if (index < 0) {
        return [0, undefined];
    }
    return [index, children];
}


watch(() => props.items, (val: any, oldVal: any) => {
    if (Object.keys(val).length === 0) {
        return;
    }
    if (Object.keys(oldVal).length === 0 && calendarVisible.value) {
        refresh();
    }
});


</script>
<style lang="scss" scoped>
.dialog-select-input {
    padding: 0 20px 0 10px;
    height: 36px;
    line-height: 36px;
    position: relative;
    border: 1px solid #eee;
    cursor: pointer;
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 10px;
        margin-top: -2px;
        border-top: 5px solid #666;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
    }
}
.dialog.dialog-select {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 998;
    background: #fff;
    .dialog-header {
        position: relative;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #ccc;
        z-index: 999;
        .dialog-close {
            position: absolute;
            left: 15px;
            line-height: 30px;
        }
        .dialog-yes {
            position: absolute;
            right: 15px;
            top: 0;
            line-height: 30px;
        }
    }
    .dialog-body {
        height: 150px;
        position: relative;
        overflow: hidden;
        ul {
            margin: 0;
            padding: 0;
            transition: all .3s;
            li {
                list-style: none;
                line-height: 30px;
                color: rgba(0, 0, 0, .3);
                text-align: center;
                overflow-x: hidden;
                word-break: keep-all;
                &.active {
                    color: #000;
                }
            }
        }
        .dialog-top-hr,
        .dialog-bottom-hr {
            position: absolute;
            width: 100%;
            margin: 0;
            padding: 0;
        }
        .dialog-top-hr {
            top: 60px;
        }
        .dialog-bottom-hr {
            top: 90px;
        }
    }
    &.dialog-select-column-3 {
        .dialog-body {
            ul {
                width: 33%;
                float: left;
            }
        }
        
    }
}
</style>

