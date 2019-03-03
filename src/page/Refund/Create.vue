<template>
    <div>
        <div class="has-header">
            <?=Form::open($model, './mobile/refund/save')?>
                <?=Form::radio('退款类型', ['仅退款', '退货退款'])?>
                <?=Form::text('退款金额', true)?>
                <?=Form::text('退款说明', true)?>
                <?=Form::text('上传图片', true)?>
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
