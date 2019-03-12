<template>
    <div>
        <div class="has-header">
            <div class="swipe-box address-list">
                <div class="swipe-row" v-for="(item, index) in items" :key="index">
                    <div class="swipe-content address-item">
                        <div class="address-first">
                            <img src="/assets/images/avatar/14.png" alt="">
                        </div>
                        <div class="address-info">
                            <h3>213213213123</h3>
                            <p>
                                <?=date('Y-m-d H:i:s')?>
                            </p>
                        </div>
                    </div>
                    <div class="actions-right">
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
