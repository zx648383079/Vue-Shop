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
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { IRegionObject } from '@/api/model';
import { each } from '@/utils';

interface IColumn {
    index: number,
    items: any[],
    style: string
}

interface IPoint {
    x: number,
    y: number,
}

@Component
export default class SelectPicker extends Vue {
    @Prop({type: Number, default: 1}) public readonly column!: number;
    @Prop({default: '请选择'}) public readonly title!: string;
    @Prop({default: 'name'}) public readonly textTag!: string;
    @Prop({default: 'id'}) public readonly valueTag!: string;
    @Prop({default: 'children'}) public readonly childrenTag!: string;
    @Prop({type: Number, default: 30}) public readonly lineHeight!: number;
    @Prop([Array, Object]) public readonly value!: object|object[];

    @Prop(Object) public readonly items!: any;

    public columnList: IColumn[] = [];
    public calendarVisible: boolean = false;
    public startPoint: IPoint = {x: 0, y: 0};

    @Watch('items')
    public onItemsChanged(val: any, oldVal: any) {
        if (Object.keys(val).length === 0) {
            return;
        }
        if (Object.keys(oldVal).length === 0 && this.showCalendar) {
            this.refresh();
        }
    }

    public showCalendar() {
        this.calendarVisible = true;
        this.refresh();
    }

    public hideCalerdar() {
       this.calendarVisible = false;
    }

    public tapItem(index: number, i: number) {
        this.columnList[index].index = i;
        this.columnList[index].style = this.getIndexStyle(i);
        for (let j = index + 1; j < this.columnList.length; j ++) {
            this.refreshColumn(j, 0);
        }
    }

    public touchStart(event: TouchEvent) {
        const touch = event.targetTouches[0];
        this.startPoint = {
            x: touch.pageX,
            y: touch.pageY,
        };
    }

    public touchMove(event: TouchEvent) {
        const touch = event.targetTouches[0];
        if (event.targetTouches.length > 1 || ((event as any).scale && (event as any).scale !== 1)) {
            return;
        }
        event.preventDefault();
        const y = touch.pageY - this.startPoint.y;
        const diff = Math.abs(y);
        if (diff >= this.lineHeight) {
            // 滑动了一个单位就更新起始y 坐标
            this.startPoint.y = touch.pageY;
            this.doMove(diff, y < 0, this.startPoint.x);
        }
    }

    public getClientWidth(): number {
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
    public doMove(distance: number, isUp: boolean = true, x: number = 0) {
        const diff: number = isUp ? Math.floor(distance / this.lineHeight) : - Math.ceil(distance / this.lineHeight);
        let column: number = 0;
        if (diff === 0) {
            return this;
        }
        if (this.column > 1) {
            column = Math.floor(x / (this.getClientWidth() / this.column));
        }
        this.tapItem(column, this.columnList[column].index + diff);
    }

    public tapOutput() {
        this.hideCalerdar();
        if (this.columnList.length < 1) {
            return;
        }
        const data = [];
        const name = [];
        for (const column of this.columnList) {
            const current = column.index || 0;
            if (!column.items || column.items.length < current) {
                break;
            }
            name.push(column.items[current][this.textTag]);
            data.push(this.cloneItem(column.items[current]));
        }
        if (typeof this.value === 'object' && this.value instanceof Array) {
            this.$emit('input', data);
            return;
        }
        if (data.length < 1) {
            return;
        }
        const item: any = data[data.length - 1];
        if (!item.hasOwnProperty('full_name')) {
            item.full_name = name.join(' ');
        }
        this.$emit('input', item);
    }

    public cloneItem(obj: any): any {
        const item: any = new Object();
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && key !== this.childrenTag) {
                item[key] = obj[key];
            }
        }
        return item;
    }

    public refresh() {
        if (Object.keys(this.items).length === 0) {
            return;
        }
        const path = this.getPath();
        for (let i = 0; i < this.column; i++) {
            this.refreshColumn(i, path.length > i ? path[i] : 0);
        }
    }

    public refreshColumn(index: number, selected: number = 0) {
        const data: any[] = [];
        each(this.getColumnData(index), (item) => {
            data.push(item);
        });
        if (this.columnList.length <= index) {
            this.columnList.push({
                index: selected,
                items: data,
                style: this.getIndexStyle(selected),
            });
            return;
        }
        this.columnList[index].items = data;
        this.columnList[index].index = selected;
        this.columnList[index].style = this.getIndexStyle(selected);
    }

    public getColumnData(index: number) {
        if (index < 1) {
            return this.items;
        }
        if (this.columnList.length < index) {
            return [];
        }
        const column = this.columnList[index - 1];
        const current = column.index || 0;
        if (!column.items || column.items.length <= current) {
            return [];
        }
        const item = column.items[current];
        if (!item.hasOwnProperty(this.childrenTag)) {
            return [];
        }
        return item[this.childrenTag];
    }

    public getIndexStyle(index: number) {
        const top = 2 * this.lineHeight - index  * this.lineHeight;
        return 'transform: translate(0px, ' + top + 'px) translateZ(0px)';
    }

    /**
     * 根据ID查找无限树的路径
     * @param id
     */
    public getPath(): number[] {
        if (!this.value) {
            return [];
        }
        let id: string | number;
        if (typeof this.value === 'object') {
            if (this.value instanceof Array) {
                return this.getPathByArr();
            }
            id = (this.value as any)[this.valueTag];
        } else {
            id = this.value;
        }
        if (!id) {
            return [];
        }
        const path: number[] = [];
        let found = false;
        const that = this;
        const findPath = (data: any) => {
            if (typeof data !== 'object') {
                return;
            }
            let iii = -1;
            each(data, (args, key) => {
                iii ++;
                if (key === id || args[that.valueTag] === id) {
                    path.push(iii);
                    found = true;
                    return false;
                }
                if (!args.hasOwnProperty(that.childrenTag)) {
                    return;
                }
                findPath(args[that.childrenTag]);
                if (found) {
                    path.push(iii);
                    return false;
                }

            });
        };
        let ii = -1;

        each(this.items, (data: any, key: any) => {
            ii ++;
            findPath(data[that.childrenTag]);
            if (found) {
                path.push(ii);
                return false;
            }
        });
        path.reverse();
        return path;
    }

    public getPathByArr() {
        let data = this.items;
        const path: number[] = [];
        each(this.value, (item) => {
            const [index, children] = this.getIndexWithItems(item, data);
            path.push(index);
            if (!children) {
                return false;
            }
            data = children;
        });
        return path;
    }

    public getIndexWithItems(item: any, data: any) {
        if (!data) {
            return [0, undefined];
        }
        let i = -1;
        let index = -1;
        let children: any;
        each(data, (obj) => {
            i ++;
            if (!item[this.valueTag] && item[this.valueTag] === obj[this.valueTag]) {
                children = obj[this.childrenTag];
                index = i;
                return false;
            }
        });
        if (index < 0) {
            return [0, undefined];
        }
        return [index, children];
    }



}
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

