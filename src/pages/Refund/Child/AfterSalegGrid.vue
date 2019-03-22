<template>
    <div class="form-table">
        <div class="input-group">
            <label for="">申请原因</label>
            <div class="">
                <select class="form-control " required="">
                    <option>请选择申请原因</option>
                </select>
            </div>
        </div>
        <div class="input-group">
            <label for="退款金额">退款联系人</label>
            <div class="">
                <input type="text" id="退款金额" class="form-control " name="退款金额" placeholder="请输入 退款金额" required="">
            </div>
        </div>
        <div class="input-group">
            <label>问题描述</label>
            <div class="">
                <textarea class="form-control" ></textarea>
            </div>
        </div>
        <div class="input-group">
            <label>退货方式</label>
            <div class="">
                <span>快递</span>
                <div class="ti">商品寄回地址会在审核通过后以短信形式告知，或在申请记录中查询</div>
            </div>
        </div>
        <div class="input-group" v-if="mode == 3 || mode == 4">
            <label>收货地址</label>
            <div class="">
                
            </div>
        </div>
         <div class="input-group">
            <label for="退款金额">联系人</label>
            <div class="">
                <input type="text" id="退款金额" class="form-control " name="退款金额" placeholder="请输入 退款金额" required="">
            </div>
        </div>
        <div class="input-group">
            <label for="退款金额">联系方式</label>
            <div class="">
                <input type="text" id="退款金额" class="form-control " name="退款金额" placeholder="请输入 退款金额" required="">
            </div>
        </div>
        <div class="fixed-footer">
            <button class="btn" type="button">提交</button> 
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class AfterSaleGrid extends Vue {
    @Prop(Number) readonly mode!: number;
}
</script>
<style lang="scss" scoped>

</style>