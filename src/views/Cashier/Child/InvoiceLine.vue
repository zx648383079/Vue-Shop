<template>
    <DialogPanel title="发票">
        <div class="line-item inovice-box">
            <span>发票</span>
            <span>
                {{ model ? model.title : '请选择' }}
            </span>
            <i class="iconfont icon-chevron-right"></i>
        </div>
        <template #panel>
            <div class="invoice-body">
                <div class="input-group">
                    <label>发票类型</label>
                    <div class="radio-box">
                        <span v-for="(item, index) in typeList" :key="index" :class="{active: invoice.type == index}" @click="invoice.type = index">
                            {{ item }}
                        </span>
                        <span class="disable">增值税专用发票</span>
                    </div>
                    <div class="tip">电子普通发票与纸质普通发票具备同等法律效力，可支持报销入账</div>
                </div>
                <div class="input-group">
                    <label>发票抬头</label>
                    <div class="radio-box">
                        <span v-for="(item, index) in titleTypeList" :key="index" :class="{active: invoice.title_type == index}" @click="invoice.title_type = index">
                            {{ item }}
                        </span>
                    </div>
                </div>
                <div class="input-group">
                    <input type="text" placeholder="抬头" v-model="invoice.title">
                    <input type="text" placeholder="税号" v-model="invoice.tax_no">
                </div>
                <div class="input-line">
                    <p><span>收票人手机</span><span></span></p>
                    <p><span>收票人邮箱</span><span></span></p>
                </div>
                <div class="input-group">
                    <label>发票内容</label>
                    <div class="radio-box">
                        <span v-for="(item, index) in contentList" :key="index" :class="{active: invoice.content == item}" @click="invoice.content = item">
                            {{ item }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <button>确定</button>
        </template>
    </DialogPanel>
</template>
<script setup lang="ts">
import DialogPanel from '@/components/DialogPanel.vue';
import { reactive } from 'vue';
import type { IInvoiceTitle } from '../../../api/model';

const model = defineModel<IInvoiceTitle>();

const titleTypeList = ['个人', '企业'];
const typeList = ['普通发票', '电子普通发票'];
const contentList = ['商品明细', '商品类别'];
const invoice = reactive({
    title_type: 0,
    type: 0,
    title: '',
    tax_no: '',
    content: '',
});

</script>
<style lang="scss" scoped>
.input-group {
    margin-bottom: 10px;
    label {
        line-height: 30px;
        font-weight: 900;
    }
    input {
        margin-top: 5px;
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #ccc;
    }
}
.input-line {
    line-height: 40px;
    span {
        &:first-child {
            width: 120px;
        }
    }
}
.radio-box {
    span {
        display: inline-block;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 0 10px;
        margin-left: 2px;
        box-sizing: content-box;
        font-size: 14px;
        line-height: 30px;
        &.active {
            background-color: #d22222;
            color: #fff;
        }
        &.disable {
            background-color: #ccc;
        }
    }
}
.tip {
    font-size: 12px;
    color: #767676;
}
.invoice-body {
    max-height: 45vh;
}
</style>