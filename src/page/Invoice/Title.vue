<template>
    <div>
        <div class="has-header">
            <div class="swipe-box title-list">
                <div class="swipe-row" v-for="(item, index) in items" :key="index">
                    <div class="swipe-content title-item">
                        <div class="name">公司</div>
                        <p>发票类型：增值税普通发票</p>
                        <p>税务登记号：11123545656</p>
                    </div>
                    <div class="actions-right">
                        <a href="<?=$this->url('./mobile/invoice/edit', ['id' => $item])?>">
                            <i class="fa fa-edit"></i>
                        </a>
                        <i class="fa fa-trash"></i>
                    </div>
                </div>
            </div>
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
