<template>
    <div>
        <BackHeader title="编辑抬头"/>
        <div class="has-header">
            <div class="form-table">
                <div class="input-group">
                    <label>发票抬头</label>
                    <div class="">
                        <input type="text" class="form-control " v-model="invoice.title" placeholder="请输入 发票抬头">

                    </div>
                </div>
                <div class="input-group">
                    <label for="发票抬头类型">发票抬头类型</label>
                    <div class="radio-box">
                        <span v-for="(item, index) in titleTypeList" :key="index" :class="{active: invoice.title_type == index}" @click="invoice.title_type = index">
                            {{ item }}
                        </span>
                    </div>
                </div>
                <div class="input-group" v-if="invoice.title_type > 0">
                    <label for="发票类型">发票类型</label>
                    <div class="radio-box">
                        <span v-for="(item, index) in typeList" :key="index"  :class="{active: invoice.type == index}" @click="invoice.type = index">
                            {{ item }}
                        </span>
                    </div>
                </div>
                <div class="input-group" v-if="invoice.title_type > 0">
                    <label>税务登记号</label>
                    <div class="">
                        <input type="text" v-model="invoice.tax_no" class="form-control " placeholder="请输入 税务登记号"
                           >

                    </div>
                </div>
                <div class="input-group" v-if="invoice.type > 0">
                    <label>注册场所地址</label>
                    <div class="">
                        <input type="text" v-model="invoice.address" class="form-control " placeholder="请输入 注册场所地址"
                           >

                    </div>
                </div>
                <div class="input-group" v-if="invoice.type > 0">
                    <label>注册场所电话</label>
                    <div class="">
                        <input type="text" v-model="invoice.tel" class="form-control " placeholder="请输入 注册场所电话"
                           >

                    </div>
                </div>
                <div class="input-group" v-if="invoice.type > 0">
                    <label>开户银行</label>
                    <div class="">
                        <input type="text" v-model="invoice.bank" class="form-control " placeholder="请输入 开户银行">

                    </div>
                </div>
                <div class="input-group" v-if="invoice.type > 0">
                    <label>基本开户账号</label>
                    <div class="">
                        <input type="text" v-model="invoice.account" class="form-control " placeholder="请输入 基本开户账号">

                    </div>
                </div>
            </div>
             
        </div>

        <div class="fixed-footer">
            <button class="btn" type="button" @click="tapSubmit">保存</button> 
        </div>

    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import BackHeader from '@/components/BackHeader.vue';
import { IInvoiceTitle } from '../../api/model';
import Toast from '@/components/toast.ts';
import { getTitle, saveTitle } from '../../api/invoice';

@Component({
    components: {
        BackHeader,
    },
})
export default class Edit extends Vue {
    public titleTypeList = ['个人', '企业'];
    public typeList = ['增值税普通发票', '增值税专用发票'];
    public invoice: IInvoiceTitle = {
        title_type: 0,
        type: 0,
        title: '',
        tax_no: '',
        tel: '',
        bank: '',
        account: '',
        address: '',
    };

    public created() {
        if (!this.$route.query.id) {
            return;
        }
        getTitle(parseInt(this.$route.query.id + '', 10)).then(res => {
            this.invoice = res;
        });
    }

    /**
     * tapSubmit
     */
    public tapSubmit() {
        const invoice = Object.assign({}, this.invoice);
        if (!invoice.title) {
            Toast('请输入发票抬头');
            return;
        }
        saveTitle(invoice).then(res => {
            this.$router.back();
        });
    }
}
</script>
<style lang="scss" scoped>
.radio-box {
    font-size: 12px;
    text-align: right;
    span {
        display: inline-block;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 0 10px;
        margin-left: 10px;
        box-sizing: content-box;
        line-height: 35px;
        &.active {
            background-color: #d22222;
            color: #fff;
        }
    }
}
</style>
