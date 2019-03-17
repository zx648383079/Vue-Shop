<template>
    <div class="select-picker">
        <div @click="showCalendar" class="select-picker__input-container">
            <slot></slot>
        </div>
        <div :class="['dialog', 'dialog-select', 'dialog-select-column-' + column]" v-if="calendarVisible">
            <div class="dialog-header">
                <div class="dialog-close">取消</div>
                <div class="dialog-title">{{ title }}</div>
                <div class="dialog-yes">确定</div>
            </div>
            <div class="dialog-body">
                <ul v-for="(item, index) in column_list" :key="index" :class="'dialog-column-' + index" :style="item.style">
                    <li v-for="(it, i) in item.items" :key="i" :class="{active: i == item.index}">{{ it[textTag] }}</li>
                </ul>
                <hr class="dialog-top-hr">
                <hr class="dialog-bottom-hr">
            </div>
        </div>
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

@Component
export default class SelectPicker extends Vue {
    @Prop({type: Number, default: 1}) readonly column!: number;
    @Prop({default: '请选择'}) readonly title!: string;
    @Prop({default: 'name'}) readonly textTag!: string;
    @Prop({default: 'id'}) readonly valueTag!: string;
    @Prop({default: 'children'}) readonly childrenTag!: string;
    @Prop({type: Number, default: 30}) readonly lineHeight!: number;
    @Prop([Array, Object]) readonly value!: any;

    @Prop(Object) readonly items!: IRegionObject;

    column_list: IColumn[] = [];
    calendarVisible: boolean = false;

    showCalendar() {
        this.calendarVisible = true;
        this.refresh();
    }

    refresh() {
        for (let i = 0; i < this.column; i++) {
            this.refreshColumn(i);
        }
    }

    refreshColumn(index: number) {
        const data: any[] = [];
        each(this.getColumnData(index), (item) => {
            data.push(item);
        });
        if (this.column_list.length <= index) {
            this.column_list.push({
                index: 0,
                items: data,
                style: this.getIndexStyle(0)
            });
            return;
        }
        this.column_list[index].items = data;
    }

    getColumnData(index: number) {
        if (index < 1) {
            return this.items;
        }
        if (this.column_list.length < index) {
            return [];
        }
        const column = this.column_list[index - 1];
        const current = column.index || 0;
        if (!column.items || column.items.length < current) {
            return [];
        }
        const item = column.items[current];
        if (!item.hasOwnProperty(this.childrenTag)) {
            return [];
        }
        return item[this.childrenTag];
    }

    getIndexStyle(index: number) {
        const top = 2 * this.lineHeight - index  * this.lineHeight;
        return 'transform: translate(0px, ' + top +'px) translateZ(0px)';
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

