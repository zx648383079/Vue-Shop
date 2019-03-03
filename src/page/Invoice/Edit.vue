<template>
    <div>
        <div class="has-header">
            <?=Form::open($model, './mobile/invoice/save')?>
                <?=Form::text('发票抬头', true)?>
                <?=Form::radio('发票抬头类型', ['个人', '企业'])?>
                <?=Form::select('发票类型', ['增值税普通发票', '增值税专用发票'])?>
                <?=Form::text('税务登记号', true)?>
                <?=Form::text('注册场所地址', true)?>
                <?=Form::text('注册场所电话', true)?>
                <?=Form::text('开户银行', true)?>
                <?=Form::text('基本开户账号', true)?>
            <?=Form::close('id')?>
        </div>

        <div class="fixed-footer">
            <button class="btn" type="button">保存</button> 
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [

            ]
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>

</style>
