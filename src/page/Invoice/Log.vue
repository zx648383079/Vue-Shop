<template>
    <div>
        <div class="has-header">
            <div class="log-hr">
                2018年12月
            </div>
            <div class="log-item" v-for="(item, index) in items" :key="index">
                <div class="info">
                    <div class="name">个人</div>
                    <p><?=date('Y-m-d H:i:s')?></p>
                </div>
                <div class="amount">
                    ￥200
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
